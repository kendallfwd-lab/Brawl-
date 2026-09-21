import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BrawlerCard from '../components/BrawlerCard';
import LoadingScreen from '../components/LoadingScreen';
import ErrorState from '../components/ErrorState';
import { getBrawlers } from '../services/api';
import { useGameContext } from '../context/GameContext';

export default function BrawlersPage(){
  const nav = useNavigate();
  const ctx = useGameContext();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    getBrawlers()
      .then(setItems)
      .catch(() => setError('No pudimos cargar los brawlers. Verifica que JSON Server esté activo.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  if (loading) {
    return <div className="page"><Navbar /><LoadingScreen label="CARGANDO BRAWLERS..." /></div>;
  }

  if (error) {
    return <div className="page"><Navbar /><ErrorState message={error} onRetry={load} onBack={() => nav('/')} /></div>;
  }

  return (
    <div className="page brawler-page">
      <Navbar />
      <main className="content-page">
        <div className="character-stage-decor decor-left" aria-hidden="true" />
        <div className="character-stage-decor decor-right" aria-hidden="true" />
        <div className="page-heading centered brawler-heading">
          <span className="eyebrow">COMBATIENTES DE LA ARENA</span>
          <div className="title-plaque"><h1>ELIGE TU <em>BRAWLER</em></h1></div>
          <p>Cada combatiente tiene estadísticas, ritmo y una Súper diferente.</p>
        </div>

        <div className="brawler-grid">
          {items.map((brawler) => (
            <BrawlerCard
              key={brawler.id}
              brawler={brawler}
              selected={ctx.selectedBrawlerId === brawler.id}
              onSelect={ctx.setSelectedBrawlerId}
            />
          ))}
        </div>

        <div className="sticky-action sticky-action-arcade">
          <button className="btn ghost chunky" onClick={() => nav('/')}>← VOLVER</button>
          <button className="btn yellow chunky" onClick={() => nav('/maps')}>ELEGIR ARENA →</button>
        </div>
      </main>
    </div>
  );
}
