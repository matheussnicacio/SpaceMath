// ===== TUTORIAL =====
// ===== TUTORIAL STATE =====
let tutCurrentSlide = 0;
const TUT_TOTAL = 6;
let tutAnimFrame = null;
let tutTypingInterval = null;   // FIX 2: track typing animation interval
let tutStarsInitialized = false; // FIX 3: only init stars once

function showTutorial(){
  tutCurrentSlide = 0;
  document.getElementById('tutorialScreen').classList.add('show');
  buildTutDots();
  tutGoTo(0);
  // FIX 3: Only draw stars once (expensive canvas operation)
  if(!tutStarsInitialized){
    initTutStars();
    tutStarsInitialized = true;
  }
  initTutSkinsShowcase();
  startTutTypingAnim();
  setTimeout(()=>{
    const s1 = document.getElementById('tutUfoSlide1');
    if(s1) s1.innerHTML = buildUFOSVG(1);
    const s3 = document.getElementById('tutUfoSlide3');
    if(s3) s3.innerHTML = buildUFOSVG(1);
  }, 50);
}

function closeTutorial(){
  document.getElementById('tutorialScreen').classList.remove('show');
  if(tutAnimFrame){ cancelAnimationFrame(tutAnimFrame); tutAnimFrame=null; }
  // FIX 2: Always cancel typing interval when closing tutorial
  if(tutTypingInterval){ clearInterval(tutTypingInterval); tutTypingInterval=null; }
}

function tutNav(dir){ tutGoTo(tutCurrentSlide + dir); }

function tutGoTo(idx){
  if(idx < 0 || idx >= TUT_TOTAL) return;
  tutCurrentSlide = idx;
  document.getElementById('tutSlides').style.transform = `translateX(-${idx * 100}%)`;
  document.getElementById('tutPrevBtn').disabled = idx === 0;
  const nextBtn = document.getElementById('tutNextBtn');
  if(idx === TUT_TOTAL - 1){
    nextBtn.textContent = '✔ JOGAR AGORA';
    nextBtn.className = 'tut-nav-btn finish';
    nextBtn.onclick = () => { closeTutorial(); };
  } else {
    nextBtn.textContent = 'PRÓXIMO ►';
    nextBtn.className = 'tut-nav-btn primary';
    nextBtn.onclick = () => tutNav(1);
  }
  document.querySelectorAll('.tut-dot').forEach((d,i)=>{
    d.classList.toggle('active', i===idx);
  });
  const icon = document.querySelector(`#tutSlides .tut-slide:nth-child(${idx+1}) .tut-slide-icon`);
  if(icon){ icon.style.animation='none'; void icon.offsetWidth; icon.style.animation='tutIconPop 0.5s ease-out'; }
}

function buildTutDots(){
  const container = document.getElementById('tutDots');
  container.innerHTML = '';
  for(let i=0;i<TUT_TOTAL;i++){
    const d = document.createElement('div');
    d.className = 'tut-dot' + (i===0?' active':'');
    d.onclick = ()=>tutGoTo(i);
    container.appendChild(d);
  }
}

