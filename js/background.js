// ===== PLANET THEMES =====
const PLANET_THEMES = {
  default: {
    skyGrad: ['#000000','#04060f','#080e1a'],
    starColor: [255,255,255],
    surfaceColors: ['#3d3d4a','#2a2a38'],
    surfaceBorder: '#4a4a60',
    craterColor: ['#1e1e2d','#2a2a38'],
    bgPlanet: null,
    bgPlanetStyle: '',
    ambientGlow: null,
    shootingStars: true,
    extraElements: null,
  },
  mercurio: {
    skyGrad: ['#0a0400','#180a02','#2a1005'],
    starColor: [255,200,120],
    surfaceColors: ['#4a2a10','#2e1808'],
    surfaceBorder: '#6a3a18',
    craterColor: ['#1a0a04','#2a1208'],
    bgPlanet: { x:'10%', y:'5%', size:'180px', emoji:'☀️', glow:'rgba(255,120,0,0.6)', blur:'0px', opacity:0.9 },
    ambientGlow: 'radial-gradient(ellipse at 15% 10%, rgba(255,80,0,0.18) 0%, transparent 55%)',
    shootingStars: false,
    extraElements: `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 12% 12%,rgba(255,100,0,0.12) 0%,transparent 50%);pointer-events:none;z-index:1;"></div>`,
  },
  venus: {
    skyGrad: ['#100500','#1e0a00','#2e1200'],
    starColor: [255,180,80],
    surfaceColors: ['#5a2a08','#3a1a05'],
    surfaceBorder: '#7a3a10',
    craterColor: ['#200a02','#2e1205'],
    bgPlanet: null,
    ambientGlow: 'radial-gradient(ellipse at 50% 0%, rgba(180,60,0,0.2) 0%, transparent 60%)',
    shootingStars: false,
    extraElements: `
      <div style="position:absolute;top:0;left:0;right:0;height:40%;z-index:1;pointer-events:none;overflow:hidden;">
        <div style="position:absolute;top:5%;left:-5%;right:-5%;height:80px;background:rgba(180,80,0,0.12);border-radius:50%;filter:blur(20px);animation:campPlanetFloat 5s ease-in-out infinite;"></div>
        <div style="position:absolute;top:15%;left:10%;right:10%;height:60px;background:rgba(150,60,0,0.1);border-radius:50%;filter:blur(25px);animation:campPlanetFloat 7s 1s ease-in-out infinite;"></div>
        <div style="position:absolute;top:2%;left:20%;right:20%;height:40px;background:rgba(200,100,0,0.08);border-radius:50%;filter:blur(15px);animation:campPlanetFloat 4s 2s ease-in-out infinite;"></div>
      </div>`,
  },
  marte: {
    skyGrad: ['#0a0000','#1a0400','#280600'],
    starColor: [255,150,120],
    surfaceColors: ['#6a2010','#4a1508'],
    surfaceBorder: '#8a3018',
    craterColor: ['#260800','#3a1005'],
    bgPlanet: null,
    ambientGlow: 'radial-gradient(ellipse at 50% 100%, rgba(180,40,0,0.15) 0%, transparent 50%)',
    shootingStars: true,
    extraElements: `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 85%,rgba(150,30,0,0.1) 0%,transparent 50%);pointer-events:none;z-index:1;"></div>`,
  },
  jupiter: {
    skyGrad: ['#020200','#0a0a03','#14100a'],
    starColor: [255,220,180],
    surfaceColors: ['#4a3a18','#2e2408'],
    surfaceBorder: '#6a5028',
    craterColor: ['#18120a','#221a0e'],
    bgPlanet: { x:'75%', y:'3%', size:'220px', emoji:'⊕', glow:'rgba(200,150,80,0.5)', blur:'2px', opacity:0.55 },
    ambientGlow: 'radial-gradient(ellipse at 78% 5%, rgba(180,120,40,0.15) 0%, transparent 45%)',
    shootingStars: true,
    extraElements: null,
  },
  saturno: {
    skyGrad: ['#010204','#040810','#080e1e'],
    starColor: [180,220,255],
    surfaceColors: ['#1a2a3a','#0e1a28'],
    surfaceBorder: '#2a3a5a',
    craterColor: ['#081018','#0e1820'],
    bgPlanet: { x:'70%', y:'2%', size:'200px', emoji:'♄', glow:'rgba(150,200,255,0.5)', blur:'1px', opacity:0.6 },
    ambientGlow: 'radial-gradient(ellipse at 73% 4%, rgba(100,150,220,0.12) 0%, transparent 45%)',
    shootingStars: true,
    extraElements: null,
  },
  urano: {
    skyGrad: ['#010608','#02101a','#041828'],
    starColor: [150,230,255],
    surfaceColors: ['#0a2a35','#061a22'],
    surfaceBorder: '#0e3848',
    craterColor: ['#021018','#041620'],
    bgPlanet: { x:'72%', y:'4%', size:'190px', emoji:'⛢', glow:'rgba(100,220,255,0.5)', blur:'1px', opacity:0.55 },
    ambientGlow: 'radial-gradient(ellipse at 75% 6%, rgba(80,200,240,0.12) 0%, transparent 45%)',
    shootingStars: true,
    extraElements: null,
  },
  netuno: {
    skyGrad: ['#000208','#000410','#00061e'],
    starColor: [120,150,255],
    surfaceColors: ['#0a103a','#060a28'],
    surfaceBorder: '#0e1850',
    craterColor: ['#020410','#040818'],
    bgPlanet: { x:'68%', y:'5%', size:'180px', emoji:'♆', glow:'rgba(80,100,255,0.6)', blur:'1px', opacity:0.6 },
    ambientGlow: 'radial-gradient(ellipse at 71% 7%, rgba(60,80,220,0.15) 0%, transparent 45%)',
    shootingStars: true,
    extraElements: null,
  },
  plutao: {
    skyGrad: ['#020104','#05020a','#080310'],
    starColor: [200,180,255],
    surfaceColors: ['#1a1028','#100818'],
    surfaceBorder: '#281840',
    craterColor: ['#0a0612','#12081e'],
    bgPlanet: { x:'65%', y:'6%', size:'140px', emoji:'✦', glow:'rgba(150,100,255,0.5)', blur:'2px', opacity:0.5 },
    ambientGlow: 'radial-gradient(ellipse at 68% 8%, rgba(120,80,200,0.1) 0%, transparent 45%)',
    shootingStars: true,
    extraElements: null,
  },
};

