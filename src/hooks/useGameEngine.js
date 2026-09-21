import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useKeyboard from './useKeyboard';
import useAudio from './useAudio';
import { ARENA_HEIGHT, ARENA_WIDTH, DIFFICULTY, MATCH_SECONDS, MAX_DEATHS, clamp, uid } from '../utils/constants';
import { circleRectOverlap, distance, moveWithCollisions, rectsOverlap } from '../utils/collision';

const BOT_NAMES = ['Bot Nova', 'Bot Hex', 'Bot Pulse'];
const makeStats = () => ({ shotsFired: 0, shotsHit: 0, damageDealt: 0, damageReceived: 0, kills: 0, deaths: 0, powerUpsCollected: 0, supersUsed: 0, maxKillStreak: 0 });
const center = (e) => ({ x: e.x + e.w / 2, y: e.y + e.h / 2 });

export default function useGameEngine({ map, brawler, difficulty = 'normal', playerName, onGameOver }) {
  const diff = DIFFICULTY[difficulty] || DIFFICULTY.normal;
  const keys = useKeyboard(true);
  const { play } = useAudio();
  const [gameStatus, setGameStatus] = useState('COUNTDOWN');
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(MATCH_SECONDS);
  const [snapshot, setSnapshot] = useState(null);
  const pointer = useRef({ x: ARENA_WIDTH / 2, y: ARENA_HEIGHT / 2 });
  const world = useRef(null);
  const raf = useRef(null);
  const lastFrame = useRef(performance.now());
  const renderAccumulator = useRef(0);
  const gameOverRef = useRef(false);

  const solidObstacles = useMemo(() => map.obstacles.filter((o) => o.solid !== false), [map.obstacles]);

  const buildWorld = useCallback(() => {
    const p = {
      id: 'player', name: playerName || 'Player', x: map.playerSpawn.x, y: map.playerSpawn.y,
      w: 44, h: 44, hp: brawler.health, maxHp: brawler.health, ammo: brawler.ammoMax,
      reloadProgress: 0, shotCooldown: 0, superCharge: 0, angle: 0, invuln: 1.2,
      speedBuff: 0, shieldBuff: 0, damageBuff: 0,
    };
    const bots = map.botSpawns.slice(0, 3).map((spawn, i) => ({
      id: `bot-${i + 1}`, name: BOT_NAMES[i], x: spawn.x, y: spawn.y, w: 42, h: 42,
      hp: 2600, maxHp: 2600, angle: Math.PI, alive: true, respawn: 0, invuln: 0.8,
      shotCooldown: 0.7 + i * 0.18, decision: 0, strafe: i % 2 ? 1 : -1, state: 'PATROL',
    }));
    return {
      player: p, bots, projectiles: [], powerUps: [], damageNumbers: [], killFeed: [],
      score: 0, stats: makeStats(), killStreak: 0, streakTimer: 0, powerSpawn: 4,
      obstacles: map.obstacles.map((o) => ({ ...o, currentHp: o.hp || null })), hitFlash: 0, screenShake: 0, superFx: null,
    };
  }, [brawler, map, playerName]);

  const publish = useCallback(() => {
    if (!world.current) return;
    const w = world.current;
    setSnapshot({
      player: { ...w.player }, bots: w.bots.map((b) => ({ ...b })),
      projectiles: w.projectiles.map((p) => ({ ...p })), powerUps: w.powerUps.map((p) => ({ ...p })),
      damageNumbers: w.damageNumbers.map((n) => ({ ...n })), killFeed: w.killFeed.map((k) => ({ ...k })),
      score: w.score, stats: { ...w.stats }, obstacles: w.obstacles.map((o) => ({ ...o })), hitFlash: w.hitFlash, screenShake: w.screenShake, superFx: w.superFx ? { ...w.superFx } : null,
    });
  }, []);

  const finishGame = useCallback((reason = 'time') => {
    if (gameOverRef.current || !world.current) return;
    gameOverRef.current = true;
    setGameStatus('GAME_OVER');
    const w = world.current;
    const victory = reason === 'time' ? (w.stats.kills >= w.stats.deaths && w.score >= 500) : false;
    if (victory) w.score += 500;
    const accuracy = w.stats.shotsFired ? Math.round((w.stats.shotsHit / w.stats.shotsFired) * 100) : 0;
    const result = {
      id: uid('match'), player: playerName || 'Player', brawler: brawler.name, brawlerId: brawler.id,
      kills: w.stats.kills, deaths: w.stats.deaths, score: w.score, map: map.name, mapId: map.id,
      damage: Math.round(w.stats.damageDealt), damageReceived: Math.round(w.stats.damageReceived),
      accuracy, powerUps: w.stats.powerUpsCollected, supersUsed: w.stats.supersUsed,
      maxKillStreak: w.stats.maxKillStreak, duration: MATCH_SECONDS - timeLeft, victory,
      date: new Date().toISOString(),
    };
    publish();
    window.setTimeout(() => onGameOver(result), 650);
  }, [brawler, map, onGameOver, playerName, publish, timeLeft]);

  useEffect(() => {
    world.current = buildWorld();
    publish();
    setGameStatus('COUNTDOWN'); setCountdown(3); setTimeLeft(MATCH_SECONDS); gameOverRef.current = false;
  }, [buildWorld, publish]);

  useEffect(() => {
    if (gameStatus !== 'COUNTDOWN') return undefined;
    const id = window.setInterval(() => {
      setCountdown((value) => {
        if (value <= 1) {
          window.clearInterval(id);
          setGameStatus('PLAYING');
          return 0;
        }
        return value - 1;
      });
    }, 700);
    return () => window.clearInterval(id);
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus !== 'PLAYING') return undefined;
    const id = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(id);
          queueMicrotask(() => finishGame('time'));
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [finishGame, gameStatus]);

  const addDamageNumber = (x, y, amount, kind = 'damage') => {
    world.current.damageNumbers.push({ id: uid('dmg'), x, y, amount: Math.round(amount), ttl: 0.65, kind });
  };

  const addKillFeed = (text) => {
    world.current.killFeed.unshift({ id: uid('feed'), text, ttl: 3.2 });
    world.current.killFeed = world.current.killFeed.slice(0, 4);
  };

  const respawnPlayer = () => {
    const w = world.current;
    w.player.x = map.playerSpawn.x; w.player.y = map.playerSpawn.y; w.player.hp = w.player.maxHp; w.player.invuln = 1.5;
  };

  const damageBot = (bot, amount, projectileOwner = 'player') => {
    if (!bot.alive || bot.invuln > 0) return false;
    bot.hp = Math.max(0, bot.hp - amount);
    addDamageNumber(bot.x + bot.w / 2, bot.y, amount);
    if (projectileOwner === 'player' || projectileOwner === 'super') {
      const w = world.current;
      w.stats.damageDealt += amount;
      if (projectileOwner === 'player') {
        w.stats.shotsHit += 1; w.score += 20;
        w.player.superCharge = clamp(w.player.superCharge + 10, 0, 100);
      }
    }
    if (bot.hp <= 0) {
      bot.alive = false; bot.respawn = 2.5;
      const w = world.current;
      w.stats.kills += 1; w.score += 250; w.killStreak += 1; w.streakTimer = 5;
      play('kill');
      w.stats.maxKillStreak = Math.max(w.stats.maxKillStreak, w.killStreak);
      addKillFeed(`⚡ ${playerName || 'Player'} eliminó a ${bot.name}`);
      if (w.killStreak === 2) addKillFeed('⚡ DOUBLE KILL');
      if (w.killStreak === 3) addKillFeed('⚡ TRIPLE KILL');
      if (w.killStreak === 5) addKillFeed('🔥 UNSTOPPABLE');
      addDamageNumber(bot.x + 10, bot.y - 18, 250, 'score');
    }
    return true;
  };

  const damagePlayer = (amount, botName) => {
    const w = world.current; const p = w.player;
    if (p.invuln > 0 || gameOverRef.current) return;
    const actual = p.shieldBuff > 0 ? amount * 0.35 : amount;
    p.hp = Math.max(0, p.hp - actual); w.stats.damageReceived += actual; w.hitFlash = 0.16; w.screenShake = 0.18; play('hit');
    addDamageNumber(p.x + p.w / 2, p.y, actual);
    if (p.hp <= 0) {
      w.stats.deaths += 1; w.killStreak = 0;
      addKillFeed(`🔥 ${botName} eliminó a ${playerName || 'Player'}`);
      if (w.stats.deaths >= MAX_DEATHS) finishGame('deaths'); else respawnPlayer();
    }
  };

  const shoot = useCallback(() => {
    if (gameStatus !== 'PLAYING' || !world.current) return;
    const w = world.current; const p = w.player;
    if (p.ammo <= 0 || p.shotCooldown > 0) return;
    const pc = center(p); const dx = pointer.current.x - pc.x; const dy = pointer.current.y - pc.y;
    const len = Math.hypot(dx, dy) || 1; const dirX = dx / len; const dirY = dy / len;
    p.angle = Math.atan2(dy, dx); p.ammo -= 1; p.shotCooldown = 0.18; w.stats.shotsFired += 1; play('shoot');
    const damage = brawler.damage * (p.damageBuff > 0 ? 1.35 : 1);
    w.projectiles.push({ id: uid('p'), ownerId: 'player', team: 'player', x: pc.x, y: pc.y, r: 6, vx: dirX * brawler.projectileSpeed, vy: dirY * brawler.projectileSpeed, damage, traveled: 0, maxDistance: brawler.range });
    publish();
  }, [brawler, gameStatus, play, publish]);

  const setAimPoint = useCallback((x, y) => {
    pointer.current = { x, y };
    if (world.current) {
      const pc = center(world.current.player);
      world.current.player.angle = Math.atan2(y - pc.y, x - pc.x);
    }
  }, []);

  const activateSuper = useCallback(() => {
    if (gameStatus !== 'PLAYING' || !world.current) return;
    const w = world.current; const p = w.player;
    if (p.superCharge < 100) return;
    p.superCharge = 0; w.stats.supersUsed += 1; play('super');
    w.superFx = { id: uid('superfx'), type: brawler.id, x: p.x + p.w / 2, y: p.y + p.h / 2, ttl: 0.5 };
    if (brawler.id === 'nyx') {
      const pc = center(p); const dx = pointer.current.x - pc.x; const dy = pointer.current.y - pc.y; const len = Math.hypot(dx, dy) || 1;
      for (let i = 0; i < 12; i += 1) {
        const moved = moveWithCollisions(p, (dx / len) * 14, (dy / len) * 14, solidObstacles, { w: ARENA_WIDTH, h: ARENA_HEIGHT });
        p.x = moved.x; p.y = moved.y;
      }
      p.invuln = 0.65;
    } else {
      const radius = brawler.id === 'tankx' ? 180 : 155;
      const amount = brawler.id === 'tankx' ? 1050 : 950;
      const pc = center(p);
      w.bots.forEach((bot) => { if (bot.alive && distance(pc, center(bot)) <= radius) damageBot(bot, amount, 'super'); });
    }
    w.score += 100;
    addDamageNumber(p.x, p.y - 25, 100, 'score');
    publish();
  }, [brawler, gameStatus, play, publish, solidObstacles]);

  const togglePause = useCallback(() => {
    setGameStatus((status) => status === 'PLAYING' ? 'PAUSED' : status === 'PAUSED' ? 'PLAYING' : status);
  }, []);

  useEffect(() => {
    const key = (event) => {
      if (event.code === 'Space') { event.preventDefault(); activateSuper(); }
      if (event.code === 'Escape') { event.preventDefault(); togglePause(); }
    };
    window.addEventListener('keydown', key, { passive: false });
    return () => window.removeEventListener('keydown', key);
  }, [activateSuper, togglePause]);

  useEffect(() => {
    const loop = (now) => {
      raf.current = requestAnimationFrame(loop);
      if (gameStatus !== 'PLAYING' || !world.current) { lastFrame.current = now; return; }
      const dt = Math.min((now - lastFrame.current) / 1000, 0.04); lastFrame.current = now;
      const w = world.current; const p = w.player;

      // Player movement
      let mx = 0; let my = 0;
      if (keys.current.has('KeyW') || keys.current.has('ArrowUp')) my -= 1;
      if (keys.current.has('KeyS') || keys.current.has('ArrowDown')) my += 1;
      if (keys.current.has('KeyA') || keys.current.has('ArrowLeft')) mx -= 1;
      if (keys.current.has('KeyD') || keys.current.has('ArrowRight')) mx += 1;
      const mag = Math.hypot(mx, my) || 1; const speed = brawler.speed * (p.speedBuff > 0 ? 1.35 : 1);
      const moved = moveWithCollisions(p, (mx / mag) * speed * dt, (my / mag) * speed * dt, w.obstacles.filter((o) => o.solid !== false && (!o.destructible || o.currentHp > 0)), { w: ARENA_WIDTH, h: ARENA_HEIGHT });
      p.x = moved.x; p.y = moved.y;
      p.invuln = Math.max(0, p.invuln - dt); p.shotCooldown = Math.max(0, p.shotCooldown - dt);
      p.speedBuff = Math.max(0, p.speedBuff - dt); p.shieldBuff = Math.max(0, p.shieldBuff - dt); p.damageBuff = Math.max(0, p.damageBuff - dt);
      if (p.ammo < brawler.ammoMax) {
        p.reloadProgress += dt;
        if (p.reloadProgress >= brawler.reloadTime) { p.ammo += 1; p.reloadProgress = 0; }
      } else p.reloadProgress = 0;

      // Bot AI
      const playerCenter = center(p);
      w.bots.forEach((bot, index) => {
        if (!bot.alive) {
          bot.respawn -= dt;
          if (bot.respawn <= 0) {
            const spawn = map.botSpawns[index % map.botSpawns.length];
            Object.assign(bot, { x: spawn.x, y: spawn.y, hp: bot.maxHp, alive: true, invuln: 1.1, shotCooldown: 0.8, state: 'PATROL' });
          }
          return;
        }
        bot.invuln = Math.max(0, bot.invuln - dt); bot.shotCooldown = Math.max(0, bot.shotCooldown - dt);
        const bc = center(bot); const dx = playerCenter.x - bc.x; const dy = playerCenter.y - bc.y; const d = Math.hypot(dx, dy) || 1;
        bot.angle = Math.atan2(dy, dx);
        let bx = 0; let by = 0;
        if (bot.hp < bot.maxHp * 0.25 && d < 260) { bot.state = 'RETREAT'; bx = -dx / d; by = -dy / d; }
        else if (d > 285) { bot.state = 'CHASE'; bx = dx / d; by = dy / d; }
        else { bot.state = 'ATTACK'; bx = (-dy / d) * bot.strafe * 0.42; by = (dx / d) * bot.strafe * 0.42; }
        const botMoved = moveWithCollisions(bot, bx * 175 * diff.botSpeed * dt, by * 175 * diff.botSpeed * dt, w.obstacles.filter((o) => o.solid !== false && (!o.destructible || o.currentHp > 0)), { w: ARENA_WIDTH, h: ARENA_HEIGHT });
        bot.x = botMoved.x; bot.y = botMoved.y;
        if (d < 430 && bot.shotCooldown <= 0) {
          const miss = (1 - diff.accuracy) * 0.55; const angle = bot.angle + (Math.random() - 0.5) * miss;
          w.projectiles.push({ id: uid('bp'), ownerId: bot.id, ownerName: bot.name, team: 'enemy', x: bc.x, y: bc.y, r: 6, vx: Math.cos(angle) * 450, vy: Math.sin(angle) * 450, damage: 420 * diff.botDamage, traveled: 0, maxDistance: 500 });
          bot.shotCooldown = (1.05 + Math.random() * 0.35) * diff.fireRate;
        }
      });

      // Projectiles + collisions
      const aliveProjectiles = [];
      for (const proj of w.projectiles) {
        proj.x += proj.vx * dt; proj.y += proj.vy * dt; proj.traveled += Math.hypot(proj.vx * dt, proj.vy * dt);
        if (proj.x < -20 || proj.y < -20 || proj.x > ARENA_WIDTH + 20 || proj.y > ARENA_HEIGHT + 20 || proj.traveled >= proj.maxDistance) continue;
        let consumed = false;
        for (const obstacle of w.obstacles) {
          if (obstacle.solid === false || (obstacle.destructible && obstacle.currentHp <= 0)) continue;
          if (circleRectOverlap(proj, obstacle)) {
            consumed = true;
            if (obstacle.destructible && obstacle.currentHp > 0) {
              obstacle.currentHp = Math.max(0, obstacle.currentHp - proj.damage);
              addDamageNumber(obstacle.x + obstacle.w / 2, obstacle.y, proj.damage);
              if (obstacle.currentHp <= 0 && Math.random() < 0.65) w.powerUps.push({ id: uid('pu'), x: obstacle.x + 10, y: obstacle.y + 10, w: 34, h: 34, type: 'heal', ttl: 14 });
            }
            break;
          }
        }
        if (consumed) continue;
        if (proj.team === 'player') {
          for (const bot of w.bots) {
            if (bot.alive && circleRectOverlap(proj, bot)) { damageBot(bot, proj.damage, 'player'); consumed = true; break; }
          }
        } else if (circleRectOverlap(proj, p)) { damagePlayer(proj.damage, proj.ownerName || 'Bot'); consumed = true; }
        if (!consumed) aliveProjectiles.push(proj);
      }
      w.projectiles = aliveProjectiles;

      // Power-ups
      w.powerSpawn -= dt;
      if (w.powerSpawn <= 0 && w.powerUps.length < 3) {
        const spots = map.powerupSpawns; const spot = spots[Math.floor(Math.random() * spots.length)];
        const roll = Math.random(); const type = roll < 0.18 ? 'core' : roll < 0.43 ? 'heal' : roll < 0.65 ? 'speed' : roll < 0.83 ? 'shield' : 'damage';
        w.powerUps.push({ id: uid('pu'), x: spot.x, y: spot.y, w: 34, h: 34, type, ttl: 14 });
        w.powerSpawn = 8 + Math.random() * 5;
      }
      w.powerUps = w.powerUps.filter((power) => {
        power.ttl -= dt; if (power.ttl <= 0) return false;
        if (rectsOverlap(p, power)) {
          w.stats.powerUpsCollected += 1; w.score += power.type === 'core' ? 150 : 25; play('power');
          if (power.type === 'heal') p.hp = Math.min(p.maxHp, p.hp + 700);
          if (power.type === 'speed') p.speedBuff = 5;
          if (power.type === 'shield') p.shieldBuff = 5;
          if (power.type === 'damage') p.damageBuff = 5;
          if (power.type === 'core') p.superCharge = clamp(p.superCharge + 15, 0, 100);
          addDamageNumber(p.x, p.y - 15, power.type === 'core' ? 150 : 25, 'score');
          return false;
        }
        return true;
      });

      w.hitFlash = Math.max(0, w.hitFlash - dt); w.screenShake = Math.max(0, w.screenShake - dt);
      w.damageNumbers = w.damageNumbers.filter((n) => { n.ttl -= dt; n.y -= 20 * dt; return n.ttl > 0; });
      if (w.superFx) { w.superFx.ttl -= dt; if (w.superFx.ttl <= 0) w.superFx = null; }
      w.killFeed = w.killFeed.filter((k) => { k.ttl -= dt; return k.ttl > 0; });
      w.streakTimer = Math.max(0, w.streakTimer - dt); if (w.streakTimer <= 0) w.killStreak = 0;

      renderAccumulator.current += dt;
      if (renderAccumulator.current >= 1 / 30) { renderAccumulator.current = 0; publish(); }
    };
    lastFrame.current = performance.now(); raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [brawler, diff, finishGame, gameStatus, keys, map.botSpawns, map.powerupSpawns, play, publish]);

  return { snapshot, gameStatus, countdown, timeLeft, setAimPoint, shoot, activateSuper, togglePause };
}
