import GameLogo from './GameLogo';
export default function ErrorState({ title = 'CONEXIÓN PERDIDA', message, onRetry, onBack }) {
  return <div className="state-screen error-state"><GameLogo compact/><div className="state-icon">!</div><h2>{title}</h2><p>{message || 'No pudimos acceder a los datos de la arena.'}</p><div className="button-row">{onRetry && <button className="btn primary" onClick={onRetry}>REINTENTAR</button>}{onBack && <button className="btn ghost" onClick={onBack}>VOLVER</button>}</div></div>;
}
