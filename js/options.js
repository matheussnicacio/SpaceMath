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

// ===================== ABILITY SLOT (per free skin) =====================
// Maps free skinId → pro ability id equipped on it
var abilitySlots = {};

(function loadAbilitySlots(){
  try {
    var s = localStorage.getItem('spacemath_abilityslots_v1');
    if(s) abilitySlots = JSON.parse(s)||{};
  } catch(e){}
})();

function saveAbilitySlots(){
  try { localStorage.setItem('spacemath_abilityslots_v1', JSON.stringify(abilitySlots)); } catch(e){}
}

// Which ability is in effect right now during gameplay
function getEffectiveSkinId(){
  if(proState.taskActive && proState.taskSkinId) return proState.taskSkinId;
  if(proState.active) return proState.active;
  // free skin with a slotted ability
  if(skinState.active && abilitySlots[skinState.active]) return abilitySlots[skinState.active];
  return null;
}

// ── ABILITY HUD INDICATOR ─────────────────────────────
function updateAbilityHud(triggered){
  var el = document.getElementById('abilityHud');
  if(!el) return;
  var eid = getEffectiveSkinId();
  if(!eid || !state.running){
    el.classList.remove('show');
    return;
  }
  var skin = getProSkin(eid);
  if(!skin){ el.classList.remove('show'); return; }

  document.getElementById('abilityHudIcon').textContent  = skin.icon;
  document.getElementById('abilityHudName').textContent  = skin.name.toUpperCase();
  document.getElementById('abilityHudShort').textContent = skin.abilityShort;

  // color class
  el.className = 'show';
  if(eid==='pro_vida')  el.classList.add('ability-vida');
  if(eid==='pro_delay') el.classList.add('ability-delay');
  if(eid==='pro_speed') el.classList.add('ability-speed');

  // flash when triggered
  if(triggered){
    el.classList.remove('triggered');
    void el.offsetWidth; // reflow to restart animation
    el.classList.add('triggered');
  }
}

var _openDropdown = null; // currently open dropdown element

function closeAbilityDropdown(){
  if(_openDropdown){ _openDropdown.remove(); _openDropdown = null; }
}

function openAbilityDropdown(skinId, btnEl){
  // close any existing first
  closeAbilityDropdown();

  var drop = document.createElement('div');
  drop.className = 'ability-dropdown';
  _openDropdown = drop;

  var title = document.createElement('div');
  title.className = 'ability-dropdown-title';
  title.textContent = '⚡ HABILIDADE PRO';
  drop.appendChild(title);

  var currentAbility = abilitySlots[skinId] || null;

  PRO_SKINS.forEach(function(pro){
    var unlocked = proState.unlocked.indexOf(pro.id) >= 0;
    if(unlocked){
      var opt = document.createElement('div');
      var isSelected = currentAbility === pro.id;
      opt.className = 'ability-option' + (isSelected ? ' selected' : '');
      opt.innerHTML =
        '<div class="ability-option-icon">' + pro.icon + '</div>' +
        '<div class="ability-option-info">' +
          '<div class="ability-option-name">' + pro.name + '</div>' +
          '<div class="ability-option-desc">' + pro.abilityShort + '</div>' +
        '</div>' +
        (isSelected ? '<div class="ability-option-check">✔</div>' : '');
      opt.addEventListener('click', function(e){
        e.stopPropagation();
        if(isSelected){
          delete abilitySlots[skinId];
        } else {
          abilitySlots[skinId] = pro.id;
        }
        saveAbilitySlots();
        closeAbilityDropdown();
        renderSkinCollection();
      });
      drop.appendChild(opt);
    } else {
      // locked — show greyed out with task requirement
      var opt = document.createElement('div');
      opt.className = 'ability-option-locked';
      opt.innerHTML =
        '<div class="ability-option-locked-icon">' + pro.icon + '</div>' +
        '<div class="ability-option-locked-info">' +
          '<div class="ability-option-locked-name">' + pro.name + '</div>' +
          '<div class="ability-option-locked-req">🔒 ' + pro.taskShort + '</div>' +
        '</div>';
      drop.appendChild(opt);
    }
  });

  // Remove button (only if something is equipped)
  if(currentAbility){
    var removeRow = document.createElement('div');
    removeRow.className = 'ability-remove-row';
    var removeBtn = document.createElement('button');
    removeBtn.className = 'ability-remove-btn';
    removeBtn.innerHTML = '<span>✕ Remover habilidade</span>';
    removeBtn.addEventListener('click', function(e){
      e.stopPropagation();
      delete abilitySlots[skinId];
      saveAbilitySlots();
      closeAbilityDropdown();
      renderSkinCollection();
    });
    removeRow.appendChild(removeBtn);
    drop.appendChild(removeRow);
  }

  // Position dropdown above or below the button
  document.body.appendChild(drop);
  var rect = btnEl.getBoundingClientRect();
  var dropH = drop.offsetHeight;
  var spaceBelow = window.innerHeight - rect.bottom;
  var top = spaceBelow > dropH + 8 ? rect.bottom + 4 : rect.top - dropH - 4;
  var left = Math.min(rect.left, window.innerWidth - drop.offsetWidth - 8);
  drop.style.top  = top  + 'px';
  drop.style.left = left + 'px';

  // Close on outside click
  setTimeout(function(){
    document.addEventListener('click', closeAbilityDropdown, { once: true });
  }, 0);
}

