const AW=960, AH=600;
const icons={heal:'+',speed:'»',shield:'◆',damage:'!',core:'✦'};
export default function PowerUp({ power }) { return <div className={`powerup ${power.type}`} title={power.type} style={{ left:`${power.x/AW*100}%`, top:`${power.y/AH*100}%`, width:`${power.w/AW*100}%`, height:`${power.h/AH*100}%` }}>{icons[power.type]}</div>; }
