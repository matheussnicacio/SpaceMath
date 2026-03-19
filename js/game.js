// ===== PROBLEM =====
function _generateSpecialProblem(op){
  let q, ans;
  switch(op){
    case '%': {
      const pcts=[10,20,25,50];
      const pct=pcts[rand(0,pcts.length-1)];
      const totals=[20,40,50,80,100,200];
      const tot=totals[rand(0,totals.length-1)];
      ans=Math.round(pct*tot/100);
      q=`${pct}% de ${tot} = ?`;
      break;
    }
    case 'P': {
      const totals=[4,5,6,8,10];
      const tot=totals[rand(0,totals.length-1)];
      ans=rand(1,tot-1);
      q=`P=${ans}/${tot}. Favoráveis?`;
      break;
    }
    case 'σ': {
      // mean of 3 numbers — always divisible by 3
      const m=rand(2,15);
      const d=rand(1,m-1);
      const a1=m-d, a2=m, a3=m+d;
      ans=m;
      q=`Média ${a1},${a2},${a3}=?`;
      break;
    }
    case '√': {
      const base=rand(1,12);
      ans=base;
      q=`√${base*base} = ?`;
      break;
    }
    case 'm': {
      const t=rand(0,3);
      if(t===0){ const km=rand(1,9); ans=km*1000; q=`${km}km=?m`; }
      else if(t===1){ const m=rand(1,9); ans=m*100; q=`${m}m=?cm`; }
      else if(t===2){ const kg=rand(1,5); ans=kg*1000; q=`${kg}kg=?g`; }
      else { const min=rand(1,9); ans=min*60; q=`${min}min=?s`; }
      break;
    }
    default: return null;
  }
  return { question: q, answer: ans };
}

function generateProblem(){
  const d=DIFF[state.difficulty];
  const activeOps=getActiveOPS();
  const op=activeOps[Math.floor(Math.random()*activeOps.length)];
  // Special ops
  if(['%','P','σ','√','m'].includes(op)){
    const sp=_generateSpecialProblem(op);
    if(sp) return sp;
  }
  let a,b,ans;
  switch(op){
    case '+':a=rand(d.min,d.max);b=rand(d.min,d.max);ans=a+b;break;
    case '-':a=rand(d.min,d.max);b=rand(d.min,a);ans=a-b;break;
    case '×':a=rand(1,12);b=rand(1,12);ans=a*b;break;
    case '÷':ans=rand(1,12);b=rand(1,12);a=ans*b;break;
    default: a=rand(d.min,d.max);b=rand(d.min,d.max);ans=a+b;
  }
  return{question:`${a} ${op} ${b} = ?`,answer:ans};
}
function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}

