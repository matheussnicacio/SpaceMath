// ===================== SKINS =====================
const SKINS = [
  { id:'classic', name:'Clássico', wave:0, desc:'O traje padrão do Capitão Alex Lunar. Confiável, testado, aprovado em batalha.', stars:'⭐', rarity:'Inicial', suit:'#e8eef4', visor:'#0d2a4e', accent:'#c0c8d0', chest:'#b8d4e8', glow:'rgba(200,220,240,0.3)' },
  { id:'futurista', name:'Futurista', wave:5, desc:'Traje de última geração com painéis holográficos e sistema de propulsão avançado.', stars:'⭐⭐', rarity:'Raro', suit:'#1a3a5c', visor:'#00e5ff', accent:'#00b4d8', chest:'#0077b6', glow:'rgba(0,229,255,0.4)' },
  { id:'alien', name:'Alien', wave:10, desc:'Traje feito com tecnologia alienígena capturada. Estranho, mas incrivelmente eficiente.', stars:'⭐⭐', rarity:'Raro', suit:'#1a3a2a', visor:'#39ff14', accent:'#27ae60', chest:'#145a32', glow:'rgba(57,255,20,0.4)' },
  { id:'robo', name:'Robótico', wave:15, desc:'Exoesqueleto mecânico com armadura de titânio. Nenhum invasor pode te deter.', stars:'⭐⭐⭐', rarity:'Épico', suit:'#2c2c2c', visor:'#ff8c00', accent:'#888', chest:'#555', glow:'rgba(255,140,0,0.4)' },
  { id:'aurora', name:'Aurora', wave:20, desc:'Traje inspirado nas auroras boreais lunares. Brilha nas cores do cosmos.', stars:'⭐⭐⭐', rarity:'Épico', suit:'#2a1a4a', visor:'#a855f7', accent:'#9b59b6', chest:'#6c3483', glow:'rgba(168,85,247,0.5)' },
  { id:'solar', name:'Solar', wave:25, desc:'Forjado no calor de uma estrela. Imune à radiação, irresistível no combate.', stars:'⭐⭐⭐', rarity:'Épico', suit:'#4a2800', visor:'#ffd700', accent:'#ff8c00', chest:'#c0392b', glow:'rgba(255,215,0,0.5)' },
  { id:'abissal', name:'Abissal', wave:30, desc:'Das profundezas do espaço escuro. Invisível para os scanners alienígenas.', stars:'⭐⭐⭐⭐', rarity:'Lendário', suit:'#050820', visor:'#00f5ff', accent:'#1a2a4a', chest:'#0a1020', glow:'rgba(0,245,255,0.6)' },
  { id:'nebula', name:'Nebulosa', wave:35, desc:'Criado com matéria de nebulosas. Cada movimento deixa rastros de luz estelar.', stars:'⭐⭐⭐⭐', rarity:'Lendário', suit:'#2a0a2a', visor:'#ff6ec7', accent:'#c77dff', chest:'#7b2fbe', glow:'rgba(199,125,255,0.6)' },
  { id:'veterano', name:'Veterano', wave:40, desc:'Marcas de batalha em cada placa. Este traje conta histórias de guerra estelar.', stars:'⭐⭐⭐⭐', rarity:'Lendário', suit:'#3a2a1a', visor:'#ff2244', accent:'#8B4513', chest:'#5c3317', glow:'rgba(255,34,68,0.5)' },
  { id:'lendario', name:'Lendário', wave:45, desc:'O traje dos guardiões imortais da Lua. Apenas os mais bravos o conquistam.', stars:'⭐⭐⭐⭐⭐', rarity:'MÍTICO', suit:'#1a1a1a', visor:'#ffd700', accent:'#ffd700', chest:'#b8860b', glow:'rgba(255,215,0,0.8)' },
];

let skinState = { unlocked: ['classic'], active: 'classic', pendingUnlock: null, collectionFrom: null };

