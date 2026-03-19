// ===================== MULTIVERSO DE ALEX LUNAR =====================

const MULTIVERSO_PHASES = [
  {
    id:'mv_percent', name:'DIMENSÃO %', emoji:'💯', color:'#f59e0b', glowColor:'rgba(245,158,11,0.3)',
    topic:'pct', topicLabel:'Porcentagem',
    speedMult:0.55, spawnMult:1.2, lives:4,
    lore:'A Dimensão Percentual — onde tudo é medido em partes de cem.',
    introStory:[
      {icon:'💯',title:'A DIMENSÃO\nPERCENTUAL',slideNum:'DIM 1 · 1/3',text:'Alex Lunar acordou num universo paralelo onde <strong>tudo é medido em partes de cem</strong>. As naves inimigas usam escudos percentuais.\n\nPara destruí-las: calcule a porcentagem com precisão.\n\nDica: <strong>10% = ÷10 · 50% = ÷2 · 25% = ÷4</strong>'},
      {icon:'📊',title:'COMO\nCALCULAR %',slideNum:'DIM 1 · 2/3',text:'Para calcular X% de Y:\n<strong>1.</strong> Divida Y por 100\n<strong>2.</strong> Multiplique por X\n\nEx: <em>20% de 50</em>\n→ 50÷100 = 0,5 → 0,5×20 = <strong>10</strong>'},
      {icon:'🛸',title:'NAVES LENTAS\nCÁLCULOS CERTOS',slideNum:'DIM 1 · 3/3',text:'As naves desta dimensão descem <strong>mais devagar</strong> — porcentagem precisa de reflexão.\n\nNão se apresse. Pense, calcule, dispare!\n\n<span style="color:#f59e0b;">3 ondas para conquistar esta dimensão.</span>'}
    ],
    outroStory:[
      {icon:'🎉',title:'DIMENSÃO %\nCONQUISTADA!',slideNum:'FIM DIM 1 · 1/2',text:'As naves percentuais explodiram. Os colonos dançaram nas ruas.\n\n<strong>"Você dominou a arte das partes!"</strong>\n\nPróxima: a Dimensão da Probabilidade.'},
      {icon:'🎲',title:'PRÓXIMA:\nDIMENSÃO P',slideNum:'FIM DIM 1 · 2/2',text:'Um portal giratório se abriu. Dados rolando e moedas girando no ar.\n\nA <strong>Dimensão da Probabilidade</strong> aguarda.\n\n<span style="color:#c084fc;">Alex saltou sem hesitar.</span>'}
    ]
  },
  {
    id:'mv_prob', name:'DIMENSÃO P', emoji:'🎲', color:'#06b6d4', glowColor:'rgba(6,182,212,0.3)',
    topic:'prob', topicLabel:'Probabilidade',
    speedMult:0.5, spawnMult:1.3, lives:4,
    lore:'A Dimensão dos Eventos — onde chance e certeza se encontram.',
    introStory:[
      {icon:'🎲',title:'A DIMENSÃO DA\nPROBABILIDADE',slideNum:'DIM 2 · 1/3',text:'As naves alienígenas exibem <strong>frações de probabilidade</strong>. Você precisa identificar o numerador — os casos favoráveis.\n\nFórmula: <strong>P = favoráveis / total</strong>'},
      {icon:'🪙',title:'LENDO A\nFRAÇÃO',slideNum:'DIM 2 · 2/3',text:'A nave mostra: <em>"P = 2/6. Favoráveis?"</em>\n→ A resposta é <strong>2</strong> — o numerador!\n\nSimples, mas exige atenção.'},
      {icon:'🛸',title:'DEVAGAR\nE CERTO',slideNum:'DIM 2 · 3/3',text:'As naves descem ainda <strong>mais devagar</strong>. Você tem tempo para ler.\n\nIdentifique o numerador da probabilidade exibida.\n\n<span style="color:#06b6d4;">Leia, calcule, dispare!</span>'}
    ],
    outroStory:[
      {icon:'✨',title:'DIMENSÃO P\nCONQUISTADA!',slideNum:'FIM DIM 2 · 1/2',text:'A chance das naves de vencer era zero — e você calculou isso.\n\n<strong>Sua mente é uma calculadora viva!</strong>'},
      {icon:'σ',title:'PRÓXIMA:\nDIMENSÃO σ',slideNum:'FIM DIM 2 · 2/2',text:'O próximo portal mostrava gráficos e médias.\n\nA <strong>Dimensão da Estatística</strong> aguarda.\n\n<span style="color:#c084fc;">Alex ajustou os cálculos.</span>'}
    ]
  },
  {
    id:'mv_stat', name:'DIMENSÃO σ', emoji:'📊', color:'#10b981', glowColor:'rgba(16,185,129,0.3)',
    topic:'stat', topicLabel:'Estatística',
    speedMult:0.5, spawnMult:1.2, lives:4,
    lore:'A Dimensão dos Dados — onde médias revelam padrões ocultos.',
    introStory:[
      {icon:'📊',title:'A DIMENSÃO\nESTATÍSTICA',slideNum:'DIM 3 · 1/3',text:'Os escudos mostram <strong>três números</strong> e exigem a <em>média aritmética</em>.\n\nFórmula: <strong>soma ÷ quantidade</strong>\n\nEx: 4, 8, 12 → soma=24 → 24÷3 = <strong>8</strong>'},
      {icon:'🧮',title:'PASSO A\nPASSO',slideNum:'DIM 3 · 2/3',text:'<strong>1.</strong> Some os três números\n<strong>2.</strong> Divida por 3\n\nEx: <em>Média 5, 9, 7</em>\n→ 5+9+7=21 → 21÷3 = <strong>7</strong>'},
      {icon:'🛸',title:'CALMA E\nPRECISÃO',slideNum:'DIM 3 · 3/3',text:'Velocidade baixa para você calcular mentalmente.\n\nNão adivinhe — siga os passos.\n\n<span style="color:#10b981;">Some → Divida → Responda!</span>'}
    ],
    outroStory:[
      {icon:'🏆',title:'DIMENSÃO σ\nCONQUISTADA!',slideNum:'FIM DIM 3 · 1/2',text:'"Sua precisão estatística é fenomenal!" disse o Conselho.\n\n<strong>O universo dos dados está salvo!</strong>'},
      {icon:'√',title:'PRÓXIMA:\nDIMENSÃO √',slideNum:'FIM DIM 3 · 2/2',text:'Um portal emitia luz em quadrados perfeitos.\n\nA <strong>Dimensão das Raízes</strong> aguarda.\n\n<span style="color:#c084fc;">Alex entrou pela raiz.</span>'}
    ]
  },
  {
    id:'mv_sqrt', name:'DIMENSÃO √', emoji:'🔲', color:'#f43f5e', glowColor:'rgba(244,63,94,0.3)',
    topic:'sqrt', topicLabel:'Raiz Quadrada',
    speedMult:0.5, spawnMult:1.1, lives:4,
    lore:'A Dimensão dos Quadrados Perfeitos — cada resposta é uma raiz.',
    introStory:[
      {icon:'🔲',title:'A DIMENSÃO\nDAS RAÍZES',slideNum:'DIM 4 · 1/3',text:'Os escudos são <strong>quadrados perfeitos</strong>. Para destruí-los, calcule a raiz quadrada.\n\n√N = número que, multiplicado por si mesmo, dá N.\n\n√9 = 3 porque <strong>3×3 = 9</strong>'},
      {icon:'📐',title:'RAÍZES\nIMPORTANTES',slideNum:'DIM 4 · 2/3',text:'Decore:\n√1=1 · √4=2 · √9=3 · √16=4\n√25=5 · √36=6 · √49=7 · √64=8\n√81=9 · √100=10 · √121=11 · √144=12\n\n<em>São os quadrados de 1 a 12!</em>'},
      {icon:'🛸',title:'NAVES\nQUADRADAS',slideNum:'DIM 4 · 3/3',text:'As naves têm forma quadrada e descem devagar.\n\nUse sua tabela mentalmente.\n\n<span style="color:#f43f5e;">Raciocine, lembre, destrua!</span>'}
    ],
    outroStory:[
      {icon:'⭐',title:'DIMENSÃO √\nCONQUISTADA!',slideNum:'FIM DIM 4 · 1/2',text:'Escudos de raízes 1 a 12 — e você conhecia todos!\n\n<strong>"Você dominou os quadrados perfeitos!"</strong>'},
      {icon:'📏',title:'ÚLTIMA:\nDIMENSÃO 📏',slideNum:'FIM DIM 4 · 2/2',text:'O último portal: sons de medições — metros, kilogramas...\n\nA <strong>Dimensão das Grandezas</strong> — a batalha final.\n\n<span style="color:#c084fc;">Alex respirou fundo e entrou.</span>'}
    ]
  },
  {
    id:'mv_med', name:'DIMENSÃO 📏', emoji:'📏', color:'#8b5cf6', glowColor:'rgba(139,92,246,0.35)',
    topic:'med', topicLabel:'Grandezas e Medidas',
    speedMult:0.55, spawnMult:1.0, lives:4,
    lore:'A Dimensão das Grandezas Físicas — conversões são a chave.',
    introStory:[
      {icon:'📏',title:'A DIMENSÃO\nDAS GRANDEZAS',slideNum:'DIM 5 · 1/3',text:'As naves usam <strong>unidades de medida</strong> como escudos. Converta corretamente:\n\n<em>1 km = 1.000 m · 1 m = 100 cm\n1 kg = 1.000 g · 1 min = 60 s</em>'},
      {icon:'⚖️',title:'CONVERSÕES\nRÁPIDAS',slideNum:'DIM 5 · 2/3',text:'<strong>km→m:</strong> ×1.000\n<strong>m→cm:</strong> ×100\n<strong>kg→g:</strong> ×1.000\n<strong>min→s:</strong> ×60\n\n<em>Sempre multiplique nestas questões!</em>'},
      {icon:'🛸',title:'BATALHA\nFINAL DO MULTIVERSO',slideNum:'DIM 5 · 3/3',text:'Esta é a última dimensão. As naves descem com calma.\n\nLembre as fórmulas e você vencerá.\n\n<span style="color:#8b5cf6;">Converta. Defenda. Seja lendário!</span>'}
    ],
    outroStory:[
      {icon:'🎖️',title:'MULTIVERSO\nCOMPLETO!',slideNum:'FIM MULTIVERSO · 1/2',text:'<strong>Todas as 5 dimensões conquistadas.</strong>\n\nAlex Lunar olhou para os 5 portais fechados — cada um marcado com suas vitórias.\n\n<span style="color:#8b5cf6;">O Multiverso está em paz.</span>'},
      {icon:'🌌',title:'DEFENSOR\nDO MULTIVERSO',slideNum:'FIM MULTIVERSO · 2/2',text:'Um título nunca antes concedido:\n\n<strong>"Defensor do Multiverso Matemático"</strong>\n\n<em>A matemática avançada se provou, mais uma vez, a arma mais poderosa de todos os universos.</em>'}
    ]
  }
];