// ===== UFO =====
const UFO_PALETTES = {
  1: { body:'#2ecc40', dark:'#0d5c00', top:'#39ff14', dome:'#1a4a00', eye:'#0a2a0a', eyeGlow:'#39ff14', win:'#90ff70', ant:'#39ff14' },
  2: { body:'#dd3300', dark:'#661100', top:'#ff4422', dome:'#8a1500', eye:'#1a0000', eyeGlow:'#ff6644', win:'#ff9977', ant:'#ff4422' },
  3: { body:'#8833cc', dark:'#3a0a6a', top:'#b060f0', dome:'#5a1a9a', eye:'#1a001a', eyeGlow:'#cc88ff', win:'#cc99ff', ant:'#b060f0' },
};
function buildUFOSVG(type) {
  const p = UFO_PALETTES[type] || UFO_PALETTES[1];
  return `<div class="ufo-pixel-body">
  <svg width="80" height="56" viewBox="0 0 80 56" style="image-rendering:pixelated;display:block;">
    <rect x="31" y="0" width="4" height="2" fill="${p.ant}"/>
    <rect x="30" y="2" width="6" height="2" fill="${p.ant}"/>
    <rect x="29" y="4" width="4" height="6" fill="${p.ant}"/>
    <rect x="27" y="2" width="4" height="2" fill="${p.ant}"/>
    <rect x="26" y="0" width="4" height="2" fill="${p.ant}"/>
    <rect x="47" y="0" width="4" height="2" fill="${p.ant}"/>
    <rect x="47" y="2" width="4" height="2" fill="${p.ant}"/>
    <rect x="47" y="4" width="4" height="6" fill="${p.ant}"/>
    <rect x="49" y="2" width="4" height="2" fill="${p.ant}"/>
    <rect x="49" y="0" width="4" height="2" fill="${p.ant}"/>
    <rect x="25" y="0" width="6" height="4" fill="${p.ant}" opacity="0.9" rx="2"/>
    <rect x="49" y="0" width="6" height="4" fill="${p.ant}" opacity="0.9" rx="2"/>
    <rect x="26" y="10" width="28" height="2" fill="${p.top}"/>
    <rect x="22" y="12" width="36" height="2" fill="${p.top}"/>
    <rect x="20" y="14" width="40" height="2" fill="${p.top}"/>
    <rect x="18" y="16" width="44" height="6" fill="${p.dome}"/>
    <rect x="20" y="14" width="8" height="4" fill="rgba(255,255,255,0.2)"/>
    <rect x="20" y="14" width="4" height="2" fill="rgba(255,255,255,0.3)"/>
    <rect x="4"  y="22" width="72" height="12" fill="${p.body}"/>
    <rect x="10" y="22" width="60" height="12" fill="${p.body}"/>
    <rect x="2"  y="26" width="76" height="6"  fill="${p.body}"/>
    <rect x="0"  y="28" width="80" height="4"  fill="${p.dark}"/>
    <rect x="4"  y="32" width="72" height="4"  fill="${p.dark}" opacity="0.6"/>
    <rect x="12" y="34" width="56" height="2"  fill="${p.dark}" opacity="0.8"/>
    <rect x="16" y="24" width="10" height="8" fill="${p.eye}"/>
    <rect x="17" y="25" width="8"  height="6" fill="${p.eyeGlow}" opacity="0.25"/>
    <rect x="35" y="24" width="10" height="8" fill="${p.eye}"/>
    <rect x="36" y="25" width="8"  height="6" fill="${p.eyeGlow}" opacity="0.25"/>
    <rect x="54" y="24" width="10" height="8" fill="${p.eye}"/>
    <rect x="55" y="25" width="8"  height="6" fill="${p.eyeGlow}" opacity="0.25"/>
    <rect x="17" y="25" width="3" height="2" fill="${p.win}" opacity="0.6"/>
    <rect x="36" y="25" width="3" height="2" fill="${p.win}" opacity="0.6"/>
    <rect x="55" y="25" width="3" height="2" fill="${p.win}" opacity="0.6"/>
    <rect x="28" y="36" width="24" height="2" fill="${p.body}" opacity="0.5"/>
    <rect x="32" y="38" width="16" height="2" fill="${p.body}" opacity="0.3"/>
    <rect x="36" y="40" width="8"  height="2" fill="${p.body}" opacity="0.15"/>
  </svg></div>`;
}

