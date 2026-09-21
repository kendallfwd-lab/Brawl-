import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingScreen from '../components/LoadingScreen';
import ErrorState from '../components/ErrorState';
import { getMaps } from '../services/api';

function MapPreview({ theme, index }) {
  return (
    <div className={`map-preview preview-${theme}`}>
      <span className="map-number">0{index + 1}</span>
      <div className="preview-floor" />
      <div className="preview-bush bush-a"><i /><i /><i /><i /><i /></div>
      <div className="preview-bush bush-b"><i /><i /><i /><i /></div>
      <div className="preview-crate crate-a">×</div>
      <div className="preview-crate crate-b">×</div>
      <div className="preview-wall wall-a" />
      <div className="preview-wall wall-b" />
      <div className="preview-barrel barrel-a" />
      <div className="mini-core">✦</div>
    </div>
  );
}

export default function MapSelectPage() {
  const nav = useNavigate();
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    getMaps()
      .then(setMaps)
      .catch(() => setError('No se pudieron cargar las arenas.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  if (loading) return <div className="page"><Navbar /><LoadingScreen label="SINCRONIZANDO ARENAS..." /></div>;
  if (error) return <div className="page"><Navbar /><ErrorState message={error} onRetry={load} onBack={() => nav('/brawlers')} /></div>;

  return (
    <div className="page map-select-page">
      <Navbar />
      <main className="content-page">
        <div className="page-heading centered map-heading">
          <span className="eyebrow">DESTINO DE COMBATE</span>
          <div className="title-plaque"><h1>ELIGE LA <em>ARENA</em></h1></div>
          <p>Las rutas, coberturas y zonas de power-ups cambian en cada mapa.</p>
        </div>
        <div className="map-grid">
          {maps.map((m, i) => (
            <button key={m.id} className={`map-card theme-${m.theme}`} onClick={() => nav(`/game/${m.id}`)}>
              <MapPreview theme={m.theme} index={i} />
              <div className="map-copy">
                <small>{m.subtitle}</small>
                <h3>{m.name}</h3>
                <p>{m.description}</p>
                <b>JUGAR <span>→</span></b>
              </div>
            </button>
          ))}
        </div>
        <div className="sticky-action single sticky-action-arcade">
          <button className="btn ghost chunky" onClick={() => nav('/brawlers')}>← VOLVER A BRAWLERS</button>
        </div>
      </main>
    </div>
  );
}
