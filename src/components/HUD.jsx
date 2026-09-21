import HealthBar from './HealthBar';
import { brawlerAvatar } from '../utils/characterAssets';

const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function HUD({ snapshot, timeLeft, brawler }) {
  if (!snapshot) return null;
  const p = snapshot.player;
  return <>
    <div className="hud-top">
      <div className="hud-player">
        <div className="avatar-ring"><img src={brawlerAvatar(brawler.id)} alt={`${brawler.name} avatar`} /></div>
        <div className="hud-player-copy">
          <small>{p.name}</small>
          <b>{Math.ceil(p.hp)} / {p.maxHp}</b>
          <HealthBar value={p.hp} max={p.maxHp} />
        </div>
      </div>
      <div className="hud-center"><span>ARENA</span><strong>{formatTime(timeLeft)}</strong><small>SCORE {snapshot.score}</small></div>
      <div className="hud-stats"><span><b>{snapshot.stats.kills}</b>KILLS</span><span><b>{snapshot.stats.deaths}</b>DEATHS</span></div>
    </div>
    <div className="hud-bottom">
      <div className="ammo-panel"><small>MUNICIÓN</small><div>{Array.from({ length: brawler.ammoMax }, (_, i) => <span key={i} className={i < p.ammo ? 'loaded' : ''} />)}</div></div>
      <div className={`super-meter ${p.superCharge >= 100 ? 'ready' : ''}`}>
        <div className="super-ring" style={{ '--charge': `${p.superCharge * 3.6}deg` }}><div className="super-core">☠</div></div>
        <div className="super-copy"><strong>{Math.round(p.superCharge)}%</strong><b>{p.superCharge >= 100 ? 'SUPER READY' : 'SUPER'}</b><small>{brawler.superName}</small><em>SPACE</em></div>
      </div>
    </div>
  </>;
}
