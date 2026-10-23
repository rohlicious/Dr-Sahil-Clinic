export function initHeroMotion(){
 const scene=document.querySelector('#hero-scene');if(!scene)return;
 const tilt=scene.querySelector('.hero-art-tilt');const button=scene.querySelector('.motion-toggle');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches;let x=0,y=0,tx=0,ty=0,raf=0;
 function frame(){x+=(tx-x)*.09;y+=(ty-y)*.09;tilt.style.transform=`perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;if(Math.abs(tx-x)>.01||Math.abs(ty-y)>.01)raf=requestAnimationFrame(frame);else raf=0}
 function draw(){if(!raf)raf=requestAnimationFrame(frame)}
 scene.addEventListener('pointermove',e=>{if(paused||reduced.matches||e.pointerType==='touch')return;const r=scene.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*7;ty=-((e.clientY-r.top)/r.height-.5)*5;draw()});
 scene.addEventListener('pointerleave',()=>{tx=0;ty=0;draw()});
 function sync(){scene.classList.toggle('motion-paused',paused);scene.classList.toggle('motion-opt-in',!paused&&reduced.matches);button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'Play illustration motion':'Pause illustration motion');button.querySelector('.motion-label').textContent=paused?'Play motion':'Pause motion';button.querySelector('.motion-symbol').innerHTML=paused?'<svg viewBox="0 0 20 20" fill="currentColor"><path d="m6 3 11 7-11 7Z"/></svg>':'<svg viewBox="0 0 20 20" fill="currentColor"><rect x="5" y="4" width="3" height="12" rx="1"/><rect x="12" y="4" width="3" height="12" rx="1"/></svg>'}
 button.addEventListener('click',()=>{paused=!paused;sync();if(paused){tx=0;ty=0;draw()}});reduced.addEventListener('change',()=>{paused=reduced.matches;sync()});sync();
 const observer=new IntersectionObserver(entries=>{scene.classList.toggle('motion-offscreen',!entries[0].isIntersecting)},{threshold:.05});observer.observe(scene);
}