function initTutStars(){
  for(let s=1;s<=TUT_TOTAL;s++){
    const canvas = document.getElementById('tutStars'+s);
    if(!canvas) continue;
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth || 600;
    canvas.height = parent.offsetHeight || 400;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<120;i++){
      const x=Math.random()*canvas.width, y=Math.random()*canvas.height;
      const r=Math.random()*1.3, a=Math.random()*0.7+0.2;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${a})`; ctx.fill();
    }
  }
}

function initTutSkinsShowcase(){
  const container = document.getElementById('tutSkinsShowcase');
  if(!container || typeof SKINS==='undefined') return;
  container.innerHTML = '';
  [0,1,2,3,4].forEach((idx,i)=>{
    const skin = SKINS[idx];
    const wrap = document.createElement('div');
    wrap.className = 'tut-skin-mini';
    wrap.style.setProperty('--d', (2.5+i*0.4)+'s');
    wrap.style.setProperty('--dl', (i*0.3)+'s');
    wrap.innerHTML = buildAstronautSVG(skin, 0.75)
      + `<div class="tut-skin-mini-name">${skin.name}</div>`;
    container.appendChild(wrap);
  });
}

function startTutTypingAnim(){
  // FIX 2: Clear any existing interval before creating a new one
  if(tutTypingInterval){ clearInterval(tutTypingInterval); tutTypingInterval=null; }

  const sequence = [
    {key:'tutKey1', val:'1', delay:800},
    {key:'tutKey2', val:'2', delay:1400},
    {clear:true, delay:2200},
    {key:'tutKey1', val:'1', delay:3000},
    {key:'tutKey2', val:'2', delay:3600},
    {clear:true, delay:5000},
  ];

  function runSeq(){
    sequence.forEach(step => {
      setTimeout(()=>{
        const disp = document.getElementById('tutDisplayDemo');
        if(!disp) return;
        if(step.clear){
          disp.textContent = '_';
          document.querySelectorAll('.tut-numkey').forEach(k=>k.classList.remove('lit'));
        } else {
          const prev = disp.textContent === '_' ? '' : disp.textContent;
          disp.textContent = prev + step.val;
          const el = document.getElementById(step.key);
          if(el){ el.classList.add('lit'); setTimeout(()=>el.classList.remove('lit'),300); }
        }
      }, step.delay);
    });
  }
  runSeq();
  // FIX 2: Save the interval ID so it can be cancelled
  tutTypingInterval = setInterval(runSeq, 5500);
}

(function(){
  setTimeout(()=>{
    const el = document.getElementById('tutAstroDemoLaser');
    if(el && typeof buildAstronautSVG!=='undefined' && typeof skinState!=='undefined'){
      el.innerHTML = buildAstronautSVG(getSkin(skinState.active), 0.7);
    }
  }, 500);
})();


// ===== PAUSE =====
// ===== PAUSE =====
function pauseGame(){
  if(!state.running||state.paused)return;
  state.paused=true;
  clearInterval(gameLoop); gameLoop=null;
  clearInterval(spawnLoop); spawnLoop=null;
  document.getElementById('pauseScore').textContent=state.score;
  document.getElementById('pauseCorrect').textContent=state.correct;
  document.getElementById('pauseErrors').textContent=state.errors;
  document.getElementById('pauseScreen').classList.remove('hidden');
}
function resumeGame(){
  if(!state.paused)return;
  state.paused=false;
  document.getElementById('pauseScreen').classList.add('hidden');
  gameLoop=setInterval(()=>{if(!state.running||state.paused)return;moveUFOs();tickWave();},33);
  spawnLoop=setInterval(spawnUFO,state.spawnInterval);
}
function restartGame(){
  document.getElementById('pauseScreen').classList.add('hidden');
  state.ufos.forEach(u=>{try{u.el.remove()}catch(e){}});
  state.ufos=[];
  clearInterval(gameLoop); gameLoop=null;
  clearInterval(spawnLoop); spawnLoop=null;
  // Se estiver no modo campanha, reinicia a fase atual mantendo o tema do planeta
  const campPhaseId = state._campPhaseId;
  if(campPhaseId && typeof campState !== 'undefined' && campState.inProgress){
    const ph = CAMPAIGN_PHASES.find(p => p.id === campPhaseId);
    if(ph){ _startCampGamePhase(ph); return; }
  }
  startGame(state.difficulty);
}
function goToMainMenu(){
  state.running=false; state.paused=false;
  state.ufos.forEach(u=>{try{u.el.remove()}catch(e){}});
  state.ufos=[];
  clearInterval(gameLoop); gameLoop=null;
  clearInterval(spawnLoop); spawnLoop=null;
  // FIX 1: Stop shooting stars when returning to menu
  if(shootingStarInterval){ clearInterval(shootingStarInterval); shootingStarInterval=null; }
  document.getElementById('pauseScreen').classList.add('hidden');
  document.getElementById('diffOverlay').classList.remove('show');
  document.getElementById('startScreen').classList.remove('hidden');
}


// ===== KEYBOARD INPUT =====
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'||e.key==='p'||e.key==='P'){
    if(state.running&&!state.paused){pauseGame();e.preventDefault();return;}
    if(state.paused){resumeGame();e.preventDefault();return;}
  }
  if(!state.running||state.paused)return;
  if(e.key>='0'&&e.key<='9'){addDigit(e.key);e.preventDefault();}
  else if(e.key==='Enter'){checkAnswer();e.preventDefault();}
  else if(e.key==='Backspace'){
    state.currentInput=state.currentInput.slice(0,-1);
    document.getElementById('display').textContent=state.currentInput||'_';
    e.preventDefault();
  }
});


// ===== CREDITS & MENU =====
function openCredits(){ document.getElementById('creditsScreen').classList.add('show'); }
function closeCredits(){ document.getElementById('creditsScreen').classList.remove('show'); }

(function initMenuUFOs(){
  [1,2,3].forEach((t,i)=>{
    const el = document.getElementById('menuUfo'+(i+1));
    if(el) el.innerHTML = buildUFOSVG(t);
  });
})();