// ===== MULTIVERSO SKINS =====
const MV_SKINS = [
  { id:'mv_percent', name:'Agente %',      icon:'💯', dim:'Dimensão %',
    desc:'Traje dourado do Agente Percentual. Cada fibra foi calibrada em partes de cem.',
    suit:'#b8860b', visor:'#ffd700', accent:'#8b6914', chest:'#9a7010', glow:'rgba(255,215,0,0.7)' },
  { id:'mv_prob',    name:'Apostador P',   icon:'🎲', dim:'Dimensão P',
    desc:'Traje ciano da sorte. Usado por quem domina a arte da probabilidade.',
    suit:'#0e7490', visor:'#22d3ee', accent:'#0c5f75', chest:'#0a4d60', glow:'rgba(6,182,212,0.7)' },
  { id:'mv_stat',    name:'Analista σ',    icon:'📊', dim:'Dimensão σ',
    desc:'Traje verde esmeralda dos dados. A média de todas as batalhas moldou este armamento.',
    suit:'#065f46', visor:'#34d399', accent:'#044433', chest:'#053d2d', glow:'rgba(16,185,129,0.7)' },
  { id:'mv_sqrt',    name:'Guardião √',    icon:'🔲', dim:'Dimensão √',
    desc:'Traje carmesim dos quadrados perfeitos. Forjado na raiz de cada vitória.',
    suit:'#9f1239', visor:'#fb7185', accent:'#7f0f2d', chest:'#6a0a24', glow:'rgba(244,63,94,0.7)' },
  { id:'mv_med',     name:'Defensor 📏',   icon:'📏', dim:'Dimensão 📏',
    desc:'Traje violeta do Defensor do Multiverso. Concedido ao conquistador de todas as grandezas.',
    suit:'#3b0764', visor:'#c084fc', accent:'#2e0550', chest:'#25043f', glow:'rgba(168,85,247,0.8)' },
];