function getUFOType(){
  if(state.wave>=10){const r=Math.random();return r<0.33?1:r<0.66?2:3;}
  if(state.wave>=5)return Math.random()<0.5?1:2;
  return 1;
}
function spawnUFO(){
  if(!state.running||state.paused||state.ufos.length>=state.maxUfos)return;
  const area=getGameArea();
  const areaW=_areaDims.w||area.offsetWidth;
  const prob=generateProblem(),type=getUFOType(),id=ufoIdCounter++;
  const el=document.createElement('div');
  el.className=`ufo type${type}`; el.id=`ufo_${id}`;
  el.innerHTML=`<div class="ufo-label">${prob.question}</div>` + buildUFOSVG(type) + `<div class="ufo-beam"></div>`;
  const startX=rand(20,areaW-100);
  el.style.left=startX+'px'; el.style.top='-110px';
  area.appendChild(el);
  state.ufos.push({id,el,answer:prob.answer,y:-110,x:startX,speed:state.ufoSpeed*(type===2?1.5:1),erratic:type===3,driftDir:Math.random()<0.5?1:-1,driftOffset:0});
}
function moveUFOs(){
  const area=getGameArea();
  const areaH=_areaDims.h||area.offsetHeight,areaW=_areaDims.w||area.offsetWidth,boundary=areaH-120-50;
  for(let i=state.ufos.length-1;i>=0;i--){
    const u=state.ufos[i]; u.y+=u.speed;
    if(u.erratic){
      u.driftOffset+=u.driftDir*0.6;
      if(Math.abs(u.driftOffset)>30)u.driftDir*=-1;
      u.x=Math.max(10,Math.min(areaW-90,u.x+u.driftDir*0.4));
      u.el.style.left=u.x+'px';
    }
    u.el.style.top=u.y+'px';
    if(u.y>boundary){triggerFlash('red');u.el.remove();state.ufos.splice(i,1);loseLife();}
  }
}

// ===== ANSWER =====
function checkAnswer(){
  if(!state.running||state.paused||state.currentInput==='')return;
  const ans=parseInt(state.currentInput);
  const hits=state.ufos.filter(u=>u.answer===ans);
  if(hits.length>0){
    if(hits.length>=3){state.score+=200;showFloatingText('+200 COMBO!','#ffd700',50,40);}
    else if(hits.length===2)state.score+=50;
    hits.forEach(u=>{explodeUFO(u);state.score+=100;});
    state.correct++; triggerFlash('green');
    showFloatingText(`+${hits.length*100}`,'#39ff14',50,50);
    const d=document.getElementById('display');
    d.classList.add('correct-flash'); setTimeout(()=>d.classList.remove('correct-flash'),300);
  } else {
    state.errors++; state.score=Math.max(0,state.score-50);
    triggerFlash('red');
    const d=document.getElementById('display');
    d.classList.add('wrong-shake'); setTimeout(()=>d.classList.remove('wrong-shake'),350);
    showFloatingText('-50','#ff2244',50,50);
  }
  clearDisplay(); updateHUD();
}
function explodeUFO(ufo){
  const area=getGameArea();
  // Limit simultaneous explosions to avoid DOM flooding
  const existingBooms=area.querySelectorAll('.explosion');
  if(existingBooms.length<8){
    const boom=document.createElement('div');
    boom.className='explosion'; boom.style.left=ufo.x+'px'; boom.style.top=ufo.y+'px'; boom.textContent='💥';
    area.appendChild(boom); setTimeout(()=>boom.remove(),700);
  }
  const astro=document.getElementById('astronaut');
  const ar=astro.getBoundingClientRect(),ar2=area.getBoundingClientRect();
  const laserH=Math.max(0,(ar.top-ar2.top)-ufo.y-50);
  // Limit simultaneous lasers
  const existingLasers=area.querySelectorAll('.laser');
  if(existingLasers.length<8){
    const laser=document.createElement('div');
    laser.className='laser'; laser.style.left=(ufo.x+35)+'px'; laser.style.top=ufo.y+'px'; laser.style.height=laserH+'px';
    area.appendChild(laser); setTimeout(()=>laser.remove(),400);
  }
  ufo.el.remove(); state.ufos.splice(state.ufos.indexOf(ufo),1);
}

