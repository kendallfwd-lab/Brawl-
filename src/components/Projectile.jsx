const AW=960, AH=600;
export default function Projectile({ projectile }) {
  const angle=Math.atan2(projectile.vy||0,projectile.vx||1);
  return <div className={`projectile ${projectile.team}`} style={{ left:`${projectile.x/AW*100}%`, top:`${projectile.y/AH*100}%`, '--proj-angle':`${angle}rad` }}/>;
}
