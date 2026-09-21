export default function GameLogo({ compact = false }) {
  return <div className={`game-logo ${compact ? 'compact' : ''}`} aria-label="Travesti-Brawl">
    <span className="logo-crown">◆</span>
    <span className="logo-neon">TRAVESTI</span>
    <span className="logo-brawl">BRAWL</span>
  </div>;
}
