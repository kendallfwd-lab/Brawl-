import HealthBar from './HealthBar';
import { botGameplay, botKeyFromName } from '../utils/characterAssets';

const AW = 960, AH = 600;

export default function Enemy({ enemy }) {
  if (!enemy.alive) return null;
  const botKey = botKeyFromName(enemy.name);
  return (
    <div
      className={`fighter enemy-fighter ${botKey} ${enemy.invuln > 0 ? 'invulnerable' : ''}`}
      style={{
        left: `${enemy.x / AW * 100}%`,
        top: `${enemy.y / AH * 100}%`,
        width: `${enemy.w / AW * 100}%`,
        height: `${enemy.h / AH * 100}%`,
        '--angle': `${enemy.angle}rad`,
      }}
    >
      <div className="nameplate">
        <strong>{enemy.name}</strong>
        <HealthBar value={enemy.hp} max={enemy.maxHp} compact />
      </div>
      <div className="aim-arm enemy-arm" />
      <div className="fighter-visual">
        <img src={botGameplay(enemy.name)} alt="" />
        <span className="fighter-energy" />
      </div>
      <div className="bot-state">{enemy.state}</div>
      <div className="fighter-shadow" />
    </div>
  );
}
