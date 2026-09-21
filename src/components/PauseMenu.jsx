import GameLogo from './GameLogo';
export default function PauseMenu({ onResume }) { return <div className="game-overlay"><div className="pause-card"><GameLogo compact/><span className="eyebrow">TIEMPO FUERA</span><h2>PARTIDA PAUSADA</h2><p>La arena quedó congelada. Vuelve cuando estés listo.</p><button className="btn yellow chunky" onClick={onResume}>▶ CONTINUAR</button></div></div>; }
