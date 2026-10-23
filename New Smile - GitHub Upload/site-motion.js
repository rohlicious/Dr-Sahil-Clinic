export function initSiteMotion(){
 const ticker=document.querySelector('.marquee');if(ticker){ticker.removeAttribute('aria-hidden');ticker.querySelector('div').setAttribute('aria-hidden','true');const b=document.createElement('button');b.className='marquee-pause';b.textContent='Pause ticker';b.setAttribute('aria-pressed','false');ticker.append(b);b.addEventListener('click',()=>{const paused=ticker.classList.toggle('is-paused');b.textContent=paused?'Play ticker':'Pause ticker';b.setAttribute('aria-pressed',String(paused))});}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const videos=document.querySelectorAll('.video-frame video');
 const playback=new Map();
 const attemptPlay=v=>{const state=playback.get(v);if(state.wanted&&state.visible&&!document.hidden)v.play().catch(()=>{});else v.pause()};
 videos.forEach(v=>{
  const hero=v.id==='hero-video';const b=v.parentElement.querySelector('button');
  playback.set(v,{wanted:hero,visible:hero});v.muted=true;
  const sync=()=>{if(hero){b.textContent=v.paused?'Resume video':'Pause video';b.setAttribute('aria-label',v.paused?'Resume hero video':'Pause hero video')}else{b.textContent=v.paused?'Play video ▷':'Pause video Ⅱ';b.setAttribute('aria-label',(v.paused?'Play':'Pause')+' clinic video')}};
  b.addEventListener('click',()=>{const s=playback.get(v);s.wanted=v.paused;s.visible=true;attemptPlay(v)});
  v.addEventListener('play',sync);v.addEventListener('pause',sync);sync();
  if(hero){v.autoplay=true;attemptPlay(v);v.addEventListener('canplay',()=>attemptPlay(v),{once:true});}
 });
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{const v=e.target;playback.get(v).visible=e.isIntersecting;attemptPlay(v)}),{threshold:.05});videos.forEach(v=>observer.observe(v));
 document.addEventListener('visibilitychange',()=>videos.forEach(attemptPlay));
 const retryHero=()=>{const v=document.querySelector('#hero-video');if(v)attemptPlay(v)};window.addEventListener('pageshow',retryHero);document.addEventListener('pointerdown',retryHero,{once:true,passive:true});
 const slider=document.querySelector('.visit-slider');
 if(slider){let current=0;const move=dir=>{current=(current+dir+3)%3;slider.scrollTo({left:slider.clientWidth*current,behavior:reduced.matches?'instant':'smooth'})};document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>move(Number(b.dataset.slide))));slider.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});slider.addEventListener('scroll',()=>{current=Math.round(slider.scrollLeft/slider.clientWidth)},{passive:true});}
 document.querySelectorAll('.faq-list details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.faq-list details').forEach(other=>{if(other!==d)other.open=false})}));
 let ticking=false;
 const top=document.createElement('button');top.className='back-top';top.setAttribute('aria-label','Back to top');top.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m5 15 7-7 7 7"/></svg>';document.body.append(top);top.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'}));const onScroll=()=>{top.classList.toggle('visible',scrollY>600);document.querySelector('#header').classList.toggle('scrolled',scrollY>30)};window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{onScroll();ticking=false})},{passive:true});onScroll();
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.nav-dropdown').forEach(d=>d.open=false);document.querySelector('.nav-links').classList.remove('open');const b=document.querySelector('.menu-toggle');b.setAttribute('aria-expanded','false');b.textContent='Menu'}});
 document.addEventListener('click',e=>{if(!e.target.closest('.nav-dropdown'))document.querySelectorAll('.nav-dropdown').forEach(d=>d.open=false)});
}
