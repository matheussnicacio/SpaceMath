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


// ===== INICIALIZAÇÃO — carrega opções salvas =====
(function loadOpOptions(){
  try {
    const saved = localStorage.getItem('spacemath_ops');
    if(saved){ opOptions = JSON.parse(saved); opOptionsDraft = {...opOptions}; }
  } catch(e){}
  syncOpToggles();
  updateOpsActiveLabel();
})();