(function registerMvSkinsInCollection(){
  MV_SKINS.forEach(function(ms){
    if(!SKINS.find(function(s){return s.id===ms.id;})){
      SKINS.push({
        id:ms.id, name:ms.icon+' '+ms.name, wave:9999,
        desc:ms.desc, stars:'🌀', rarity:'MULTIVERSO',
        suit:ms.suit, visor:ms.visor, accent:ms.accent, chest:ms.chest||ms.suit, glow:ms.glow
      });
    }
  });
  // Unlock already-earned MV skins
  try{
    var saved=localStorage.getItem('spacemath_mv_v1');
    if(saved){
      var d=JSON.parse(saved);
      (d.completedPhases||[]).forEach(function(phId){
        var ms=MV_SKINS.find(function(s){return s.id==='mv_'+phId.replace('mv_','');});
        if(ms && !skinState.unlocked.includes(ms.id)) skinState.unlocked.push(ms.id);
      });
    }
  }catch(e){}
})();

// --- STATE ---
var mvState = {
  completedPhases:[],
  activeDimIndex:null,
  storySlides:[],
  storySlide:0,
  storyTwTimer:null,
  storyCallback:null,
  inProgress:false,
  currentPhaseId:null,
  wavesDone:0,
  savedOpOptions:null,
  savedDiff:null
};

(function loadMvState(){
  try{ var s=localStorage.getItem('spacemath_mv_v1'); if(s){var d=JSON.parse(s);mvState.completedPhases=d.completedPhases||[];} }catch(e){}
})();
function saveMvState(){ try{localStorage.setItem('spacemath_mv_v1',JSON.stringify({completedPhases:mvState.completedPhases}));}catch(e){} }

