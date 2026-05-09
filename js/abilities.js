// ===================== PRO SKINS =====================
var PRO_SKINS = [
  {
    id:'pro_vida', name:'Guardião', icon:'❤️‍🔥',
    abilityShort:'+1 vida / 5 ondas',
    abilityDesc:'Ganha <em>+1 vida extra</em> a cada 5 ondas sobrevividas (máx 10).',
    suit:'#200a0a', visor:'#ff4466', accent:'#cc2244', chest:'#660022', glow:'rgba(255,68,102,0.7)',
    // task config
    taskDifficulty: 'easy',
    taskGoalWaves: 10,
    taskDesc: 'Sobreviva <strong>10 ondas</strong> na dificuldade <em>Fácil</em>.',
    taskShort: '10 ondas · Fácil',
    taskCrown: '❤️‍🔥',
  },
  {
    id:'pro_delay', name:'Crononauta', icon:'⏱️',
    abilityShort:'Delay nas naves',
    abilityDesc:'A cada onda, as naves ficam <em>70% mais lentas por 8 segundos</em>.',
    suit:'#0a1a2e', visor:'#00cfff', accent:'#0099cc', chest:'#003366', glow:'rgba(0,207,255,0.7)',
    taskDifficulty: 'medium',
    taskGoalWaves: 5,
    taskDesc: 'Sobreviva <strong>5 ondas</strong> na dificuldade <em>Médio</em>.',
    taskShort: '5 ondas · Médio',
    taskCrown: '⏱️',
  },
  {
    id:'pro_speed', name:'Acelerador', icon:'⚡',
    abilityShort:'Ondas 30% mais rápidas',
    abilityDesc:'Cada onda dura <em>30% menos tempo</em>, acelerando sua progressão.',
    suit:'#120a22', visor:'#cc44ff', accent:'#8800cc', chest:'#440066', glow:'rgba(200,68,255,0.7)',
    taskDifficulty: 'hard',
    taskGoalWaves: 3,
    taskDesc: 'Sobreviva <strong>3 ondas</strong> na dificuldade <em>Difícil</em>.',
    taskShort: '3 ondas · Difícil',
    taskCrown: '⚡',
  }
];

var proState = {
  unlocked: [],    // permanently unlocked skin IDs
  active: null,    // currently equipped skin ID
  pendingId: null, // skin being challenged
  lifeLastWave: 0,
  // task session state
  taskActive: false,
  taskSkinId: null,
  taskStartWave: null,
};

(function loadProState(){
  try {
    var s = localStorage.getItem('spacemath_pro_v2');
    if(s){ var d=JSON.parse(s); proState.unlocked=d.unlocked||[]; proState.active=d.active||null; }
    // migrate from old key
    else {
      var old = localStorage.getItem('spacemath_pro_v1');
      if(old){ var od=JSON.parse(old); proState.unlocked=od.unlocked||[]; proState.active=od.active||null; }
    }
  } catch(e){}
})();

function saveProState(){
  try { localStorage.setItem('spacemath_pro_v2', JSON.stringify({unlocked:proState.unlocked,active:proState.active})); } catch(e){}
}

function getProSkin(id){ return PRO_SKINS.find(function(s){return s.id===id;})||null; }

function proRenderGrid(){
  var grid = document.getElementById('skinGridPro');
  if(!grid) return;
  grid.innerHTML = '';
  PRO_SKINS.forEach(function(skin){
    var owned  = proState.unlocked.indexOf(skin.id) >= 0;
    var active = proState.active === skin.id;
    var card = document.createElement('div');
    var cls = 'skin-card pro-card';
    if(active) cls += ' pro-active-card';
    else if(owned) cls += ' pro-owned';
    card.className = cls;
    var inner = '<div class="skin-card-preview">' + buildAstronautSVG(skin, 0.75) + '</div>';
    inner += '<div class="skin-card-name">' + skin.icon + ' ' + skin.name + '</div>';
    inner += '<div class="skin-card-req">' + skin.abilityShort + '</div>';
    if(active){
      inner += '<div class="active-badge">ATIVO</div>';
    } else if(owned){
      inner += '<div class="pro-task-owned-tag">✔ DESBLOQUEADA</div>';
      inner += '<div class="pro-ability-label">Clique para ativar</div>';
    } else {
      inner += '<div class="pro-task-tag">🎯 ' + skin.taskShort + '</div>';
    }
    card.innerHTML = inner;
    if(!owned){
      card.addEventListener('click', function(){ openPixModal(skin.id); });
    } else if(!active){
      card.addEventListener('click', function(){ proActivate(skin.id); });
    }
    grid.appendChild(card);
  });
}