(function loadSkins(){
  try {
    const SKIN_VERSION = '1.0';
    if(localStorage.getItem('spacemath_skins_version') !== SKIN_VERSION){
      localStorage.removeItem('spacemath_skins');
      localStorage.setItem('spacemath_skins_version', SKIN_VERSION);
    }
    const saved = localStorage.getItem('spacemath_skins');
    if(saved){ const d=JSON.parse(saved); skinState.unlocked=d.unlocked||['classic']; skinState.active=d.active||'classic'; }
  } catch(e){}
  applySkin(skinState.active);
  updateSkinBadge();
})();

function saveSkins(){
  try { localStorage.setItem('spacemath_skins',JSON.stringify({unlocked:skinState.unlocked,active:skinState.active})); } catch(e){}
}
function getSkin(id){ return SKINS.find(s=>s.id===id)||SKINS[0]; }

function buildAstronautSVG(skin, scale=1){
  const w=54*scale, h=72*scale;
  return `<svg width="${w}" height="${h}" viewBox="0 0 72 96" style="image-rendering:pixelated">
    <rect x="16" y="0" width="40" height="4" fill="${skin.accent}"/>
    <rect x="8" y="4" width="56" height="4" fill="${skin.accent}"/>
    <rect x="4" y="8" width="64" height="32" fill="${skin.suit}"/>
    <rect x="8" y="40" width="56" height="4" fill="${skin.accent}"/>
    <rect x="16" y="44" width="40" height="4" fill="${skin.accent}"/>
    <rect x="12" y="10" width="48" height="28" fill="${skin.visor}"/>
    <rect x="14" y="12" width="44" height="24" fill="${skin.visor}"/>
    <rect x="16" y="12" width="12" height="8" fill="rgba(255,255,255,0.25)"/>
    <rect x="16" y="12" width="6" height="4" fill="rgba(255,255,255,0.35)"/>
    <rect x="4" y="16" width="4" height="4" fill="${skin.accent}"/>
    <rect x="64" y="16" width="4" height="4" fill="${skin.accent}"/>
    <rect x="20" y="46" width="32" height="6" fill="${skin.accent}"/>
    <rect x="8" y="52" width="56" height="40" fill="${skin.suit}"/>
    <rect x="24" y="58" width="24" height="16" fill="${skin.chest}"/>
    <rect x="26" y="60" width="10" height="6" fill="${skin.visor}"/>
    <rect x="38" y="60" width="8" height="6" fill="${skin.visor}"/>
    <rect x="26" y="68" width="20" height="4" fill="${skin.chest}"/>
    <rect x="8" y="52" width="8" height="40" fill="rgba(0,0,0,0.08)"/>
    <rect x="56" y="52" width="8" height="40" fill="rgba(0,0,0,0.08)"/>
    <rect x="0" y="52" width="10" height="36" fill="${skin.suit}"/>
    <rect x="0" y="86" width="12" height="8" fill="${skin.accent}"/>
    <rect x="62" y="52" width="10" height="36" fill="${skin.suit}"/>
    <rect x="60" y="86" width="12" height="8" fill="${skin.accent}"/>
    <rect x="12" y="90" width="22" height="6" fill="${skin.accent}"/>
    <rect x="38" y="90" width="22" height="6" fill="${skin.accent}"/>
    <rect x="8" y="88" width="26" height="8" fill="${skin.accent}"/>
    <rect x="38" y="88" width="26" height="8" fill="${skin.accent}"/>
    <rect x="62" y="54" width="10" height="24" fill="${skin.accent}"/>
    <rect x="64" y="56" width="6" height="20" fill="${skin.visor}"/>
  </svg>`;
}

function applySkin(skinId){
  const skin = getSkin(skinId);
  const astroEl = document.getElementById('astronaut');
  if(astroEl) astroEl.innerHTML = buildAstronautSVG(skin);
  const menuAstro = document.getElementById('menuAstronaut');
  if(menuAstro){
    menuAstro.innerHTML = buildAstronautSVG(skin, 1.33);
    menuAstro.style.filter = `drop-shadow(0 0 12px ${skin.glow})`;
  }
  skinState.active = skinId;
  // Deactivate any PRO skin so only one is active at a time
  if(typeof proState !== 'undefined' && proState.active !== null){
    proState.active = null;
    if(typeof saveProState === 'function') saveProState();
    if(typeof proRenderGrid === 'function') proRenderGrid();
  }
  saveSkins();
  updateSkinBadge();
}

