import HealthBar from './HealthBar';
import { brawlerGameplay } from '../utils/characterAssets';

const AW = 960, AH = 600;

export default function Player({ player, brawler }) {
  if (!player) return null;
  return (
    <div
      className={`fighter player-fighter fighter-${brawler.id} ${player.invuln > 0 ? 'invulnerable' : ''}`}
      style={{
        left: `${player.x / AW * 100}%`,
        top: `${player.y / AH * 100}%`,
        width: `${player.w / AW * 100}%`,
        height: `${player.h / AH * 100}%`,
        '--angle': `${player.angle}rad`,
        '--accent': brawler.accent,
      }}
    >
      <div className="nameplate">
        <strong>{player.name}</strong>
        <HealthBar value={player.hp} max={player.maxHp} compact />
      </div>
      <div className="aim-arm" />
      <div className="fighter-visual">
        <img src={brawlerGameplay(brawler.id)} alt="" />
        <span className="fighter-energy" />
      </div>
      <div className="fighter-shadow" />
    </div>
  );
}
