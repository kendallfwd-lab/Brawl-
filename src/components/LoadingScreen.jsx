import GameLogo from './GameLogo';
export default function LoadingScreen({ label = 'PREPARANDO ARENA...' }) {
  return <div className="state-screen loading-state"><GameLogo compact/><div className="loader-orb"/><h2>{label}</h2><div className="loading-track"><span/></div><p className="loading-tip"><b>TIP:</b> Destruye cajas y recoge power-ups antes de entrar en un duelo difícil.</p></div>;
}