function updateSkinBadge(){
  const badge = document.getElementById('skinCountBadge');
  if(badge) badge.textContent = skinState.unlocked.length;
}

function checkSkinUnlock(wave){
  if(wave % 5 !== 0) return;
  if(wave === state.lastSkinUnlockWave) return;
  const skin = SKINS.find(s=>s.wave===wave);
  if(!skin) return;
  if(skinState.unlocked.includes(skin.id)) return;
  state.lastSkinUnlockWave = wave;
  skinState.unlocked.push(skin.id);
  saveSkins();
  setTimeout(()=>showSkinUnlockModal(skin), 800);
}

function showSkinUnlockModal(skin){
  if(state.running && !state.paused) pauseGame();
  skinState.pendingUnlock = skin.id;
  document.getElementById('skinUnlockName').textContent = skin.name.toUpperCase();
  document.getElementById('skinUnlockDesc').textContent = skin.desc;
  document.getElementById('skinUnlockStars').textContent = skin.stars + ' ' + skin.rarity;
  document.getElementById('skinUnlockPreview').innerHTML = buildAstronautSVG(skin, 1.1);
  document.getElementById('skinUnlockPreview').style.boxShadow = `0 0 30px ${skin.glow}`;
  spawnParticles();
  document.getElementById('skinUnlockModal').classList.remove('hidden');
}

function spawnParticles(){
  const burst = document.getElementById('particleBurst');
  burst.innerHTML = '';
  const colors = ['#00e5ff','#ffd700','#a855f7','#39ff14','#ff8c00'];
  for(let i=0;i<20;i++){
    const p=document.createElement('div');
    p.className='particle';
    const angle=Math.random()*Math.PI*2;
    const dist=60+Math.random()*80;
    p.style.setProperty('--tx', Math.cos(angle)*dist+'px');
    p.style.setProperty('--ty', Math.sin(angle)*dist-60+'px');
    p.style.setProperty('--d', (0.8+Math.random()*1.2)+'s');
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.left='50%'; p.style.top='50%';
    p.style.animationDelay=Math.random()*0.3+'s';
    burst.appendChild(p);
  }
}

function equipNewSkin(){
  if(skinState.pendingUnlock){ applySkin(skinState.pendingUnlock); skinState.pendingUnlock=null; }
  closeUnlockModal();
}
function closeUnlockModal(){
  document.getElementById('skinUnlockModal').classList.add('hidden');
  skinState.pendingUnlock=null;
  if(state.running && state.paused) resumeGame();
}

function openSkinCollection(from){
  skinState.collectionFrom=from;
  if(from==='game' && state.running && !state.paused) pauseGame();
  renderSkinCollection();
  document.getElementById('skinCollectionScreen').classList.remove('hidden');
}
function closeSkinCollection(){
  document.getElementById('skinCollectionScreen').classList.add('hidden');
  if(skinState.collectionFrom==='game' && state.running && state.paused) resumeGame();
  skinState.collectionFrom=null;
}

