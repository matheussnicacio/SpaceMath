// ===== PIXEL STARS (menu) =====
(function(){
  const c=document.getElementById('pixelStars');
  if(!c) return;
  const colors=['star-white','star-yellow','star-cyan','star-pink','star-purple'];
  const weights=[0.35,0.2,0.2,0.15,0.1];
  function pickColor(){
    const r=Math.random(); let acc=0;
    for(let i=0;i<colors.length;i++){ acc+=weights[i]; if(r<acc) return colors[i]; }
    return colors[0];
  }
  for(let i=0;i<110;i++){
    const s=document.createElement('div');
    s.className='px-star '+pickColor();
    const sz=Math.random()<0.15?4:Math.random()<0.35?3:Math.random()<0.55?2:1;
    s.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*82}%;--d:${(1.2+Math.random()*2.8).toFixed(1)}s;--dl:${(Math.random()*4).toFixed(1)}s;position:absolute;z-index:1;`;
    c.appendChild(s);
  }
})();

// ===== STATE =====
let state={
  running:false,paused:false,score:0,lives:3,wave:1,
  waveTime:0,waveMax:30,correct:0,errors:0,
  difficulty:'medium',ufos:[],currentInput:'',
  ufoSpeed:0.7,spawnInterval:3000,maxUfos:4,
  lastSkinUnlockWave:0,
};
const DIFF={
  easy:  {min:1,max:10, speed:0.45,spawn:4000,maxUfos:3,lives:5},
  medium:{min:1,max:20, speed:0.7, spawn:3000,maxUfos:4,lives:3},
  hard:  {min:1,max:50, speed:1.1, spawn:2200,maxUfos:5,lives:2},
};
const OPS_MAP = { add:'+', sub:'-', mul:'×', div:'/', pct:'%', prob:'P', stat:'σ', sqrt:'√', med:'m' };
const SPECIAL_OPS_LABELS = { pct:'Porcentagem', prob:'Probabilidade', stat:'Estatística', sqrt:'Raiz Quadrada', med:'Grandezas' };
let opOptions = { add:true, sub:true, mul:true, div:true, pct:false, prob:false, stat:false, sqrt:false, med:false };
let opOptionsDraft = { add:true, sub:true, mul:true, div:true, pct:false, prob:false, stat:false, sqrt:false, med:false };

(function loadOpOptions(){
  try {
    const saved = localStorage.getItem('spacemath_ops');
    if(saved){ opOptions = JSON.parse(saved); opOptionsDraft = {...opOptions}; }
  } catch(e){}
})();

function getActiveOPS(){
  return Object.keys(opOptions).filter(k=>opOptions[k]).map(k=>OPS_MAP[k]);
}

// =====================================================
// FIX: Global interval handles — prevents accumulation
// =====================================================
let gameLoop = null;
let spawnLoop = null;
let shootingStarInterval = null;  // FIX 1: single shooting star interval
let ufoIdCounter = 0;
let _gameAreaCache = null; // DECLARATION ADDED
let _areaDims = {w:0,h:0};
function refreshAreaDims(){ const a=getGameArea(); if(a){ _areaDims.w=a.offsetWidth; _areaDims.h=a.offsetHeight; } }
function getGameArea(){ if(!_gameAreaCache) _gameAreaCache = document.getElementById('gameArea'); return _gameAreaCache; }