function loseLife(){state.lives--;updateHUD();if(state.lives<=0)gameOver();}
function gameOver(){
  state.running=false;
  clearInterval(gameLoop); gameLoop=null;
  clearInterval(spawnLoop); spawnLoop=null;
  // FIX 1: Stop shooting star timer on game over
  if(shootingStarInterval){ clearInterval(shootingStarInterval); shootingStarInterval=null; }
  state.ufos.forEach(u=>u.el.remove()); state.ufos=[];
  document.getElementById('goScore').textContent=state.score;
  document.getElementById('goWave').textContent=state.wave;
  document.getElementById('goCorrect').textContent=state.correct;
  document.getElementById('goErrors').textContent=state.errors;
  const t=state.correct+state.errors;
  document.getElementById('goAccuracy').textContent=t>0?Math.round(state.correct/t*100)+'%':'0%';

  // High score handling
  const storedHigh = parseInt(localStorage.getItem('spacemath_highscore')||'0');
  const isNewRecord = state.score > storedHigh && state.score > 0;
  // Hide ability hud
  var _ah = document.getElementById('abilityHud');
  if(_ah) _ah.classList.remove('show');
  if(isNewRecord){
    localStorage.setItem('spacemath_highscore', state.score);
    document.getElementById('goHighScore').textContent = state.score;
    document.getElementById('nrOldScore').textContent = storedHigh;
    document.getElementById('nrNewScore').textContent = state.score;
    document.getElementById('newRecordScreen').classList.remove('hidden');
  } else {
    document.getElementById('goHighScore').textContent = Math.max(storedHigh, state.score);
    document.getElementById('gameOverScreen').classList.remove('hidden');
  }
}

function closeNewRecord(){
  document.getElementById('newRecordScreen').classList.add('hidden');
  document.getElementById('gameOverScreen').classList.remove('hidden');
  resetGame();
}
function closeNewRecordToSkins(){
  document.getElementById('newRecordScreen').classList.add('hidden');
  document.getElementById('gameOverScreen').classList.remove('hidden');
  openSkinCollection('gameover');
}

function tickWave(){
  if(!state.running||state.paused)return;
  state.waveTime+=0.033;
  document.getElementById('waveBar').style.width=Math.min(state.waveTime/state.waveMax*100,100)+'%';
  document.getElementById('waveTimeDisplay').textContent=Math.max(0,Math.ceil(state.waveMax-state.waveTime))+'s';
  if(state.waveTime>=state.waveMax)advanceWave();
}
function advanceWave(){
  state.wave++;state.waveTime=0;
  state.ufoSpeed=Math.min(state.ufoSpeed+0.15,3.5);
  state.spawnInterval=Math.max(1500,state.spawnInterval-200);
  state.maxUfos=Math.min(7,state.maxUfos+1);
  clearInterval(spawnLoop);
  spawnLoop=setInterval(spawnUFO,state.spawnInterval);
  const ann=document.getElementById('waveAnnounce');
  ann.textContent=`ONDA ${state.wave}`; ann.style.display='block';
  ann.style.animation='none'; void ann.offsetWidth;
  ann.style.animation='waveAnim 2.5s ease-out forwards';
  setTimeout(()=>ann.style.display='none',2500);
  updateHUD();
  if(typeof checkSkinUnlock==='function') checkSkinUnlock(state.wave);
}

function updateHUD(){
  document.getElementById('waveDisplay').textContent=state.wave;
  document.getElementById('scoreDisplay').textContent=state.score;
  document.getElementById('correctDisplay').textContent=state.correct;
  document.getElementById('errorsDisplay').textContent=state.errors;
  const lv=document.getElementById('livesDisplay');
  const livesCount=Math.max(0,state.lives);
  // Only rebuild if count changed
  if(lv.dataset.lives !== String(livesCount)){
    lv.dataset.lives = livesCount;
    lv.innerHTML='';
    for(let i=0;i<livesCount;i++){
      const ico=document.createElement('span');
      ico.className='life-icon'; ico.style.setProperty('--i',i); ico.textContent='❤️';
      lv.appendChild(ico);
    }
  }
  const t=state.correct+state.errors;
  if(t>0){
    const acc=Math.round(state.correct/t*100);
    document.getElementById('accDisplay').textContent=acc+'%';
    document.getElementById('accBar').style.width=acc+'%';
  }
}

