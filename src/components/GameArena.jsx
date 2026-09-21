import Player from './Player';
import Enemy from './Enemy';
import Projectile from './Projectile';
import PowerUp from './PowerUp';
import HUD from './HUD';
import PauseMenu from './PauseMenu';
import GameOverModal from './GameOverModal';
import { botAvatar, brawlerAvatar } from '../utils/characterAssets';
const AW=960, AH=600;

function ObstacleVisual({o}){
  const style={left:`${o.x/AW*100}%`,top:`${o.y/AH*100}%`,width:`${o.w/AW*100}%`,height:`${o.h/AH*100}%`};
  return <div className={`obstacle ${o.type} ${o.destructible&&o.currentHp<=0?'destroyed':''}`} style={style}>
    {o.type==='bush'&&<div className="bush-leaves">{Array.from({length:9},(_,i)=><i key={i}/>)}</div>}
    {o.type==='wall'&&<><span className="wall-top"/><span className="wall-panel"/></>}
    {o.type==='crate'&&<><span className="crate-top"/><span className="crate-x">×</span></>}
    {o.destructible&&o.currentHp>0&&<span className="crate-hp" style={{width:`${Math.max(0,o.currentHp/(o.hp||1))*100}%`}}/>}
  </div>;
}

export default function GameArena({ map, brawler, engine, onExit }) {
  const { snapshot, gameStatus, countdown, timeLeft, setAimPoint, shoot, togglePause } = engine;
  const mouseMove=(e)=>{ const r=e.currentTarget.getBoundingClientRect(); setAimPoint((e.clientX-r.left)/r.width*AW,(e.clientY-r.top)/r.height*AH); };
  const mouseDown=(e)=>{ if(e.button===0 && !e.target.closest('button')) shoot(); };
  if(!snapshot) return null;
  return <div className="game-shell"><div className={`arena-stage theme-${map.theme} brawler-${brawler.id} ${snapshot.screenShake>0?'shaking':''} ${snapshot.hitFlash>0?'hit-flash':''}`} onMouseMove={mouseMove} onMouseDown={mouseDown} role="application" aria-label="Arena de juego">
    <div className="arena-floor"/><div className="arena-pattern"/><div className="arena-lightwash"/>
    <div className="arena-edge edge-left"><span>⚡</span></div><div className="arena-edge edge-right"><span>☠</span></div>
    <div className="ambient-rock r1"/><div className="ambient-rock r2"/><div className="ambient-rock r3"/><div className="ambient-rock r4"/><div className="ambient-rock r5"/><div className="ambient-rock r6"/><div className="ambient-rock r7"/>
    <div className="floor-spark s1"/><div className="floor-spark s2"/><div className="floor-spark s3"/><div className="floor-spark s4"/>
    <div className="decor-barrel db1"/><div className="decor-barrel db2"/><div className="decor-barrel db3"/>
    {snapshot.obstacles.map(o => <ObstacleVisual key={o.id} o={o}/>) }
    {snapshot.powerUps.map(p=><PowerUp key={p.id} power={p}/>) }
    {snapshot.projectiles.map(p=><Projectile key={p.id} projectile={p}/>) }
    {snapshot.bots.map(b=><Enemy key={b.id} enemy={b}/>) }
    <Player player={snapshot.player} brawler={brawler}/>
    {snapshot.superFx&&<div className={`super-fx super-${snapshot.superFx.type}`} style={{left:`${snapshot.superFx.x/AW*100}%`,top:`${snapshot.superFx.y/AH*100}%`}}><span/><span/><span/></div>}
    {snapshot.damageNumbers.map(n=><div key={n.id} className={`damage-number ${n.kind}`} style={{left:`${n.x/AW*100}%`,top:`${n.y/AH*100}%`}}>{n.kind==='score'?'+':''}{n.amount}</div>)}
    <div className="kill-feed">{snapshot.killFeed.map(k=>{
      const clean=k.text.replace(/^🔥\s*/, '');
      const botName=['Bot Pulse','Bot Nova','Bot Hex'].find(name=>clean.includes(name));
      const icon=botName?botAvatar(botName):brawlerAvatar(brawler.id);
      return <div key={k.id}><img className="feed-avatar" src={icon} alt=""/><span>{clean}</span></div>;
    })}</div>
    <HUD snapshot={snapshot} timeLeft={timeLeft} brawler={brawler}/>
    {gameStatus==='COUNTDOWN'&&<div className="countdown"><small>{map.name}</small><strong>{countdown || 'BRAWL!'}</strong><span>PREPÁRATE</span></div>}
    {gameStatus==='PAUSED'&&<PauseMenu onResume={togglePause} onExit={onExit}/>} {gameStatus==='GAME_OVER'&&<GameOverModal/>}
  </div></div>;
}