// Called from the merged gameOver / goToMainMenu patches
function mvCleanupOnExit(){
  if(!mvState.inProgress) return;
  _mvRestoreSettings();
  mvState.inProgress=false;
  mvState.currentPhaseId=null;
  state._campPhaseId=null;
  state._campNumMax=null;
  var bar=document.getElementById('mvHudBar');
  if(bar) bar.style.display='none';
}

function _mvRestoreSettings(){
  if(mvState.savedOpOptions){ Object.assign(opOptions,mvState.savedOpOptions); mvState.savedOpOptions=null; }
  if(mvState.savedDiff){
    var orig=mvState.savedDiff;
    DIFF.medium.speed=orig.speed; DIFF.medium.spawn=orig.spawn; DIFF.medium.lives=orig.lives;
    mvState.savedDiff=null;
  }
}

// --- MAP ---
function openMultiversoMap(){
  document.getElementById('startScreen').classList.add('hidden');
  _mvBuildMap();
  document.getElementById('multiversoMapScreen').style.display='flex';
}
function closeMultiversoMap(){
  document.getElementById('multiversoMapScreen').style.display='none';
  document.getElementById('startScreen').classList.remove('hidden');
}

function _mvBuildMap(){
  var screen=document.getElementById('multiversoMapScreen');
  var completed=mvState.completedPhases.length;
  var total=MULTIVERSO_PHASES.length;
  screen.innerHTML=`
    <style>
      .mv-close-btn:hover{background:rgba(255,255,255,0.08)!important;color:#fff!important;border-color:#888!important;}
      .mv-card-playable:hover{border-color:rgba(168,85,247,0.7)!important;background:rgba(168,85,247,0.12)!important;transform:translateY(-2px);box-shadow:0 6px 24px rgba(168,85,247,0.25)!important;}
      .mv-card-done:hover{background:rgba(168,85,247,0.16)!important;transform:translateY(-2px);}
      .mv-card-playable,.mv-card-done{transition:all 0.18s ease!important;}
      .mv-btn-primary{font-family:'Press Start 2P',monospace;font-size:9px;color:#000;background:linear-gradient(135deg,#a855f7,#7c3aed);border:none;border-radius:6px;padding:12px 20px;cursor:pointer;margin-right:8px;box-shadow:0 0 20px rgba(168,85,247,0.5);transition:filter 0.15s,transform 0.1s;}
      .mv-btn-primary:hover{filter:brightness(1.2);transform:translateY(-1px);}
      .mv-btn-secondary{font-family:'Press Start 2P',monospace;font-size:9px;color:#c084fc;background:transparent;border:2px solid rgba(168,85,247,0.4);border-radius:6px;padding:12px 16px;cursor:pointer;transition:background 0.15s,border-color 0.15s,transform 0.1s;}
      .mv-btn-secondary:hover{background:rgba(168,85,247,0.12);border-color:rgba(168,85,247,0.7);transform:translateY(-1px);}
      .mv-skip-btn:hover{color:#fff!important;border-color:#666!important;background:rgba(255,255,255,0.06)!important;}
      .mv-nav-btn:hover:not(:disabled){background:rgba(168,85,247,0.25)!important;border-color:#a855f7!important;}
    </style>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 28px;border-bottom:1px solid rgba(168,85,247,0.2);background:rgba(0,0,0,0.5);flex-shrink:0;">
      <div>
        <div style="font-family:'Press Start 2P',monospace;font-size:12px;color:#c084fc;text-shadow:0 0 20px rgba(168,85,247,0.8);letter-spacing:2px;">🌀 MULTIVERSO</div>
        <div style="font-family:'Press Start 2P',monospace;font-size:7px;color:rgba(168,85,247,0.5);letter-spacing:3px;margin-top:4px;">ALEX LUNAR — MATEMÁTICA AVANÇADA · 6º ANO</div>
      </div>
      <button class="mv-close-btn" onclick="closeMultiversoMap()" style="font-family:'Press Start 2P',monospace;font-size:9px;color:#888;background:rgba(0,0,0,0.4);border:1px solid #444;border-radius:4px;padding:8px 14px;cursor:pointer;transition:all 0.15s;">✕ VOLTAR</button>
    </div>

    <div style="padding:12px 28px 0;flex-shrink:0;">
      <div style="display:flex;justify-content:space-between;font-family:'Press Start 2P',monospace;font-size:7px;color:rgba(168,85,247,0.6);margin-bottom:6px;">
        <span>PROGRESSO</span><span>${completed} / ${total} DIMENSÕES</span>
      </div>
      <div style="width:100%;height:6px;background:rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;">
        <div style="height:100%;background:linear-gradient(90deg,#a855f7,#c084fc);border-radius:10px;width:${completed/total*100}%;box-shadow:0 0 8px #a855f7;transition:width 0.5s;"></div>
      </div>
    </div>

    <!-- How-to banner -->
    <div style="margin:12px 28px 0;padding:10px 14px;background:rgba(168,85,247,0.07);border:1px solid rgba(168,85,247,0.2);border-radius:6px;display:flex;align-items:center;gap:10px;flex-shrink:0;">
      <span style="font-size:16px;">💡</span>
      <div>
        <div style="font-family:'Press Start 2P',monospace;font-size:7px;color:rgba(168,85,247,0.8);margin-bottom:3px;">COMO FUNCIONA</div>
        <div style="font-family:'Exo 2',sans-serif;font-size:11px;color:rgba(255,255,255,0.55);line-height:1.5;">Sobreviva <strong style="color:#c084fc;">3 ondas</strong> em cada dimensão para desbloqueá-la. Complete-a para ganhar uma <strong style="color:#c084fc;">skin exclusiva</strong> e liberar a próxima!</div>
      </div>
    </div>

    <div id="mvCardsContainer" style="flex:1;overflow-y:auto;padding:14px 28px 24px;display:flex;flex-direction:column;gap:10px;"></div>
  `;
  var container=document.getElementById('mvCardsContainer');
  MULTIVERSO_PHASES.forEach(function(ph,i){
    var isDone=mvState.completedPhases.includes(ph.id);
    var isLocked=i>0 && !mvState.completedPhases.includes(MULTIVERSO_PHASES[i-1].id);
    var mvSkin=MV_SKINS.find(function(s){return s.id===ph.id;});
    var card=document.createElement('div');
    card.className=isDone?'mv-card-done':(isLocked?'':'mv-card-playable');
    card.style.cssText='background:'+(isDone?'rgba(168,85,247,0.1)':'rgba(0,0,0,0.5)')+';border:2px solid '+(isDone?ph.color:'rgba(168,85,247,0.2)')+';border-radius:8px;padding:14px 18px;display:flex;align-items:center;gap:14px;opacity:'+(isLocked?'0.4':'1')+';cursor:'+(isLocked?'default':'pointer')+';box-shadow:'+(isDone?'0 0 20px rgba(168,85,247,0.15)':'none')+';';

    // Skin preview snippet
    var skinHtml='';
    if(mvSkin && !isLocked){
      skinHtml='<div style="display:flex;align-items:center;gap:6px;margin-top:5px;">'
        +'<div style="width:18px;height:18px;border-radius:3px;background:'+mvSkin.suit+';border:1px solid '+mvSkin.visor+';display:flex;align-items:center;justify-content:center;font-size:9px;box-shadow:0 0 6px '+mvSkin.glow+';">'+mvSkin.icon+'</div>'
        +'<div style="font-family:\'Exo 2\',sans-serif;font-size:9px;color:rgba(168,85,247,0.6);">'+(isDone?'<span style="color:#ffd700;">✔ Skin: '+mvSkin.name+' desbloqueada!</span>':'Recompensa: <span style="color:'+mvSkin.visor+';">'+mvSkin.name+'</span>')+'</div>'
        +'</div>';
    }

    card.innerHTML='<div style="font-size:28px;filter:drop-shadow(0 0 8px '+ph.glowColor+');flex-shrink:0;">'+ph.emoji+'</div>'
      +'<div style="flex:1;min-width:0;">'
        +'<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:'+(isDone?ph.color:'#c084fc')+';margin-bottom:3px;">'+ph.name+'</div>'
        +'<div style="font-family:\'Exo 2\',sans-serif;font-size:11px;color:rgba(255,255,255,0.5);">'+ph.topicLabel+' · <span style="color:rgba(168,85,247,0.5);">3 ondas</span></div>'
        +'<div style="font-family:\'Exo 2\',sans-serif;font-size:10px;color:rgba(255,255,255,0.28);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+ph.lore+'</div>'
        +skinHtml
      +'</div>'
      +'<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;flex-shrink:0;">'
        +(isDone?'<span style="color:#ffd700;">✔ FEITO</span>':isLocked?'<span style="color:#555;">🔒</span>':'<span style="color:#c084fc;">▶ JOGAR</span>')
      +'</div>';

    if(!isLocked){
      card.addEventListener('click',function(){ selectMvDimension(i); });
    }
    container.appendChild(card);
  });
}

