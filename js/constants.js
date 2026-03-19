// ===== PIXEL STARS =====
(function(){
  const c=document.getElementById('pixelStars');
  for(let i=0;i<80;i++){
    const s=document.createElement('div'); s.className='px-star';
    const sz=Math.random()<0.3?3:Math.random()<0.5?2:1;
    s.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*80}%;--d:${(1.5+Math.random()*3).toFixed(1)}s;--dl:${(Math.random()*3).toFixed(1)}s;position:absolute;z-index:1;`;
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
const OPS_MAP = { add:'+', sub:'-', mul:'×', div:'÷', pct:'%', prob:'P', stat:'σ', sqrt:'√', med:'m' };
const SPECIAL_OPS_LABELS = { pct:'Porcentagem', prob:'Probabilidade', stat:'Estatística', sqrt:'Raiz Quadrada', med:'Grandezas' };
let opOptions = { add:true, sub:true, mul:true, div:true, pct:false, prob:false, stat:false, sqrt:false, med:false };
let opOptionsDraft = { add:true, sub:true, mul:true, div:true, pct:false, prob:false, stat:false, sqrt:false, med:false };

function getActiveOPS(){
  return Object.keys(opOptions).filter(k=>opOptions[k]).map(k=>OPS_MAP[k]);
}

// ===== GLOBAL HANDLES (evita acúmulo de intervals) =====
let gameLoop = null;
let spawnLoop = null;
let shootingStarInterval = null;
let ufoIdCounter = 0;
let _areaDims = {w:0,h:0};
let _gameAreaCache = null;
function refreshAreaDims(){ const a=getGameArea(); if(a){ _areaDims.w=a.offsetWidth; _areaDims.h=a.offsetHeight; } }
function getGameArea(){ if(!_gameAreaCache) _gameAreaCache = document.getElementById('gameArea'); return _gameAreaCache; }
