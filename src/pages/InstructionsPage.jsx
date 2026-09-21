import Navbar from '../components/Navbar';

const cards=[
  ['⌨','WASD','MUÉVETE','También puedes usar las flechas. El movimiento diagonal está normalizado.'],
  ['🖱','MOUSE + CLICK','APUNTA Y DISPARA','Apunta con el cursor y administra la munición que se recarga sola.'],
  ['☠','SPACE','ACTIVA TU SÚPER','Haz daño hasta cargarla al 100% y libera la habilidad del brawler.'],
  ['⏸','ESC','PAUSA','Detén completamente bots, proyectiles y temporizador.']
];

export default function InstructionsPage(){
  return <div className="page instructions-page"><Navbar/><main className="content-page instructions">
    <div className="page-heading centered"><span className="eyebrow">GUÍA RÁPIDA</span><div className="title-plaque"><h1>CÓMO <em>JUGAR</em></h1></div><p>Estrategia, reflejos y diversión. Domina estos controles y entra a la arena.</p></div>
    <div className="instruction-grid">{cards.map((c,i)=><article key={c[1]}><span className="instruction-number">0{i+1}</span><div className="instruction-icon">{c[0]}</div><kbd>{c[1]}</kbd><h3>{c[2]}</h3><p>{c[3]}</p></article>)}</div>
    <section className="tips-card"><div><span className="eyebrow">OBJETIVO DE PARTIDA</span><h2>PELEA · RECOGE · SOBREVIVE</h2><p>Consigue puntos por impactos, eliminaciones y power-ups. Tienes tres vidas antes de la derrota. Si aguantas hasta 00:00, tu desempeño decide el resultado.</p></div><div className="power-legend"><span className="heal">♥ MEDKIT</span><span className="speed">⚡ SPEED</span><span className="shield">◆ SHIELD</span><span className="damage">✹ DAMAGE</span><span className="core">✦ NEON CORE</span></div></section>
  </main></div>;
}