function proActivate(skinId){
  proState.active = skinId;
  saveProState();
  // Deactivate any free skin so only one is active at a time
  skinState.active = null;
  saveSkins();
  proRenderGrid();
  renderSkinCollection && renderSkinCollection();
  var skin = getProSkin(skinId);
  if(skin){
    var el = document.getElementById('astronaut');
    if(el) el.innerHTML = buildAstronautSVG(skin);
    var mel = document.getElementById('menuAstronaut');
    if(mel){ mel.innerHTML = buildAstronautSVG(skin,1.33); mel.style.filter='drop-shadow(0 0 12px '+skin.glow+')'; }
  }
}

// ── TASK MODAL ──────────────────────────────────────
function openPixModal(skinId){
  var skin = getProSkin(skinId);
  if(!skin) return;
  proState.pendingId = skinId;
  document.getElementById('taskModalCrown').textContent = skin.taskCrown || '🎯';
  document.getElementById('pixSkinName').textContent = skin.icon + ' ' + skin.name.toUpperCase();
  document.getElementById('pixSkinAbility').innerHTML = skin.abilityDesc;
  document.getElementById('pixSkinSVG').innerHTML = buildAstronautSVG(skin, 1.0);
  document.getElementById('taskGoalDesc').innerHTML = skin.taskDesc;

  // difficulty label
  var diffLabels = {easy:'Fácil', medium:'Médio', hard:'Difícil'};
  var diffLabel = diffLabels[skin.taskDifficulty] || skin.taskDifficulty;
  document.getElementById('taskModalSubtitle').innerHTML =
    'Se atingir a meta, ela é sua <strong>para sempre</strong>!';

  // hide progress bar initially (only visible when task running)
  document.getElementById('taskProgWrap').style.display = 'none';
  document.getElementById('taskStartBtn').disabled = false;
  document.getElementById('taskStartBtn').textContent = '🚀 INICIAR TAREFA — ' + diffLabel.toUpperCase();

  document.getElementById('pixModal').classList.remove('hidden');
}

function closePixModal(){
  document.getElementById('pixModal').classList.add('hidden');
  proState.pendingId = null;
}

function startTaskChallenge(){
  var id = proState.pendingId;
  var skin = getProSkin(id);
  if(!skin) return;

  // Mark task as active BEFORE closing modal
  proState.taskActive = true;
  proState.taskSkinId = id;

  closePixModal();

  // Equip the skin temporarily (visual only — not saved as permanent)
  var astroEl = document.getElementById('astronaut');
  if(astroEl) astroEl.innerHTML = buildAstronautSVG(skin);
  var melEl = document.getElementById('menuAstronaut');
  if(melEl){ melEl.innerHTML = buildAstronautSVG(skin,1.33); melEl.style.filter='drop-shadow(0 0 12px '+skin.glow+')'; }

  // Close skin collection and start game in the required difficulty
  closeSkinCollection();
  setTimeout(function(){
    startGame(skin.taskDifficulty);
    proState.taskStartWave = 1; // will be overridden at game start but we record from wave 1
  }, 120);
}

// Check task completion each wave
function proCheckTaskCompletion(wave){
  if(!proState.taskActive || !proState.taskSkinId) return;
  var skin = getProSkin(proState.taskSkinId);
  if(!skin) return;
  // wave reached needed?
  if(wave >= skin.taskGoalWaves){
    proState.taskActive = false;
    var taskId = proState.taskSkinId;
    proState.taskSkinId = null;
    // Grant permanently
    if(proState.unlocked.indexOf(taskId) < 0) proState.unlocked.push(taskId);
    proState.active = taskId;
    saveProState();
    // Celebration
    var s = getProSkin(taskId);
    if(s){
      document.getElementById('skinUnlockName').textContent = s.icon+' '+s.name;
      document.getElementById('skinUnlockDesc').textContent = 'Tarefa concluída! Skin PRO desbloqueada para sempre!';
      document.getElementById('skinUnlockStars').textContent = '👑 PRO DESBLOQUEADA!';
      document.getElementById('skinUnlockPreview').innerHTML = buildAstronautSVG(s,1.1);
      document.getElementById('skinUnlockPreview').style.boxShadow = '0 0 40px '+s.glow;
      if(typeof spawnParticles==='function') spawnParticles();
      document.getElementById('skinUnlockModal').classList.remove('hidden');
      if(state.running && !state.paused) pauseGame();
    }
    proRenderGrid();
  }
}

