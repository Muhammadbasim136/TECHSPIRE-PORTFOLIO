window.addEventListener('load',()=>setTimeout(()=>document.getElementById('preloader').classList.add('out'),600));
(function(){
  const s=document.createElement('script');
  s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  s.onload=initHero;document.head.appendChild(s);
})();
function initHero(){
  const canvas=document.getElementById('hero-canvas');
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth,innerHeight);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,1000);
  camera.position.set(0,0,5);
  const geo=new THREE.BufferGeometry();
  const N=3500,pos=new Float32Array(N*3),cols=new Float32Array(N*3);
  for(let i=0;i<N;i++){
    const phi=Math.acos(-1+2*i/N),theta=Math.sqrt(N*Math.PI)*phi,r=3.2+Math.random()*.6;
    pos[i*3]=r*Math.sin(phi)*Math.cos(theta);pos[i*3+1]=r*Math.sin(phi)*Math.sin(theta);pos[i*3+2]=r*Math.cos(phi);
    const t=Math.random();cols[i*3]=.48+t*.3;cols[i*3+1]=.22+t*.15;cols[i*3+2]=.93+t*.07;
  }
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));geo.setAttribute('color',new THREE.BufferAttribute(cols,3));
  const sphere=new THREE.Points(geo,new THREE.PointsMaterial({size:.032,vertexColors:true,transparent:true,opacity:.75}));
  scene.add(sphere);
  const core=new THREE.Mesh(new THREE.IcosahedronGeometry(1.1,4),new THREE.MeshBasicMaterial({color:0x7c3aed,wireframe:true,transparent:true,opacity:.06}));
  scene.add(core);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2.6,.008,6,120),new THREE.MeshBasicMaterial({color:0xa855f7,transparent:true,opacity:.18}));
  ring.rotation.x=Math.PI/3;scene.add(ring);
  const ring2=new THREE.Mesh(new THREE.TorusGeometry(2.1,.006,6,100),new THREE.MeshBasicMaterial({color:0x06b6d4,transparent:true,opacity:.12}));
  ring2.rotation.x=Math.PI/5;ring2.rotation.z=Math.PI/4;scene.add(ring2);
  let mx=0,my=0;
  document.addEventListener('mousemove',e=>{mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2});
  let t=0;
  (function animate(){requestAnimationFrame(animate);t+=.004;
    sphere.rotation.y=t*.18;sphere.rotation.x=t*.06;
    core.rotation.y=-t*.25;core.rotation.x=t*.1;
    ring.rotation.z=t*.12;ring2.rotation.y=t*.09;
    camera.position.x+=(mx*.6-camera.position.x)*.04;
    camera.position.y+=(-my*.4-camera.position.y)*.04;
    camera.lookAt(scene.position);renderer.render(scene,camera);
  })();
  window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
}
const roles=['React Development','Full-Stack Solutions','Node.js Backend','Firebase Integration','SEO Optimization','Custom Deployments'];
let ri=0,ci=0,del=false;
const rt=document.getElementById('roleText');
function type(){const w=roles[ri];rt.textContent=del?w.slice(0,ci-1):w.slice(0,ci+1);del?ci--:ci++;
  if(!del&&ci===w.length)setTimeout(()=>del=true,2200);else if(del&&ci===0){del=false;ri=(ri+1)%roles.length}
  setTimeout(type,del?42:90);}
setTimeout(type,1000);
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',scrollY>40);
  let cur='';document.querySelectorAll('section,[id="stats"]').forEach(s=>{if(scrollY>=s.offsetTop-130)cur=s.id});
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href').slice(1)===cur));
},{passive:true});
const hb=document.getElementById('hamburger'),nl=document.getElementById('navLinks');
hb.addEventListener('click',()=>{nl.classList.toggle('open');hb.textContent=nl.classList.contains('open')?'✕':'☰'});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{nl.classList.remove('open');hb.textContent='☰'}));
const revObs=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');revObs.unobserve(en.target)}})},{threshold:.07});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));
const skObs=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.style.width=en.target.dataset.w+'%';skObs.unobserve(en.target)}})},{threshold:.4});
document.querySelectorAll('.sk-fill').forEach(b=>skObs.observe(b));
document.querySelectorAll('.proj-preview[data-url]').forEach(prev=>{
  const iw=prev.querySelector('.proj-iframe-wrap'),iframe=prev.querySelector('iframe'),emoji=prev.querySelector('.proj-emoji');
  const card=prev.closest('.proj-card');
  let loaded=false;
  function load(){
    if(loaded)return;loaded=true;
    iframe.src=prev.dataset.url;
    function scale(){const pw=prev.offsetWidth,ph=prev.offsetHeight;if(!pw)return;const sc=Math.max(pw/1440,ph/900);iw.style.cssText='position:absolute;top:0;left:0;transform-origin:top left;transform:scale('+sc+')';iframe.style.width=(pw/sc)+'px';iframe.style.height=(ph/sc)+'px';}
    scale();window.addEventListener('resize',scale);emoji.style.opacity='0';
  }
  card.addEventListener('mouseenter',load);
  const obs=new IntersectionObserver(e=>{if(e[0].isIntersecting){setTimeout(load,400);obs.disconnect()}},{rootMargin:'200px'});
  obs.observe(prev);
});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'})});
});
function validEmail(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}
async function doSubmit(){
  const n=document.getElementById('fname'),em=document.getElementById('femail'),msg=document.getElementById('fmsg'),btn=document.getElementById('sbtn'),st=document.getElementById('fstatus'),er=document.getElementById('ferr');
  [n,em,msg].forEach(x=>x.classList.remove('err'));er.style.display='none';st.className='';st.style.display='none';
  let bad=false;
  if(!n.value.trim()){n.classList.add('err');bad=true}
  if(!em.value.trim()){em.classList.add('err');bad=true}else if(!validEmail(em.value.trim())){em.classList.add('err');er.style.display='block';bad=true}
  if(!msg.value.trim()){msg.classList.add('err');bad=true}
  if(bad)return;
  btn.disabled=true;btn.innerHTML='<i class="fa fa-spinner fa-spin"></i> Sending...';
  try{
    const r=await fetch('https://portfolio-five-snowy-85.vercel.app/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n.value.trim(),email:em.value.trim(),message:msg.value.trim()})});
    const d=await r.json();
    if(d.success){st.className='ok';st.innerHTML='&#10003; Message sent! We\'ll be in touch within 24 hours.';n.value=em.value=msg.value='';btn.innerHTML='<i class="fa fa-check"></i> Sent';setTimeout(()=>{btn.innerHTML='<i class="fa fa-paper-plane"></i> Send Message';btn.disabled=false;st.style.display='none'},5000);}
    else throw 0;
  }catch{st.className='fail';st.innerHTML='&#10005; Something went wrong. Please try WhatsApp directly.';btn.innerHTML='<i class="fa fa-paper-plane"></i> Send Message';btn.disabled=false;}
}