let _currentPlanetTheme = 'default';

function applyPlanetTheme(planetId) {
  _currentPlanetTheme = planetId || 'default';
  const theme = PLANET_THEMES[_currentPlanetTheme] || PLANET_THEMES.default;
  const area = getGameArea();

  // Sky gradient
  area.style.background = `linear-gradient(180deg, ${theme.skyGrad[0]} 0%, ${theme.skyGrad[1]} 50%, ${theme.skyGrad[2]} 100%)`;

  // Ambient glow overlay (between canvas and game elements)
  let glowEl = document.getElementById('planetGlowOverlay');
  if(!glowEl){ glowEl=document.createElement('div'); glowEl.id='planetGlowOverlay'; glowEl.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:1;'; area.appendChild(glowEl); }
  glowEl.style.background = theme.ambientGlow || '';

  // Extra atmospheric elements
  let atmosEl = document.getElementById('planetAtmosEl');
  if(atmosEl) atmosEl.remove();
  if(theme.extraElements){
    atmosEl = document.createElement('div');
    atmosEl.id = 'planetAtmosEl';
    atmosEl.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;';
    atmosEl.innerHTML = theme.extraElements;
    area.insertBefore(atmosEl, area.firstChild);
  }

  // Background planet orb (e.g. Sun behind Mercury, Jupiter behind its moon)
  let bgPlanetEl = document.getElementById('bgPlanetOrb');
  if(bgPlanetEl) bgPlanetEl.remove();
  if(theme.bgPlanet){
    bgPlanetEl = document.createElement('div');
    bgPlanetEl.id = 'bgPlanetOrb';
    const p = theme.bgPlanet;
    bgPlanetEl.style.cssText = `position:absolute;left:${p.x};top:${p.y};font-size:${p.size};filter:drop-shadow(0 0 40px ${p.glow}) blur(${p.blur});opacity:${p.opacity};pointer-events:none;z-index:2;animation:campPlanetFloat 8s ease-in-out infinite;`;
    bgPlanetEl.textContent = p.emoji;
    area.insertBefore(bgPlanetEl, area.firstChild);
  }

  // Moon surface theming
  const surf = document.getElementById('moonSurface');
  if(surf){
    surf.style.background = `linear-gradient(to bottom, ${theme.surfaceColors[0]} 0%, ${theme.surfaceColors[1]} 100%)`;
    surf.style.borderTopColor = theme.surfaceBorder;
  }
  // Craters
  document.querySelectorAll('.crater').forEach(c=>{
    c.style.background = `radial-gradient(circle, ${theme.craterColor[0]} 0%, ${theme.craterColor[1]} 100%)`;
  });

  // Earth orb visibility (hide on non-default themes)
  const earth = document.getElementById('earth');
  if(earth) earth.style.display = (planetId && planetId !== 'default') ? 'none' : '';
}

// ===== BACKGROUND =====
function initBackground(planetId){
  _currentPlanetTheme = planetId || _currentPlanetTheme || 'default';
  const theme = PLANET_THEMES[_currentPlanetTheme] || PLANET_THEMES.default;
  const canvas=document.getElementById('spaceCanvas');
  const area=getGameArea();
  canvas.width=area.offsetWidth; canvas.height=area.offsetHeight;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const [sr,sg,sb] = theme.starColor;
  for(let i=0;i<160;i++){
    const x=Math.random()*canvas.width,y=Math.random()*canvas.height;
    const r=Math.random()*1.5,a=Math.random()*0.8+0.2;
    ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fillStyle=`rgba(${sr},${sg},${sb},${a})`;ctx.fill();
  }
  if(shootingStarInterval){ clearInterval(shootingStarInterval); shootingStarInterval=null; }
  if(theme.shootingStars) shootingStarInterval=setInterval(spawnShootingStar, 5000+Math.random()*8000);
}

function spawnShootingStar(){
  if(!state.running)return;
  const area=getGameArea();
  const el=document.createElement('div');
  el.className='shoot-star';
  el.style.left=Math.random()*60+'%'; el.style.top=Math.random()*40+'%';
  el.style.transform=`rotate(${30+Math.random()*20}deg)`;
  area.appendChild(el); setTimeout(()=>el.remove(),1000);
}