// --- STORY ---
function selectMvDimension(idx){
  mvState.activeDimIndex=idx;
  var ph=MULTIVERSO_PHASES[idx];
  _showMvStory(ph,'intro',ph.introStory,function(){ startMvPhase(idx); });
}

function _showMvStory(ph,mode,slides,callback){
  mvState.storySlides=slides;
  mvState.storySlide=0;
  mvState.storyCallback=callback;
  var screen=document.getElementById('mvStoryScreen');
  screen.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 28px;border-bottom:1px solid rgba(168,85,247,0.15);background:rgba(0,0,0,0.5);flex-shrink:0;">
      <div style="font-family:'Press Start 2P',monospace;font-size:8px;color:#c084fc;letter-spacing:2px;">${ph.name} — ${mode==='intro'?'MISSÃO':'DESFECHO'}</div>
      <button class="mv-skip-btn" onclick="skipMvStory()" style="font-family:'Press Start 2P',monospace;font-size:8px;color:#888;background:rgba(0,0,0,0.4);border:1px solid #444;border-radius:4px;padding:7px 12px;cursor:pointer;transition:all 0.15s;">⏭ PULAR</button>
    </div>
    <div style="flex:1;overflow:hidden;position:relative;">
      <div id="mvStorySlides" style="display:flex;height:100%;transition:transform 0.45s cubic-bezier(0.4,0,0.2,1);"></div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 28px;border-top:1px solid rgba(168,85,247,0.1);background:rgba(0,0,0,0.4);flex-shrink:0;">
      <button id="mvStoryPrev" class="mv-nav-btn" onclick="mvStoryNav(-1)" disabled style="font-family:'Press Start 2P',monospace;font-size:8px;background:rgba(0,0,0,0.5);border:2px solid rgba(168,85,247,0.3);border-radius:4px;padding:9px 18px;cursor:pointer;color:#c084fc;box-shadow:3px 3px 0 #000;transition:all 0.15s;">◄ ANTERIOR</button>
      <div id="mvStoryDots" style="display:flex;gap:8px;"></div>
      <button id="mvStoryNext" class="mv-nav-btn" onclick="mvStoryNav(1)" style="font-family:'Press Start 2P',monospace;font-size:8px;background:rgba(168,85,247,0.15);border:2px solid rgba(168,85,247,0.6);border-radius:4px;padding:9px 18px;cursor:pointer;color:#c084fc;box-shadow:3px 3px 0 #000;transition:all 0.15s;">PRÓXIMO ►</button>
    </div>
  `;
  // Build slides
  var wrap=document.getElementById('mvStorySlides');
  slides.forEach(function(sl,i){
    var slide=document.createElement('div');
    slide.style.cssText='min-width:100%;height:100%;display:flex;flex-direction:row;align-items:stretch;';
    // Visual
    var vis=document.createElement('div');
    vis.style.cssText='flex:1;position:relative;overflow:hidden;background:radial-gradient(ellipse 80% 60% at 50% 110%,'+ph.glowColor+' 0%,transparent 70%),linear-gradient(180deg,#04010f 0%,#0a0220 50%,#04010f 100%);display:flex;align-items:center;justify-content:center;';
    vis.innerHTML='<div style="position:absolute;top:22%;left:50%;transform:translateX(-50%);font-size:80px;filter:drop-shadow(0 0 40px '+ph.glowColor+');z-index:4;animation:campPlanetFloat 4s ease-in-out infinite;">'+ph.emoji+'</div>'
      +'<div style="position:absolute;bottom:20%;left:50%;transform:translateX(-50%);font-family:\'Press Start 2P\',monospace;font-size:7px;color:rgba(168,85,247,0.4);letter-spacing:3px;z-index:5;">'+ph.topicLabel.toUpperCase()+'</div>';
    slide.appendChild(vis);
    // Content
    var content=document.createElement('div');
    content.style.cssText='width:360px;flex-shrink:0;background:rgba(4,1,20,0.97);border-left:1px solid rgba(168,85,247,0.12);display:flex;flex-direction:column;justify-content:center;padding:32px 28px;';
    content.innerHTML='<div style="font-family:\'Press Start 2P\',monospace;font-size:7px;color:rgba(168,85,247,0.4);letter-spacing:3px;margin-bottom:10px;">'+sl.slideNum+'</div>'
      +'<div style="font-size:28px;margin-bottom:12px;">'+sl.icon+'</div>'
      +'<div style="font-family:\'Press Start 2P\',monospace;font-size:11px;color:#c084fc;text-shadow:0 0 14px rgba(168,85,247,0.6);margin-bottom:14px;line-height:1.6;">'+sl.title.replace('\n','<br>')+'</div>'
      +'<div style="font-family:\'Exo 2\',sans-serif;font-size:13px;color:rgba(255,255,255,0.8);line-height:1.7;" id="mvStTxt'+i+'"></div>';
    slide.appendChild(content);
    wrap.appendChild(slide);
  });
  // Dots
  var dotsEl=document.getElementById('mvStoryDots');
  slides.forEach(function(_,i){
    var d=document.createElement('div');
    d.style.cssText='width:8px;height:8px;border-radius:50%;background:rgba(168,85,247,0.25);cursor:pointer;transition:background 0.2s;';
    d.onclick=(function(idx){return function(){_mvStoryGoTo(idx);};})(i);
    dotsEl.appendChild(d);
  });
  screen.style.display='flex';
  _mvStoryGoTo(0);
}

function _mvStoryGoTo(idx){
  if(idx<0||idx>=mvState.storySlides.length) return;
  mvState.storySlide=idx;
  document.getElementById('mvStorySlides').style.transform='translateX(-'+idx*100+'%)';
  document.querySelectorAll('#mvStoryDots div').forEach(function(d,i){
    d.style.background=i===idx?'#c084fc':'rgba(168,85,247,0.25)';
  });
  var prev=document.getElementById('mvStoryPrev');
  if(prev) prev.disabled=idx===0;
  var btn=document.getElementById('mvStoryNext');
  if(!btn) return;
  var isLast=idx===mvState.storySlides.length-1;
  if(isLast){
    btn.textContent='⚔ VAMOS LÁ!';
    btn.onclick=skipMvStory;
  } else {
    btn.textContent='PRÓXIMO ►';
    btn.onclick=function(){mvStoryNav(1);};
  }
  _mvStoryTypewrite(idx);
}

function _mvStoryTypewrite(idx){
  if(mvState.storyTwTimer){clearTimeout(mvState.storyTwTimer);mvState.storyTwTimer=null;}
  var rawHtml=mvState.storySlides[idx].text.replace(/\n/g,'<br>');
  var el=document.getElementById('mvStTxt'+idx);
  if(!el) return;
  var stripped=rawHtml.replace(/<[^>]+>/g,'');
  var total=stripped.length;
  var revealed=0;
  var speed=Math.max(14,Math.floor(2800/total));
  function revealNext(){
    revealed++;
    var shown=0,out='',inTag=false;
    for(var ci=0;ci<rawHtml.length;ci++){
      var ch=rawHtml[ci];
      if(ch==='<'){inTag=true;out+=ch;continue;}
      if(ch==='>'){inTag=false;out+=ch;continue;}
      if(inTag){out+=ch;continue;}
      if(shown<revealed){out+=ch;shown++;}else break;
    }
    el.innerHTML=out+(revealed<total?'<span style="display:inline-block;width:2px;height:12px;background:#c084fc;vertical-align:middle;"></span>':'');
    if(revealed<total) mvState.storyTwTimer=setTimeout(revealNext,speed);
  }
  el.innerHTML=''; revealNext();
}

function mvStoryNav(dir){_mvStoryGoTo(mvState.storySlide+dir);}
function skipMvStory(){
  if(mvState.storyTwTimer){clearTimeout(mvState.storyTwTimer);mvState.storyTwTimer=null;}
  document.getElementById('mvStoryScreen').style.display='none';
  if(mvState.storyCallback){var cb=mvState.storyCallback;mvState.storyCallback=null;cb();}
}

// --- START PHASE ---
function startMvPhase(idx){
  var ph=MULTIVERSO_PHASES[idx];
  mvState.inProgress=true;
  mvState.currentPhaseId=ph.id;
  mvState.wavesDone=0;

  // Save and override opOptions — only the topic op
  mvState.savedOpOptions=Object.assign({},opOptions);
  Object.keys(opOptions).forEach(function(k){opOptions[k]=false;});
  opOptions[ph.topic]=true;

  // Save and override DIFF.medium speed/spawn/lives
  mvState.savedDiff={speed:DIFF.medium.speed,spawn:DIFF.medium.spawn,lives:DIFF.medium.lives};
  DIFF.medium.speed=mvState.savedDiff.speed*ph.speedMult;
  DIFF.medium.spawn=Math.floor(mvState.savedDiff.spawn/ph.spawnMult);
  DIFF.medium.lives=ph.lives;

  // Set _campNumMax so campaign numMax patch passes through to _generateSpecialProblem
  state._campNumMax=null; // not needed for special ops — clear it
  state._campPhaseId=ph.id; // reuse for wave tracking
  state._campWavesDone=0;
  state._campTotalWaves=3;

  // Show HUD
  var bar=document.getElementById('mvHudBar');
  bar.style.display='flex';
  document.getElementById('mvHudEmoji').textContent=ph.emoji;
  document.getElementById('mvHudName').textContent=ph.name;
  document.getElementById('mvHudWaveNum').textContent='1';

  // Hide multiverso map
  document.getElementById('multiversoMapScreen').style.display='none';

  startGame('medium');
}

function completeMvPhase(phId){
  var ph=MULTIVERSO_PHASES.find(function(p){return p.id===phId;});
  if(!ph) return;

  _mvRestoreSettings();
  mvState.inProgress=false;
  mvState.currentPhaseId=null;
  state._campPhaseId=null;

  // Stop the game cleanly
  state.running=false;
  clearInterval(gameLoop);gameLoop=null;
  clearInterval(spawnLoop);spawnLoop=null;
  state.ufos.forEach(function(u){try{u.el.remove();}catch(e){}});
  state.ufos=[];
  document.getElementById('mvHudBar').style.display='none';

  if(!mvState.completedPhases.includes(phId)){
    mvState.completedPhases.push(phId);
    saveMvState();
    // Unlock corresponding MV skin
    var ms=MV_SKINS.find(function(s){return s.id===phId.replace('mv_','mv_');});
    // map phase id directly: mv_pct → mv_pct etc
    var skinId=phId; // phase ids already match skin ids
    var mvSkin=MV_SKINS.find(function(s){return s.id===skinId;});
    if(mvSkin && !skinState.unlocked.includes(mvSkin.id)){
      skinState.unlocked.push(mvSkin.id);
      saveSkins();
    }
  }

  // Show victory modal
  var mvSkin=MV_SKINS.find(function(s){return s.id===phId;});
  var skinRewardHtml='';
  if(mvSkin){
    skinRewardHtml='<div style="background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:12px 16px;margin-bottom:20px;">'
      +'<div style="font-family:\'Press Start 2P\',monospace;font-size:7px;color:rgba(168,85,247,0.6);letter-spacing:2px;margin-bottom:8px;">✦ RECOMPENSA DESBLOQUEADA</div>'
      +'<div style="display:flex;align-items:center;gap:12px;">'
        +'<div style="width:44px;height:44px;border-radius:6px;background:'+mvSkin.suit+';border:2px solid '+mvSkin.visor+';display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 0 14px '+mvSkin.glow+';">'+mvSkin.icon+'</div>'
        +'<div style="text-align:left;">'
          +'<div style="font-family:\'Press Start 2P\',monospace;font-size:8px;color:'+mvSkin.visor+';margin-bottom:3px;">'+mvSkin.name+'</div>'
          +'<div style="font-family:\'Exo 2\',sans-serif;font-size:10px;color:rgba(255,255,255,0.5);">'+mvSkin.desc.substring(0,50)+'...</div>'
        +'</div>'
      +'</div>'
    +'</div>';
  }
  var modal=document.getElementById('mvVictoryModal');
  modal.innerHTML='<div style="background:linear-gradient(145deg,#0d0520,#060110);border:3px solid #a855f7;border-radius:8px;padding:32px 28px;max-width:400px;width:90%;text-align:center;box-shadow:0 0 60px rgba(168,85,247,0.4),8px 8px 0 rgba(0,0,0,0.6);">'
    +'<div style="font-size:48px;margin-bottom:12px;animation:medalSpin 1s ease-out;">🌀</div>'
    +'<div style="font-family:\'Press Start 2P\',monospace;font-size:8px;color:#c084fc;letter-spacing:2px;margin-bottom:8px;">✦ DIMENSÃO CONQUISTADA ✦</div>'
    +'<div style="font-family:\'Press Start 2P\',monospace;font-size:15px;color:#c084fc;text-shadow:0 0 20px rgba(168,85,247,0.8);margin-bottom:8px;">'+ph.name+' VENCIDA!</div>'
    +'<div style="font-family:\'Exo 2\',sans-serif;font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:20px;">Você dominou: '+ph.topicLabel+'!</div>'
    +skinRewardHtml
    +'<button class="mv-btn-primary" onclick="mvVictoryNextOutro()">📖 DESFECHO</button>'
    +' <button class="mv-btn-secondary" onclick="closeMvVictory()">🗺 MAPA</button>'
    +'</div>';
  modal.style.display='flex';
  document.getElementById('startScreen').classList.add('hidden');
}

function mvVictoryNextOutro(){
  document.getElementById('mvVictoryModal').style.display='none';
  var ph=MULTIVERSO_PHASES[mvState.activeDimIndex||0];
  _showMvStory(ph,'outro',ph.outroStory,function(){
    if(mvState.completedPhases.length>=MULTIVERSO_PHASES.length){ _showMvFinal(); }
    else { openMultiversoMap(); }
  });
}

function closeMvVictory(){
  document.getElementById('mvVictoryModal').style.display='none';
  openMultiversoMap();
}

function _showMvFinal(){
  var div=document.createElement('div');
  div.style.cssText='position:fixed;inset:0;z-index:9500;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 50%,#0d0030 0%,#04010f 60%);text-align:center;padding:32px;';
  div.innerHTML='<div style="font-size:64px;margin-bottom:18px;animation:medalSpin 1s ease-out;">🌀</div>'
    +'<div style="font-family:\'Press Start 2P\',monospace;font-size:14px;color:#c084fc;text-shadow:0 0 30px rgba(168,85,247,0.9);margin-bottom:10px;">MULTIVERSO COMPLETO!</div>'
    +'<div style="font-family:\'Press Start 2P\',monospace;font-size:8px;color:rgba(168,85,247,0.5);letter-spacing:2px;margin-bottom:20px;">DEFENSOR DO MULTIVERSO MATEMÁTICO</div>'
    +'<div style="font-family:\'Exo 2\',sans-serif;font-size:14px;color:rgba(255,255,255,0.65);max-width:480px;line-height:1.7;margin-bottom:28px;">5 dimensões conquistadas. Porcentagem, Probabilidade, Estatística, Raiz Quadrada e Grandezas — todos os segredos da matemática do 6º ano revelados por uma mente brilhante.</div>'
    +'<button class="mv-btn-primary" style="font-size:10px;padding:14px 28px;" onclick="this.parentElement.remove();document.getElementById(\'startScreen\').classList.remove(\'hidden\');">🌌 VOLTAR AO MENU</button>';
  document.body.appendChild(div);
}

