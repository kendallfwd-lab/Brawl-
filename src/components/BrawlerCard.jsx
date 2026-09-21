import { brawlerPortrait } from '../utils/characterAssets';

const roleIcon = { Atacante: '⚡', Asesina: '➤', Tanque: '🛡' };

export default function BrawlerCard({ brawler, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`brawler-card ${selected ? 'selected' : ''} brawler-${brawler.id}`}
      onClick={() => onSelect(brawler.id)}
      style={{ '--accent': brawler.accent }}
    >
      <div className="card-topline">
        <span className="role-pill">{roleIcon[brawler.role] || '◆'} {brawler.role}</span>
        <span className="select-mark">{selected ? 'SELECCIONADO' : 'ELEGIR'}</span>
      </div>
      <div className="portrait-wrap">
        <div className="portrait-ring" />
        <div className="portrait-rays" />
        <img className="card-character-art" src={brawlerPortrait(brawler.id)} alt={brawler.name} />
      </div>
      <div className="brawler-copy">
        <h3>{brawler.name}</h3>
        <p>{brawler.description}</p>
        <div className="stat-grid">
          <span><i>♥</i><span><b>HP</b>{brawler.health}</span></span>
          <span><i>✹</i><span><b>DMG</b>{brawler.damage}</span></span>
          <span><i>»</i><span><b>SPD</b>{Math.round(brawler.speed)}</span></span>
          <span><i>☠</i><span><b>SÚPER</b>{brawler.superName}</span></span>
        </div>
      </div>
    </button>
  );
}
