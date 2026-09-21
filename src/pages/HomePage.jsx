import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GameLogo from '../components/GameLogo';
import { useGameContext } from '../context/GameContext';
import { brawlerPortrait } from '../utils/characterAssets';

export default function HomePage(){
  const nav=useNavigate();
  const ctx=useGameContext();
  const [name,setName]=useState(ctx.playerName);
  const [error,setError]=useState('');
  const play=()=>{
    const clean=name.trim();
    if(!clean){setError('Ingresa tu nombre para entrar a la arena.');return;}
    ctx.setPlayerName(clean.slice(0,16));
    nav('/brawlers');
  };
  return <div className="page home-page">
    <Navbar/>
    <main className="hero">
      <div className="hero-copy">
        <div className="hero-brand"><GameLogo/></div>
        <h3 className="hero-subtitle">CHICAS CON BATE Y DOS BOLAS DE BEISBOL</h3>
        <span className="hero-kicker">ARENA · ACCIÓN · SIN LÍMITES</span>
        <p className="hero-description">Entra a la arena, domina tus habilidades y supera a los bots en partidas rápidas llenas de energía.</p>
        <div className="player-entry">
          <label><span>TU NOMBRE</span><div className="input-shell"><b>●</b><input value={name} maxLength={16} onChange={e=>{setName(e.target.value);setError('')}} placeholder="Kendall Salazar"/><em>✎</em></div></label>
          <div className="difficulty"><span>DIFICULTAD</span><div className="difficulty-buttons">{['easy','normal','hard'].map(d=><button key={d} className={ctx.difficulty===d?'active':''} onClick={()=>ctx.setDifficulty(d)}>{d==='easy'?'FÁCIL':d==='normal'?'NORMAL':'DIFÍCIL'}</button>)}</div></div>
          {error&&<div className="inline-error">⚠ {error}</div>}
          <button className="btn primary xl hero-cta" onClick={play}><span className="cta-icon">⚔</span><b>ENTRAR A LA ARENA</b><span>→</span></button>
        </div>
      </div>
      <div className="hero-art hero-art-reference">
        <div className="home-character-showcase">
          <div className="home-character-glow" />
          <img className="hero-reference-art" src={brawlerPortrait('volt')} alt="Jugador Volt"/>
        </div>
      </div>
    </main>
  </div>;
}