// If player game-overs or quits while task is active, revoke temp skin
function proOnGameEnd(){
  if(proState.taskActive){
    proState.taskActive = false;
    proState.taskSkinId = null;
    // Restore previously active skin (or default)
    var restoreId = proState.active || skinState.active || 'classic';
    var proSkin = getProSkin(restoreId);
    if(proSkin){
      proActivate(restoreId);
    } else {
      applySkin(restoreId);
    }
  }
}

// ── PRO ABILITY HOOKS ─────────────────────────────────
function proCheckLifeOnWave(wave){
  if(getEffectiveSkinId()!=='pro_vida') return;
  if(wave>0 && wave%5===0 && wave!==proState.lifeLastWave){
    proState.lifeLastWave=wave;
    if(state.lives<10){ state.lives++; updateHUD(); }
    if(typeof showFloatingText==='function') showFloatingText('❤️ +1 VIDA!','#ff4466',50,35);
    updateAbilityHud(true);
  }
}

function proOnWaveStart(){
  if(getEffectiveSkinId()==='pro_delay'){
    state.ufos.forEach(function(u){ u._proSpeed=u.speed; u.speed*=0.3; });
    setTimeout(function(){
      state.ufos.forEach(function(u){ if(u._proSpeed!==undefined){ u.speed=u._proSpeed; delete u._proSpeed; } });
    }, 8000);
    if(typeof showFloatingText==='function') showFloatingText('⏱️ DELAY!','#00cfff',40,30);
    updateAbilityHud(true);
  }
  if(getEffectiveSkinId()==='pro_speed'){
    updateAbilityHud(true);
  }
}

// Patch renderSkinCollection to also render PRO grid
var _origRenderSkinCollection = renderSkinCollection;
renderSkinCollection = function(){
  _origRenderSkinCollection();
  proRenderGrid();
};

// Patch advanceWave to trigger PRO + task hooks
var _origAdvanceWave = advanceWave;
advanceWave = function(){
  _origAdvanceWave();
  proCheckLifeOnWave(state.wave);
  proCheckTaskCompletion(state.wave);
  setTimeout(function(){ if(state.running && !state.paused) proOnWaveStart(); }, 300);
};

// Patch tickWave — uses getEffectiveSkinId so slotted ability also shortens waves
var _origTickWave = tickWave;
tickWave = function(){
  if(!state.running||state.paused) return;
  state.waveTime += 0.033;
  var wMax = (getEffectiveSkinId()==='pro_speed') ? state.waveMax*0.7 : state.waveMax;
  document.getElementById('waveBar').style.width=Math.min(state.waveTime/wMax*100,100)+'%';
  document.getElementById('waveTimeDisplay').textContent=Math.max(0,Math.ceil(wMax-state.waveTime))+'s';
  if(state.waveTime>=wMax) advanceWave();
};

// Patch gameOver to revoke task skin + handle campaign + MV
var _origGameOver = gameOver;
gameOver = function(){
  // Multiverso cleanup
  if(typeof mvState!=='undefined' && mvState.inProgress){
    mvCleanupOnExit();
  }
  proOnGameEnd();
  // Campaign cleanup
  if(state._campPhaseId){
    document.getElementById('campHudBar').classList.remove('show');
    state._campPhaseId=null;
    state._campWavesDone=0;
  }
  _origGameOver();
};

// Patch goToMainMenu to revoke task skin + campaign + MV cleanup
var _origGoToMainMenu = goToMainMenu;
goToMainMenu = function(){
  // Multiverso cleanup
  if(typeof mvState!=='undefined' && mvState.inProgress){
    mvCleanupOnExit();
  }
  proOnGameEnd();
  // Campaign cleanup
  if(state._campPhaseId){
    document.getElementById('campHudBar').classList.remove('show');
    state._campPhaseId=null;
    state._campWavesDone=0;
  }
  _origGoToMainMenu();
};

// ─────────────────────────────────────────────────────────────────────────────


