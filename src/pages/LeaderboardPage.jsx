import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingScreen from '../components/LoadingScreen';
import ErrorState from '../components/ErrorState';
import { getScores } from '../services/api';
import { useGameContext } from '../context/GameContext';
import { brawlerAvatar, brawlerIdFromName } from '../utils/characterAssets';

const medals = ['🥇', '🥈', '🥉'];
const assetFor = (name='Volt') => brawlerAvatar(brawlerIdFromName(name));

export default function LeaderboardPage(){
  const nav = useNavigate();
  const ctx = useGameContext();
  const [scores,setScores] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  const load=()=>{
    setLoading(true);
    setError('');
    getScores()
      .then(x=>setScores([...x].sort((a,b)=>b.score-a.score)))
      .catch(()=>setError('No pudimos cargar el leaderboard.'))
      .finally(()=>setLoading(false));
  };
  useEffect(load,[]);

  return <div className="page leaderboard-bg"><Navbar/>{loading?<LoadingScreen label="CARGANDO RANKING..."/>:error?<ErrorState message={error} onRetry={load} onBack={()=>nav('/')}/>:<main className="content-page leaderboard-page">
    <div className="page-heading centered"><span className="eyebrow">HALL OF NEON</span><div className="title-plaque"><h1>MEJORES <em>BRAWLERS</em></h1></div><p>Los mejores resultados guardados por JSON Server.</p></div>
    {scores.length===0?<div className="empty-card">Aún no hay partidas registradas.</div>:<>
      <div className="podium">{scores.slice(0,3).map((s,i)=><article key={s.id} className={`podium-card p${i+1}`}><span className="medal">{medals[i]}</span><div className="podium-avatar"><img src={assetFor(s.brawler)} alt={s.brawler}/></div><h3>{s.player}</h3><b>{s.score.toLocaleString()}</b><small>{s.kills} KILLS · {s.brawler}</small></article>)}</div>
      <div className="score-board">{scores.slice(3,20).map((s,i)=><div key={s.id} className={`score-row ${s.player===ctx.playerName?'current':''}`}><span className="rank">#{i+4}</span><div className="score-user"><b>{s.player}</b><small>{s.map}</small></div><span className="score-brawler">{s.brawler}</span><span><b>{s.kills}</b><small>KILLS</small></span><span><b>{s.score}</b><small>SCORE</small></span></div>)}</div>
    </>}
    <button className="btn ghost chunky" onClick={()=>nav('/')}>← MENÚ</button>
  </main>}</div>;
}
