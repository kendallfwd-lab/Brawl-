import { Link, NavLink } from 'react-router-dom';
import GameLogo from './GameLogo';

export default function Navbar() {
  return <header className="topbar">
    <Link className="brand" to="/" aria-label="Ir al inicio"><GameLogo compact/></Link>
    <nav className="arcade-nav">
      <NavLink className={({isActive})=>isActive?'active':''} to="/brawlers"><span>🤖</span>BRAWLERS</NavLink>
      <NavLink className={({isActive})=>isActive?'active':''} to="/leaderboard"><span>🏆</span>RANKING</NavLink>
      <NavLink className={({isActive})=>isActive?'active':''} to="/instructions"><span>📖</span>CÓMO JUGAR</NavLink>
    </nav>
    <div className="topbar-actions"><button type="button" aria-label="Configuración">⚙</button><button type="button" aria-label="Mensajes">✉<i/></button></div>
  </header>;
}