function addDigit(d){
  if(!state.running||state.paused||state.currentInput.length>=4)return;
  state.currentInput+=d;
  document.getElementById('display').textContent=state.currentInput;
}
function clearDisplay(){
  state.currentInput='';
  document.getElementById('display').textContent='_';
}

function triggerFlash(type){
  const f=document.getElementById('flashOverlay');
  f.className='flash-overlay'; void f.offsetWidth; f.className='flash-overlay '+type;
}
function showFloatingText(text,color,xPct,yPct){
  const area=getGameArea();
  // Limit simultaneous floating texts
  const existing=area.querySelectorAll('.floating-text');
  if(existing.length>=6){ try{existing[0].remove()}catch(e){} }
  const el=document.createElement('div');
  el.className='floating-text'; el.style.color=color;
  el.style.textShadow=`0 0 15px ${color}`;
  el.style.left=xPct+'%'; el.style.top=yPct+'%';
  el.textContent=text; area.appendChild(el);
  setTimeout(()=>el.remove(),1000);
}

function startGame(diff){
  _gameAreaCache = null; // reset cache in case DOM changed
  state.difficulty=diff;
  const d=DIFF[diff];
  state.lives=d.lives; state.ufoSpeed=d.speed;
  state.spawnInterval=d.spawn; state.maxUfos=d.maxUfos;
  state.score=0; state.wave=1; state.waveTime=0;
  state.correct=0; state.errors=0; state.ufos=[];
  state.lastSkinUnlockWave=0;
  state.running=true; state.paused=false;
  const _lv=document.getElementById('livesDisplay'); if(_lv) _lv.dataset.lives='';
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('gameOverScreen').classList.add('hidden');
  document.getElementById('pauseScreen').classList.add('hidden');
  document.getElementById('diffOverlay').classList.remove('show');
  applyPlanetTheme('default'); initBackground('default'); refreshAreaDims(); updateHUD(); clearDisplay();
  // Update HUD high score
  const _hs = parseInt(localStorage.getItem('spacemath_highscore')||'0');
  const _hudHs = document.getElementById('hudHighScore');
  if(_hudHs) _hudHs.textContent = _hs;
  updateAbilityHud();
  if(typeof proState!=='undefined' && proState.active && typeof proActivate==='function'){
    proActivate(proState.active);
  } else if(typeof applySkin==='function') applySkin(skinState.active);
  const ann=document.getElementById('waveAnnounce');
  ann.textContent='ONDA 1'; ann.style.display='block';
  ann.style.animation='none'; void ann.offsetWidth;
  ann.style.animation='waveAnim 2.5s ease-out forwards';
  setTimeout(()=>ann.style.display='none',2500);
  // FIX: Cancel previous loops before starting new ones
  clearInterval(gameLoop); clearInterval(spawnLoop);
  gameLoop=setInterval(()=>{if(!state.running||state.paused)return;moveUFOs();tickWave();},33);
  spawnLoop=setInterval(spawnUFO,state.spawnInterval);
  setTimeout(spawnUFO,800);
}

function resetGame(){
  state.ufos.forEach(u=>{try{u.el.remove()}catch(e){}});
  state.ufos=[];
  clearInterval(gameLoop); gameLoop=null;
  clearInterval(spawnLoop); spawnLoop=null;
  // FIX 1: Stop shooting star timer when going back to menu
  if(shootingStarInterval){ clearInterval(shootingStarInterval); shootingStarInterval=null; }
  document.getElementById('gameOverScreen').classList.add('hidden');
  document.getElementById('newRecordScreen').classList.add('hidden');
  document.getElementById('diffOverlay').classList.remove('show');
  document.getElementById('startScreen').classList.remove('hidden');
}

// keydown listener centralizado em js/ui.js