function renderSkinCollection(){
  const grid=document.getElementById('skinGrid');
  grid.innerHTML='';
  const count=skinState.unlocked.length;
  document.getElementById('skinCollCount').textContent=count+' / '+SKINS.length+' skins desbloqueadas';
  document.getElementById('skinCollProgress').style.width=(count/SKINS.length*100)+'%';
  SKINS.forEach(skin=>{
    const unlocked=skinState.unlocked.includes(skin.id);
    const active=skinState.active===skin.id && (typeof proState==='undefined' || !proState.active);
    const slottedAbilityId = abilitySlots[skin.id] || null;
    const slottedPro = slottedAbilityId ? getProSkin(slottedAbilityId) : null;
    const card=document.createElement('div');
    card.className='skin-card'+(unlocked?' unlocked':'  locked')+(active?' active':'');
    let inner=`<div class="skin-card-preview">${buildAstronautSVG(skin, 0.75)}</div>`;
    inner+=`<div class="skin-card-name">${skin.name}</div>`;
    inner+=`<div class="skin-card-req">${unlocked?(skin.wave===0?'Inicial':'Onda '+skin.wave):'🔒 Onda '+skin.wave}</div>`;
    if(active) inner+=`<div class="active-badge">ATIVO</div>`;
    if(!unlocked) inner+=`<div class="lock-icon">🔒</div>`;
    // Ability slot button — only on unlocked skins, and only when no PRO skin is fully active
    if(unlocked && (typeof proState==='undefined' || !proState.active)){
      const hasCls = slottedPro ? ' has-ability' : '';
      inner+=`<button class="ability-btn${hasCls}" title="Equipar habilidade PRO">···</button>`;
      if(slottedPro){
        inner+=`<div class="ability-dot">${slottedPro.icon}</div>`;
      }
    }
    card.innerHTML=inner;
    if(unlocked && !active){
      card.addEventListener('click',()=>{ applySkin(skin.id); renderSkinCollection(); });
    }
    // Ability button click — stop propagation so card click doesn't fire
    if(unlocked){
      const abilBtn = card.querySelector('.ability-btn');
      if(abilBtn){
        abilBtn.addEventListener('click', e=>{
          e.stopPropagation();
          openAbilityDropdown(skin.id, abilBtn);
        });
      }
    }
    grid.appendChild(card);
  });
}

// ===================== OPÇÕES =====================
function openOptions(){
  opOptionsDraft = {...opOptions};
  syncOpToggles();
  updateOpsWarning();
  updateOpsActiveLabel();
  document.getElementById('optionsOverlay').classList.add('show');
}
function closeOptions(){
  opOptionsDraft = {...opOptions};
  syncOpToggles();
  document.getElementById('optionsOverlay').classList.remove('show');
}
function saveOptions(){
  const anyActive = Object.values(opOptionsDraft).some(v=>v);
  if(!anyActive){
    document.getElementById('opsWarning').textContent = '⚠ Selecione ao menos uma operação!';
    return;
  }
  opOptions = {...opOptionsDraft};
  try { localStorage.setItem('spacemath_ops', JSON.stringify(opOptions)); } catch(e){}
  updateOpsActiveLabel();
  document.getElementById('optionsOverlay').classList.remove('show');
}
function toggleOp(key){
  opOptionsDraft[key] = !opOptionsDraft[key];
  const el = document.getElementById('opToggle_'+key);
  if(el) el.classList.toggle('selected', opOptionsDraft[key]);
  updateOpsWarning();
  updateOpsDraftLabel();
}
function syncOpToggles(){
  Object.keys(opOptionsDraft).forEach(key=>{
    const el = document.getElementById('opToggle_'+key);
    if(el) el.classList.toggle('selected', opOptionsDraft[key]);
  });
  updateOpsDraftLabel();
}
function updateOpsWarning(){
  const warn = document.getElementById('opsWarning');
  if(!warn) return;
  const anyActive = Object.values(opOptionsDraft).some(v=>v);
  warn.textContent = anyActive ? '' : '⚠ Selecione ao menos uma operação!';
}
function updateOpsDraftLabel(){
  const activeLabel = Object.keys(opOptionsDraft).filter(k=>opOptionsDraft[k]).map(k=>SPECIAL_OPS_LABELS[k]||OPS_MAP[k]).join('  ');
  const el = document.getElementById('opsActiveLabel');
  if(el) el.textContent = activeLabel || '(nenhuma)';
}
function updateOpsActiveLabel(){
  const activeLabel = Object.keys(opOptions).filter(k=>opOptions[k]).map(k=>SPECIAL_OPS_LABELS[k]||OPS_MAP[k]).join('  ');
  const el = document.getElementById('opsActiveLabel');
  if(el) el.textContent = activeLabel || '(nenhuma)';
}

document.addEventListener('DOMContentLoaded',()=>{ updateSkinBadge(); window.addEventListener('resize', ()=>{ _gameAreaCache=null; refreshAreaDims(); }); });
updateSkinBadge();

