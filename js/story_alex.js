// ═══════════════════════════════════════════════════════════════════════════
// ████████████████████████████████████████████████████████████████████████████
// MODO: A HISTÓRIA DE ALEX LUNAR (PREQUEL)
// Cadete Alex em treinamento na Base Lunar Selene-7.
// Cinco estações de aprendizado MANIPULATIVO (não quiz):
//  1. Reator Energético  → Adição como composição (linha numérica viva)
//  2. Hangar de Suprimentos → Subtração como remoção visual
//  3. Laboratório de Cristais → Multiplicação como área (grid)
//  4. Estação de Comunicação → Divisão como distribuição
//  5. Sala de Treinamento → Sandbox de equações livres (síntese)
// ████████████████████████████████████████████████████████████████████████████
// ═══════════════════════════════════════════════════════════════════════════
(function(){
  'use strict';

  // Estado global do modo
  var ALEX = {
    rooms: [
      { id: 'reactor',  num: 1, icon: '⚡',  name: 'REATOR ENERGÉTICO',
        desc: 'Reabasteça reatores com cristais de energia. Descubra somas.',
        instructor: { emoji: '👨‍🔬', name: 'DR. SOMA' } },
      { id: 'hangar',   num: 2, icon: '📦',  name: 'HANGAR DE SUPRIMENTOS',
        desc: 'Despache caixas para estações distantes. Veja a subtração ao vivo.',
        instructor: { emoji: '🧑‍✈️', name: 'TEN. DIFF' } },
      { id: 'lab',      num: 3, icon: '💎',  name: 'LABORATÓRIO DE CRISTAIS',
        desc: 'Sintetize cristais em arranjos. Multiplicação como área.',
        instructor: { emoji: '👩‍🔬', name: 'ENG. KAYA' } },
      { id: 'comms',    num: 4, icon: '📡',  name: 'ESTAÇÃO DE COMUNICAÇÃO',
        desc: 'Distribua antenas para colônias. Divisão como repartição justa.',
        instructor: { emoji: '🧑‍🚀', name: 'CAP. PYX' } },
      { id: 'training', num: 5, icon: '🎯',  name: 'SALA DE TREINAMENTO',
        desc: 'Construa equações que cheguem ao alvo. Quantos caminhos você acha?',
        instructor: { emoji: '🧑‍🏫', name: 'COMTE. VEGA' } },
      { id: 'fractions', num: 6, icon: '🍕',  name: 'ESTAÇÃO DE FRAGMENTAÇÃO',
        desc: 'Trabalhe com partes de um todo. Frações e proporções.',
        instructor: { emoji: '👩‍🍳', name: 'SARG. RATIO' } },
      { id: 'integers', num: 7, icon: '⚖️',  name: 'NÚCLEOS DE POLARIDADE',
        desc: 'Equilibre cargas positivas e negativas. Números inteiros.',
        instructor: { emoji: '🔋', name: 'ENG. ION' } },
      { id: 'geometry', num: 8, icon: '📐',  name: 'MAPA DE NAVEGAÇÃO',
        desc: 'Calcule distâncias e áreas no mapa lunar. Geometria básica.',
        instructor: { emoji: '🗺️', name: 'TEN. AXIS' } },
      { id: 'algebra',  num: 9, icon: '🧪',  name: 'SÍNTESE DE FÓRMULAS',
        desc: 'Encontre o valor de X em misturas químicas. Álgebra inicial.',
        instructor: { emoji: '⚗️', name: 'DR. X' } }
    ],
    progress: { reactor:false, hangar:false, lab:false, comms:false, training:false, fractions:false, integers:false, geometry:false, algebra:false },
    currentRoom: null,
    stats: {
      totalSolutions: 0,
      stationsVisited: 0,
      timeStarted: null,
      bonusInsights: 0   // descobertas extras (formas alternativas, propriedades)
    },
    sessionActive: false
  };

  // ─── PERSISTÊNCIA via localStorage (best-effort) ─────────────────────────
  function alexLoad(){
    try {
      var raw = localStorage.getItem('alexLunarStoryProgress');
      if(raw){
        var p = JSON.parse(raw);
        if(p && p.progress) ALEX.progress = Object.assign(ALEX.progress, p.progress);
        if(p && p.stats)    ALEX.stats    = Object.assign(ALEX.stats, p.stats);
      }
    } catch(_){}
  }
  function alexSave(){
    try {
      localStorage.setItem('alexLunarStoryProgress', JSON.stringify({
        progress: ALEX.progress, stats: ALEX.stats
      }));
    } catch(_){}
  }
  alexLoad();

  // ─── ABRIR/FECHAR MODO ────────────────────────────────────────────────────
  window.openAlexStory = function(){
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('alexBaseMap').classList.add('show');
    if(!ALEX.stats.timeStarted) ALEX.stats.timeStarted = Date.now();
    renderRoomMap();
    // áudio (volta ao tema do menu)
    try { if(window._spacemathPlayMusic) window._spacemathPlayMusic('menu'); } catch(_){}
  };
  window.closeAlexStory = function(){
    document.getElementById('alexBaseMap').classList.remove('show');
    document.getElementById('alexStationScreen').classList.remove('show');
    document.getElementById('alexCeremonyScreen').classList.remove('show');
    document.getElementById('startScreen').classList.remove('hidden');
  };

  // ─── RENDERIZA O MAPA DAS SALAS ───────────────────────────────────────────
  function renderRoomMap(){
    var container = document.getElementById('alexRoomsContainer');
    container.innerHTML = '';

    var done = 0;
    ALEX.rooms.forEach(function(r){ if(ALEX.progress[r.id]) done++; });

    // Atualiza barra de progresso
    var pct = Math.round((done / ALEX.rooms.length) * 100);
    document.getElementById('alexProgressFill').style.width = pct + '%';
    document.getElementById('alexProgressText').textContent = done + ' / ' + ALEX.rooms.length + ' ESTAÇÕES';

    // Determina qual é a "atual" (próxima não-completada na ordem)
    var currentIdx = ALEX.rooms.findIndex(function(r){ return !ALEX.progress[r.id]; });
    if(currentIdx === -1) currentIdx = ALEX.rooms.length; // todas completadas

    ALEX.rooms.forEach(function(r, i){
      var card = document.createElement('div');
      card.className = 'alex-room-card';

      var locked = false;
      if(ALEX.progress[r.id]){
        card.classList.add('completed');
      } else if(i === currentIdx){
        card.classList.add('current');
      } else if(i > currentIdx){
        // Permitir tentar fora de ordem? Vou deixar destravado após começar — promove exploração.
        // Mas marco visualmente como "futuro" até o cadete ter visitado a primeira.
        if(!ALEX.progress[ALEX.rooms[currentIdx]?.id] && i > currentIdx){
          // mantém clicável - exploração livre incentivada
        }
      }

      card.onclick = function(){ enterRoom(r.id); };

      var statusEl;
      if(ALEX.progress[r.id]){
        statusEl = '<div class="alex-room-status check-icon">✓</div>';
      } else if(i === currentIdx){
        statusEl = '<div class="alex-room-status arrow-icon">►</div>';
      } else {
        statusEl = '<div class="alex-room-status arrow-icon" style="opacity:0.4;">▷</div>';
      }

      var extraBadge = (r.num > 5) ? '<div class="alex-room-extra-badge">EXTRA</div>' : '';

      card.innerHTML =
        extraBadge +
        '<div class="alex-room-icon">' + r.icon + '</div>' +
        '<div class="alex-room-info">' +
          '<div class="alex-room-num">ESTAÇÃO ' + r.num + ' · ' + r.instructor.name + '</div>' +
          '<div class="alex-room-name">' + r.name + '</div>' +
          '<div class="alex-room-desc">' + r.desc + '</div>' +
        '</div>' +
        statusEl;

      container.appendChild(card);
    });

    // Card final (cerimônia) só aparece quando tudo está completo
    if(done === ALEX.rooms.length){
      var finalCard = document.createElement('div');
      finalCard.className = 'alex-room-card current';
      finalCard.style.borderColor = 'var(--yellow)';
      finalCard.style.background = 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,140,0,0.06))';
      finalCard.onclick = function(){ openCeremony(); };
      finalCard.innerHTML =
        '<div class="alex-room-icon" style="background:rgba(255,215,0,0.18);border-color:var(--yellow);">🏅</div>' +
        '<div class="alex-room-info">' +
          '<div class="alex-room-num" style="color:var(--yellow);">CERIMÔNIA FINAL</div>' +
          '<div class="alex-room-name" style="color:var(--yellow);">SALA DO COMANDANTE</div>' +
          '<div class="alex-room-desc">Receba sua patente e torne-se Capitão Alex Lunar.</div>' +
        '</div>' +
        '<div class="alex-room-status arrow-icon">►</div>';
      container.appendChild(finalCard);
    }
  }

  // ─── DIÁLOGO TIPO TYPEWRITER ──────────────────────────────────────────────
  var DLG = { lines: [], idx: 0, onComplete: null, typing: false, target: '', charIdx: 0, timer: null, skipping: false };

  function dlgStart(lines, onComplete){
    DLG.lines = lines.slice();
    DLG.idx = 0;
    DLG.onComplete = onComplete || function(){};
    DLG.skipping = false;
    document.getElementById('alexDlgSkip').textContent = 'PULAR ▶';
    dlgShowCurrent();
  }
  function dlgShowCurrent(){
    if(DLG.idx >= DLG.lines.length){
      DLG.onComplete();
      return;
    }
    var line = DLG.lines[DLG.idx];
    DLG.target = line;
    DLG.charIdx = 0;
    DLG.typing = true;
    var el = document.getElementById('alexDlgText');
    el.innerHTML = '<span class="alex-dialog-cursor"></span>';
    var skipBtn = document.getElementById('alexDlgSkip');
    skipBtn.classList.remove('sonar-active');
    if(DLG.timer) clearInterval(DLG.timer);
    DLG.timer = setInterval(function(){
      if(DLG.charIdx >= DLG.target.length){
        clearInterval(DLG.timer);
        DLG.typing = false;
        if(!ALEX.sessionActive) skipBtn.classList.add('sonar-active');
        document.getElementById('alexDlgSkip').textContent = (DLG.idx === DLG.lines.length - 1) ? 'COMEÇAR ▶' : 'PRÓXIMO ▶';
        return;
      }
      DLG.charIdx++;
      el.innerHTML = DLG.target.substring(0, DLG.charIdx) + '<span class="alex-dialog-cursor"></span>';
    }, 22);
  }
  window.alexDlgAdvance = function(){
    if(DLG.typing){
      // completar imediatamente esta linha
      if(DLG.timer) clearInterval(DLG.timer);
      DLG.charIdx = DLG.target.length;
      document.getElementById('alexDlgText').innerHTML = DLG.target + '<span class="alex-dialog-cursor"></span>';
      DLG.typing = false;
      var skipBtn = document.getElementById('alexDlgSkip');
      if(!ALEX.sessionActive) skipBtn.classList.add('sonar-active');
      document.getElementById('alexDlgSkip').textContent = (DLG.idx === DLG.lines.length - 1) ? 'COMEÇAR ▶' : 'PRÓXIMO ▶';
      return;
    }
    DLG.idx++;
    dlgShowCurrent();
  };

  // ─── TOAST DE FEEDBACK ────────────────────────────────────────────────────
  var _toastTimer = null;
  function toast(msg, kind){
    kind = kind || 'info';
    var el = document.getElementById('alexToast');
    el.className = 'alex-toast show ' + kind;
    el.innerHTML = msg;
    if(_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function(){
      el.classList.remove('show');
    }, 2400);
  }

  // ─── ENTRAR EM UMA SALA ───────────────────────────────────────────────────
  function enterRoom(roomId){
    var room = ALEX.rooms.find(function(r){ return r.id === roomId; });
    if(!room) return;
    ALEX.currentRoom = roomId;

    document.getElementById('alexBaseMap').classList.remove('show');
    document.getElementById('alexStationScreen').classList.add('show');

    document.getElementById('alexStEmoji').textContent = room.icon;
    document.getElementById('alexStNumLabel').textContent = 'ESTAÇÃO ' + room.num + ' DE 5';
    document.getElementById('alexStTitle').textContent = room.name;
    document.getElementById('alexDlgPortrait').textContent = room.instructor.emoji;
    document.getElementById('alexDlgName').textContent = room.instructor.name;
    document.getElementById('alexTaskBar').style.display = 'none';
    document.getElementById('alexStationStage').innerHTML = '';

    // Inicia diálogo + montagem da estação
    if(roomId === 'reactor')   initReactor();
    else if(roomId === 'hangar')   initHangar();
    else if(roomId === 'lab')      initLab();
    else if(roomId === 'comms')    initComms();
    else if(roomId === 'training') initTraining();
    else if(roomId === 'fractions') initFractions();
    else if(roomId === 'integers')  initIntegers();
    else if(roomId === 'geometry')  initGeometry();
    else if(roomId === 'algebra')   initAlgebra();
  }
  window.exitAlexStation = function(){
    document.getElementById('alexStationScreen').classList.remove('show');
    document.getElementById('alexBaseMap').classList.add('show');
    renderRoomMap();
  };

  function showTaskBar(text, current, total){
    document.getElementById('alexTaskBar').style.display = 'flex';
    document.getElementById('alexTaskText').innerHTML = text;
    if(typeof current === 'number'){
      document.getElementById('alexTaskCounter').textContent = 'TAREFA ' + current + ' / ' + total;
      document.getElementById('alexTaskCounter').style.display = 'block';
    } else {
      document.getElementById('alexTaskCounter').style.display = 'none';
    }
  }

  function completeStation(roomId){
    if(!ALEX.progress[roomId]){
      ALEX.progress[roomId] = true;
      ALEX.stats.stationsVisited++;
      alexSave();
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // ESTAÇÃO 1: REATOR ENERGÉTICO (Adição)
  // Conceito: o usuário compõe um número-alvo somando cristais variados.
  // O cristal é arrastado/clicado para a "barra do reator" e a linha numérica
  // mostra visualmente o avanço. O sistema reconhece QUALQUER combinação válida
  // e celebra quando o usuário descobre maneiras diferentes de chegar ao alvo.
  // ═════════════════════════════════════════════════════════════════════════
  var REACTOR = {
    target: 0,
    current: 0,
    history: [],   // valores adicionados, em ordem
    foundSolutions: [],  // assinaturas únicas
    crystals: [1, 2, 3, 5, 10],
    taskIdx: 0,
    tasks: [],
    minSolutions: 2  // descobertas necessárias antes de avançar
  };

  function initReactor(){
    REACTOR.tasks = [
      { target: 7,  minSols: 2, hint: 'Você pode usar cristais menores ou maiores. Tente os dois!' },
      { target: 12, minSols: 2, hint: 'Quantas combinações chegam em 12? Descubra você mesmo.' },
      { target: 18, minSols: 3, hint: 'Este é maior. Use cristais grandes ou várias somas pequenas.' }
    ];
    REACTOR.taskIdx = 0;
    REACTOR.foundSolutions = [];

    dlgStart([
      'Cadete Alex! Bem-vindo ao <strong>Reator Energético</strong>. Eu sou o <strong>Dr. Soma</strong>.',
      'Aqui não há fórmulas decoradas. Aqui há <em>cristais de energia</em> e <em>reatores que precisam ser carregados</em>.',
      'Cada cristal carrega um valor: <strong>1, 2, 3, 5 ou 10 joules</strong>. Sua tarefa é simples — chegar no número que aparece no medidor.',
      'Mas atenção: <span class="acc-orange">não existe UMA resposta certa</span>. Existe um alvo, e existem <em>infinitas formas</em> de chegar nele.',
      'Tente usar cristais grandes. Tente cristais pequenos. Misture. <strong>Descubra suas próprias combinações.</strong>'
    ], function(){ ALEX.sessionActive = true; reactorBuildStage(); });
  }

  function reactorBuildStage(){
    var task = REACTOR.tasks[REACTOR.taskIdx];
    REACTOR.target = task.target;
    REACTOR.current = 0;
    REACTOR.history = [];
    REACTOR.foundSolutions = [];

    showTaskBar(
      'Carregue o reator até <strong>' + REACTOR.target + ' joules</strong>. Encontre <strong>' + task.minSols + '</strong> combinações diferentes.',
      REACTOR.taskIdx + 1, REACTOR.tasks.length
    );

    var stage = document.getElementById('alexStationStage');
    stage.innerHTML =
      '<div class="reactor-stage">' +
        '<div class="reactor-target-display">' +
          '<div class="reactor-target-label">▼ ALVO ▼</div>' +
          '<div class="reactor-target-value">' + REACTOR.target + ' J</div>' +
          '<div class="reactor-current">SOMA ATUAL: <span id="reactorSum">0</span> / <span class="target-num">' + REACTOR.target + '</span></div>' +
        '</div>' +
        '<div class="reactor-numberline-wrap">' +
          '<div class="reactor-numberline" id="reactorLine"></div>' +
        '</div>' +
        '<div class="reactor-history" id="reactorHistory">' +
          '<div class="reactor-history-empty">Toque nos cristais abaixo para somá-los ↓</div>' +
        '</div>' +
        '<div class="reactor-crystals-row" id="reactorCrystals"></div>' +
        '<div class="reactor-solutions-found" id="reactorSolFound">' +
          'Combinações descobertas: <span class="acc">0</span> / ' + task.minSols +
        '</div>' +
        '<div class="reactor-controls">' +
          '<button class="alex-action-btn" onclick="reactorReset()">LIMPAR</button>' +
          '<button class="alex-action-btn green" onclick="reactorNext()" disabled id="reactorNextBtn">PRÓXIMA ▶</button>' +
        '</div>' +
      '</div>';

    // Renderiza linha numérica e cristais
    reactorRenderLine();
    reactorRenderCrystals();
  }

  function reactorRenderLine(){
    var line = document.getElementById('reactorLine');
    line.innerHTML = '';
    var maxVal = Math.max(REACTOR.target + 4, 20);
    var trk = document.createElement('div');
    trk.className = 'reactor-numberline-track';
    line.appendChild(trk);
    var fill = document.createElement('div');
    fill.className = 'reactor-numberline-fill';
    fill.id = 'reactorFill';
    fill.style.width = '0%';
    line.appendChild(fill);

    // ticks e labels
    for(var v=0; v<=maxVal; v++){
      var tick = document.createElement('div');
      tick.className = 'reactor-numberline-tick' + ((v % 5 === 0) ? ' major' : '');
      tick.style.left = (v / maxVal * 100) + '%';
      line.appendChild(tick);
      if(v % 5 === 0){
        var lbl = document.createElement('div');
        lbl.className = 'reactor-numberline-label';
        lbl.textContent = v;
        lbl.style.left = (v / maxVal * 100) + '%';
        line.appendChild(lbl);
      }
    }
    // Alvo
    var t = document.createElement('div');
    t.className = 'reactor-numberline-target';
    t.style.left = (REACTOR.target / maxVal * 100) + '%';
    line.appendChild(t);
    // Marcador atual
    var m = document.createElement('div');
    m.className = 'reactor-numberline-marker';
    m.id = 'reactorMarker';
    m.style.left = '0%';
    line.appendChild(m);
  }

  function reactorRenderCrystals(){
    var row = document.getElementById('reactorCrystals');
    row.innerHTML = '';
    var icons = { 1:'💎', 2:'💎', 3:'🔷', 5:'🔵', 10:'🌟' };
    REACTOR.crystals.forEach(function(v){
      var c = document.createElement('div');
      c.className = 'reactor-crystal';
      c.innerHTML =
        '<div class="reactor-crystal-icon">' + (icons[v] || '💎') + '</div>' +
        '<div class="reactor-crystal-value">+' + v + '</div>' +
        '<div class="reactor-crystal-add">+</div>';
      c.onclick = function(){ reactorAddCrystal(v); };
      row.appendChild(c);
    });
  }

  window.reactorAddCrystal = function(value){
    if(REACTOR.current + value > REACTOR.target + 5){
      toast('⚠ Cuidado — você passaria muito do alvo!', 'warn');
      return;
    }
    REACTOR.current += value;
    REACTOR.history.push(value);
    reactorUpdateDisplay();

    if(REACTOR.current === REACTOR.target){
      reactorRegisterSolution();
    } else if(REACTOR.current > REACTOR.target){
      toast('Passou do alvo! Use LIMPAR para tentar de novo.', 'warn');
    }
  };

  function reactorUpdateDisplay(){
    document.getElementById('reactorSum').textContent = REACTOR.current;
    var maxVal = Math.max(REACTOR.target + 4, 20);
    var pct = Math.min(100, REACTOR.current / maxVal * 100);
    document.getElementById('reactorFill').style.width = pct + '%';
    document.getElementById('reactorMarker').style.left = pct + '%';

    var hist = document.getElementById('reactorHistory');
    if(REACTOR.history.length === 0){
      hist.innerHTML = '<div class="reactor-history-empty">Toque nos cristais abaixo para somá-los ↓</div>';
    } else {
      hist.innerHTML = '';
      REACTOR.history.forEach(function(v, i){
        if(i > 0){
          var plus = document.createElement('span');
          plus.className = 'reactor-history-plus';
          plus.textContent = '+';
          hist.appendChild(plus);
        }
        var chip = document.createElement('div');
        chip.className = 'reactor-history-chip';
        chip.innerHTML = v + ' <span class="reactor-history-chip-x" onclick="reactorRemoveAt(' + i + ')">✕</span>';
        hist.appendChild(chip);
      });
      // = total
      var eq = document.createElement('span');
      eq.className = 'reactor-history-plus';
      eq.style.color = REACTOR.current === REACTOR.target ? 'var(--green)' : 'var(--yellow)';
      eq.textContent = '= ' + REACTOR.current;
      hist.appendChild(eq);
    }
  }

  window.reactorRemoveAt = function(idx){
    var v = REACTOR.history[idx];
    REACTOR.history.splice(idx, 1);
    REACTOR.current -= v;
    reactorUpdateDisplay();
  };

  function reactorRegisterSolution(){
    var sig = REACTOR.history.slice().sort(function(a,b){ return a-b; }).join(',');
    var isNew = REACTOR.foundSolutions.indexOf(sig) === -1;
    if(isNew){
      REACTOR.foundSolutions.push(sig);
      ALEX.stats.totalSolutions++;
      var task = REACTOR.tasks[REACTOR.taskIdx];
      var n = REACTOR.foundSolutions.length;
      document.querySelector('#reactorSolFound .acc').textContent = n;

      if(n >= task.minSols){
        toast('🎉 PERFEITO! Você descobriu ' + n + ' combinações. Próxima missão liberada!', 'success');
        document.getElementById('reactorNextBtn').disabled = false;
        setTimeout(reactorNext, 1200);
      } else if(n === 1){
        toast('✓ Combinação registrada! Limpe e tente de outra forma.', 'success');
      } else {
        toast('✓ Combinação ' + n + '! Falta(m) ' + (task.minSols - n) + '.', 'success');
      }

      // Reset automático após 0.9s para permitir nova tentativa
      setTimeout(function(){
        if(REACTOR.current === REACTOR.target){
          reactorReset();
        }
      }, 900);
    } else {
      toast('Você já descobriu essa! Tente uma combinação diferente.', 'info');
      setTimeout(reactorReset, 800);
    }
  }

  window.reactorReset = function(){
    REACTOR.current = 0;
    REACTOR.history = [];
    reactorUpdateDisplay();
  };

  window.reactorNext = function(){
    REACTOR.taskIdx++;
    if(REACTOR.taskIdx < REACTOR.tasks.length){
      reactorBuildStage();
      toast('🚀 Tarefa ' + (REACTOR.taskIdx + 1) + ' iniciada!', 'info');
    } else {
      // Estação concluída
      completeStation('reactor');
      ALEX.sessionActive = false;
      document.getElementById('alexStationStage').innerHTML = ''; // "Fecha" sessão
      dlgStart([
        '<strong>Excelente, Cadete!</strong> Você acabou de descobrir algo que muitos professores tentam ensinar com fórmulas.',
        'A <em>adição é apenas uma maneira de combinar coisas</em>. Não importa se você usa cristais grandes ou pequenos — o resultado é o mesmo.',
        '<span class="acc-green">Esse é o segredo da matemática: existem caminhos diferentes para o mesmo destino.</span>',
        'Continue para a próxima estação. O <strong>Tenente Diff</strong> espera você no Hangar.'
      ], function(){
        document.getElementById('alexTaskBar').style.display = 'none';
        exitAlexStation(); // Retorna automaticamente
      });
    }
  };

  // ═════════════════════════════════════════════════════════════════════════
  // ESTAÇÃO 2: HANGAR DE SUPRIMENTOS (Subtração)
  // Conceito: o usuário tem caixas e precisa "despachar" um certo número.
  // Pode clicar caixas individualmente OU agrupá-las (selecionar várias e
  // despachar de uma vez). A subtração é apresentada como REMOÇÃO VISUAL.
  // ═════════════════════════════════════════════════════════════════════════
  var HANGAR = {
    total: 0, target: 0, remaining: 0,
    selected: 0,
    crates: [],     // ids ainda presentes
    taskIdx: 0,
    tasks: []
  };

  function initHangar(){
    HANGAR.tasks = [
      { total: 12, target: 5,  hint: 'Comece simples. Despache 5 das 12 caixas.' },
      { total: 20, target: 8,  hint: 'Tente selecionar várias antes de despachar.' },
      { total: 25, target: 13, hint: 'Quantas restam? Encontre seu próprio ritmo.' }
    ];
    HANGAR.taskIdx = 0;

    dlgStart([
      'Cadete. <strong>Tenente Diff</strong>, Hangar de Suprimentos.',
      'A subtração é simples: <em>você tinha algo e agora tem menos</em>. Mas como você TIRA — isso é com você.',
      'Veja essas caixas? <strong>Despache</strong> a quantidade que aparecer na tela. Pode tocar uma a uma. Pode <em>selecionar várias e despachar de vez</em>.',
      '<span class="acc-orange">Cada estilo tem seu valor.</span> Quem é cuidadoso, conta uma a uma. Quem tem confiança, manda em grupo.',
      '<strong>Descubra qual é o seu jeito.</strong>'
    ], function(){ ALEX.sessionActive = true; hangarBuildStage(); });
  }

  function hangarBuildStage(){
    var t = HANGAR.tasks[HANGAR.taskIdx];
    HANGAR.total = t.total;
    HANGAR.target = t.target;
    HANGAR.remaining = t.total;
    HANGAR.selected = 0;
    HANGAR.crates = [];
    for(var i=0; i<t.total; i++) HANGAR.crates.push({ id: i, sel: false, gone: false });

    showTaskBar(
      'Despache exatamente <strong>' + t.target + '</strong> caixas. Quantas vão sobrar?',
      HANGAR.taskIdx + 1, HANGAR.tasks.length
    );

    var stage = document.getElementById('alexStationStage');
    stage.innerHTML =
      '<div class="hangar-stage">' +
        '<div class="hangar-counter-row">' +
          '<div class="hangar-counter-block">' +
            '<div class="hangar-counter-label">CAIXAS</div>' +
            '<div class="hangar-counter-value" id="hgTotal">' + t.total + '</div>' +
          '</div>' +
          '<div class="hangar-counter-arrow">−</div>' +
          '<div class="hangar-counter-block">' +
            '<div class="hangar-counter-label">DESPACHAR</div>' +
            '<div class="hangar-counter-value target" id="hgTarget">' + t.target + '</div>' +
          '</div>' +
          '<div class="hangar-counter-arrow">=</div>' +
          '<div class="hangar-counter-block">' +
            '<div class="hangar-counter-label">SOBRAM</div>' +
            '<div class="hangar-counter-value remaining" id="hgRemain">?</div>' +
          '</div>' +
        '</div>' +
        '<div class="hangar-area" id="hgArea"></div>' +
        '<div class="hangar-strategy-tip" id="hgStrategy">Toque nas caixas. Selecione e despache. <em>Você decide o ritmo.</em></div>' +
        '<div class="hangar-controls">' +
          '<button class="alex-action-btn" onclick="hangarDeselect()">DESMARCAR</button>' +
          '<button class="alex-action-btn cyan" id="hgDispatchBtn" onclick="hangarDispatch()" disabled>📤 DESPACHAR <span id="hgDispatchN">0</span></button>' +
        '</div>' +
      '</div>';

    hangarRenderCrates();
    hangarSetupDrag();
  }

  function hangarSetupDrag(){
    var area = document.getElementById('hgArea');
    var isDragging = false;
    var dragMode = null; // 'select' or 'deselect'

    area.onmousedown = function(e){
      if(e.button !== 0) return;
      isDragging = true;
      var el = document.elementFromPoint(e.clientX, e.clientY);
      if(el && el.classList.contains('hangar-crate')){
        dragMode = el.classList.contains('selected') ? 'deselect' : 'select';
      } else {
        dragMode = 'select'; // default if clicking empty space
      }
    };

    window.addEventListener('mousemove', function(e){
      if(!isDragging) return;
      var el = document.elementFromPoint(e.clientX, e.clientY);
      if(el && el.classList.contains('hangar-crate')){
        var id = parseInt(el.dataset.id);
        var c = HANGAR.crates.find(function(x){ return x.id === id; });
        if(c && !c.gone){
          if(dragMode === 'select' && !c.sel){
            c.sel = true;
            el.classList.add('selected');
          } else if(dragMode === 'deselect' && c.sel){
            c.sel = false;
            el.classList.remove('selected');
          }
          // Update counters
          var sel = HANGAR.crates.filter(function(x){return x.sel && !x.gone;}).length;
          var btn = document.getElementById('hgDispatchBtn');
          if(btn){
            document.getElementById('hgDispatchN').textContent = sel;
            btn.disabled = sel === 0;
          }
        }
      }
    });
    window.addEventListener('mouseup', function(){ isDragging = false; dragMode = null; });
  }

  function hangarRenderCrates(){
    var area = document.getElementById('hgArea');
    area.innerHTML = '';
    HANGAR.crates.forEach(function(c){
      if(c.gone) return;
      var el = document.createElement('div');
      el.className = 'hangar-crate' + (c.sel ? ' selected' : '');
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="crate-svg">' +
        '<path d="M21 8L12 13L3 8V16L12 21L21 16V8Z" fill="currentColor" opacity="0.8"/>' +
        '<path d="M12 3L21 8L12 13L3 8L12 3Z" fill="currentColor"/>' +
        '<path d="M12 13V21" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>' +
        '<path d="M21 8L12 13L3 8" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>' +
        '</svg>';
      el.dataset.id = c.id;
      el.onclick = function(){ hangarToggleCrate(c.id); };
      area.appendChild(el);
    });
    // Atualiza contadores
    var sent = HANGAR.total - HANGAR.crates.filter(function(c){return !c.gone;}).length;
    var still = HANGAR.crates.filter(function(c){return !c.gone;}).length;
    document.getElementById('hgTotal').textContent = HANGAR.total;
    if(sent === HANGAR.target){
      document.getElementById('hgRemain').textContent = still;
      document.getElementById('hgRemain').style.color = 'var(--green)';
    } else if(sent > 0){
      // mostra parcial
      document.getElementById('hgRemain').textContent = still + ' (?)';
      document.getElementById('hgRemain').style.color = 'var(--yellow)';
    } else {
      document.getElementById('hgRemain').textContent = '?';
      document.getElementById('hgRemain').style.color = 'var(--cyan)';
    }
    // Selected count + button state
    var sel = HANGAR.crates.filter(function(c){return c.sel && !c.gone;}).length;
    HANGAR.selected = sel;
    var btn = document.getElementById('hgDispatchBtn');
    if(btn){
      document.getElementById('hgDispatchN').textContent = sel;
      btn.disabled = sel === 0;
    }
  }

  window.hangarToggleCrate = function(id){
    var c = HANGAR.crates.find(function(x){ return x.id === id; });
    if(!c || c.gone) return;
    c.sel = !c.sel;
    hangarRenderCrates();
  };

  window.hangarDeselect = function(){
    HANGAR.crates.forEach(function(c){ c.sel = false; });
    hangarRenderCrates();
  };

  window.hangarDispatch = function(){
    var t = HANGAR.tasks[HANGAR.taskIdx];
    var sentNow = HANGAR.crates.filter(function(c){return c.sel && !c.gone;});
    var sentTotal = HANGAR.total - HANGAR.crates.filter(function(c){return !c.gone;}).length;

    // Animação de remoção
    sentNow.forEach(function(c){
      var el = document.querySelector('[data-id="' + c.id + '"]');
      if(el){
        el.classList.add('removing');
        setTimeout(function(){ c.gone = true; c.sel = false; }, 460);
      } else {
        c.gone = true; c.sel = false;
      }
    });

    setTimeout(function(){
      hangarRenderCrates();
      var totalSent = HANGAR.total - HANGAR.crates.filter(function(c){return !c.gone;}).length;
      var remaining = HANGAR.crates.filter(function(c){return !c.gone;}).length;

      if(totalSent === t.target){
        toast('✓ Despachadas exatamente ' + t.target + ' caixas! Sobram <strong>' + remaining + '</strong>.', 'success');
        document.getElementById('hgStrategy').innerHTML = '🎯 Resultado: <strong>' + t.total + ' − ' + t.target + ' = ' + remaining + '</strong>. <em>Próxima missão em alguns segundos…</em>';
        ALEX.stats.totalSolutions++;
        setTimeout(hangarNext, 1800);
      } else if(totalSent > t.target){
        toast('⚠ Você despachou ' + totalSent + ' (precisava de ' + t.target + '). Vou recarregar…', 'warn');
        setTimeout(hangarBuildStage, 1500);
      } else {
        toast('Despachadas: ' + totalSent + ' de ' + t.target + '. Faltam ' + (t.target - totalSent) + '.', 'info');
      }
    }, 500);
  };

  function hangarNext(){
    HANGAR.taskIdx++;
    if(HANGAR.taskIdx < HANGAR.tasks.length){
      hangarBuildStage();
    } else {
      completeStation('hangar');
      ALEX.sessionActive = false;
      document.getElementById('alexStationStage').innerHTML = ''; // "Fecha" sessão
      dlgStart([
        'Cadete, você captou. <strong>Subtrair é remover</strong>. Não é decorar — é <em>tirar de algo o que precisa sair</em>.',
        'Notei como você varia: às vezes uma a uma, às vezes em lotes. <span class="acc-green">Os dois funcionam.</span> Importa o resultado.',
        'A <strong>Engenheira Kaya</strong> espera você no Laboratório. Cuidado com os cristais — são frágeis.'
      ], function(){
        document.getElementById('alexTaskBar').style.display = 'none';
        exitAlexStation(); // Retorna automaticamente
      });
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // ESTAÇÃO 3: LABORATÓRIO DE CRISTAIS (Multiplicação)
  // Conceito: multiplicação como ÁREA / arranjo retangular.
  // O usuário ajusta linhas e colunas; o sistema desenha a grade visualmente.
  // Ele DESCOBRE que 3×4 = 4×3, e que um mesmo total tem várias decomposições.
  // ═════════════════════════════════════════════════════════════════════════
  var LAB = {
    rows: 1, cols: 1,
    target: 0,
    discoveries: [],
    taskIdx: 0,
    tasks: []
  };

  function initLab(){
    LAB.tasks = [
      { target: 12, hint: '12 cristais. 3×4? 4×3? 6×2? Descubra todas as formas.' },
      { target: 18, hint: '18 cristais. Pelo menos 2 decomposições diferentes.' },
      { target: 24, hint: '24 cristais. Tente 4 decomposições — esse número tem muitas!' }
    ];
    LAB.taskIdx = 0;

    dlgStart([
      'Cadete! <strong>Engenheira Kaya</strong>. Adoro cristais. Você vai entender por quê.',
      'Multiplicar é <em>arranjar em retângulos</em>. Não acredita? Veja por si mesmo.',
      'Eu te dou um número. Você precisa <strong>arrumar exatamente esse tanto de cristais</strong> num retângulo.',
      '<span class="acc-orange">Quantas formas diferentes tem 12 cristais?</span> Tente: 3 linhas de 4. Ou 4 linhas de 3. Ou 6 de 2. Ou 2 de 6.',
      'Cada arranjo é <strong>uma multiplicação descoberta</strong>. Não decore — <em>monte e veja</em>.'
    ], function(){ ALEX.sessionActive = true; labBuildStage(); });
  }

  function labBuildStage(){
    var t = LAB.tasks[LAB.taskIdx];
    LAB.target = t.target;
    LAB.rows = 1; LAB.cols = 1;
    LAB.discoveries = [];

    showTaskBar(
      'Sintetize exatamente <strong>' + t.target + '</strong> cristais. Encontre <strong>2+</strong> arranjos diferentes.',
      LAB.taskIdx + 1, LAB.tasks.length
    );

    var stage = document.getElementById('alexStationStage');
    stage.innerHTML =
      '<div class="lab-stage">' +
        '<div class="lab-target-display">' +
          '<div class="lab-target-label">▼ ALVO ▼</div>' +
          '<div class="lab-target-value">' + t.target + ' CRISTAIS</div>' +
        '</div>' +
        '<div class="lab-eq-display" id="labEq"></div>' +
        '<div class="lab-controls-row">' +
          '<div class="lab-dim-control">' +
            '<span class="lab-dim-label">LINHAS</span>' +
            '<button class="lab-dim-btn" onclick="labAdj(\'r\',-1)">−</button>' +
            '<span class="lab-dim-value" id="labRows">1</span>' +
            '<button class="lab-dim-btn" onclick="labAdj(\'r\',1)">+</button>' +
          '</div>' +
          '<div class="lab-dim-control">' +
            '<span class="lab-dim-label">COLUNAS</span>' +
            '<button class="lab-dim-btn" onclick="labAdj(\'c\',-1)">−</button>' +
            '<span class="lab-dim-value" id="labCols">1</span>' +
            '<button class="lab-dim-btn" onclick="labAdj(\'c\',1)">+</button>' +
          '</div>' +
        '</div>' +
        '<div class="lab-grid-area"><div class="lab-grid" id="labGrid"></div></div>' +
        '<div class="lab-discoveries">' +
          '<div class="lab-discoveries-title">▼ ARRANJOS DESCOBERTOS ▼</div>' +
          '<div class="lab-discoveries-chips" id="labDiscChips"><span style="color:var(--text-dim);font-family:Exo 2;font-size:11px;font-style:italic;">Nenhum ainda. Mexa nas linhas e colunas até bater no alvo.</span></div>' +
        '</div>' +
        '<div class="lab-controls">' +
          '<button class="alex-action-btn green" onclick="labSubmit()" id="labSubmitBtn">REGISTRAR ARRANJO</button>' +
          '<button class="alex-action-btn cyan" onclick="labNext()" disabled id="labNextBtn">PRÓXIMA ▶</button>' +
        '</div>' +
      '</div>';

    labRender();
  }

  function labRender(){
    var grid = document.getElementById('labGrid');
    grid.style.gridTemplateColumns = 'repeat(' + LAB.cols + ', 30px)';
    grid.innerHTML = '';
    var icons = ['💎','🔷','💠','🔵','🟣'];
    var icon = icons[LAB.taskIdx % icons.length];
    for(var i=0; i < LAB.rows * LAB.cols; i++){
      var c = document.createElement('div');
      c.className = 'lab-cell';
      c.style.animationDelay = (i * 12) + 'ms';
      c.textContent = icon;
      grid.appendChild(c);
    }
    document.getElementById('labRows').textContent = LAB.rows;
    document.getElementById('labCols').textContent = LAB.cols;
    var total = LAB.rows * LAB.cols;
    var matchClass = (total === LAB.target) ? ' match' : '';
    document.getElementById('labEq').innerHTML =
      '<span class="l-num">' + LAB.rows + '</span> <span class="l-eq">×</span> ' +
      '<span class="l-num">' + LAB.cols + '</span> <span class="l-eq">=</span> ' +
      '<span class="l-res' + matchClass + '">' + total + '</span>';

    document.getElementById('labSubmitBtn').disabled = (total !== LAB.target);
  }

  window.labAdj = function(dim, delta){
    if(dim === 'r') LAB.rows = Math.max(1, Math.min(20, LAB.rows + delta));
    if(dim === 'c') LAB.cols = Math.max(1, Math.min(20, LAB.cols + delta));
    labRender();
  };

  window.labSubmit = function(){
    if(LAB.rows * LAB.cols !== LAB.target){ return; }
    // Verifica se é arranjo distinto (3×4 e 4×3 são considerados distintos para celebrar comutatividade!)
    var sig = LAB.rows + 'x' + LAB.cols;
    if(LAB.discoveries.indexOf(sig) !== -1){
      toast('Esse arranjo você já registrou! Tente outras dimensões.', 'info');
      return;
    }
    LAB.discoveries.push(sig);
    ALEX.stats.totalSolutions++;

    // mensagem especial se descobrir comutatividade (a×b e b×a)
    var commPair = LAB.cols + 'x' + LAB.rows;
    var isComm = (LAB.rows !== LAB.cols) && LAB.discoveries.indexOf(commPair) !== -1;
    if(isComm){
      ALEX.stats.bonusInsights++;
      toast('🔥 INSIGHT! ' + LAB.rows + '×' + LAB.cols + ' = ' + LAB.cols + '×' + LAB.rows + '. <strong>Os dois dão ' + LAB.target + '!</strong>', 'success');
    } else if(LAB.rows === LAB.cols){
      toast('✓ Quadrado perfeito! ' + LAB.rows + '² = ' + LAB.target + '.', 'success');
    } else {
      toast('✓ Arranjo registrado: ' + LAB.rows + '×' + LAB.cols + ' = ' + LAB.target + '.', 'success');
    }

    // Atualiza chips
    var box = document.getElementById('labDiscChips');
    box.innerHTML = '';
    LAB.discoveries.forEach(function(s){
      var parts = s.split('x');
      var chip = document.createElement('div');
      chip.className = 'lab-disc-chip';
      chip.textContent = parts[0] + '×' + parts[1] + '=' + LAB.target;
      box.appendChild(chip);
    });

    if(LAB.discoveries.length >= 2){
      document.getElementById('labNextBtn').disabled = false;
      setTimeout(labNext, 1200); // Auto-next para Lab
    }
  };

  window.labNext = function(){
    LAB.taskIdx++;
    if(LAB.taskIdx < LAB.tasks.length){
      labBuildStage();
    } else {
      completeStation('lab');
      ALEX.sessionActive = false;
      document.getElementById('alexStationStage').innerHTML = '';
      document.getElementById('alexTaskBar').style.display = 'none';

      dlgStart([
        'Cadete! Você notou? <strong>3×4 e 4×3 dão o mesmo resultado.</strong> Isso tem nome: <em>comutatividade</em>.',
        'Mas o que importa não é o nome. É que você <span class="acc-green">descobriu por si mesmo</span> — não decorou.',
        'A multiplicação <strong>é uma forma de organizar coisas em retângulos</strong>. Sempre que vir uma, pense no retângulo.',
        'Vá ao <strong>Capitão Pyx</strong>, na Estação de Comunicação. Ele tem antenas para distribuir.'
      ], function(){
        exitAlexStation(); // Retorna automaticamente
      });
    }
  };
  // ═════════════════════════════════════════════════════════════════════════
  // ESTAÇÃO 4: ESTAÇÃO DE COMUNICAÇÃO (Divisão)
  // Conceito: divisão como DISTRIBUIÇÃO IGUAL. O usuário tem antenas e
  // colônias e clica nas colônias para distribuir uma a uma. Pode tentar
  // distribuição igual ou desigual e VER o que acontece (resto, sobra).
  // ═════════════════════════════════════════════════════════════════════════
  var COMMS = {
    total: 0, colonies: 0,
    placed: [],   // contagem por colônia
    taskIdx: 0,
    tasks: [],
    colonyNames: [
      { icon: '🌑', name: 'CRATERA-A' },
      { icon: '🌑', name: 'CRATERA-B' },
      { icon: '🌑', name: 'CRATERA-C' },
      { icon: '🌑', name: 'CRATERA-D' },
      { icon: '🌑', name: 'CRATERA-E' },
      { icon: '🌑', name: 'CRATERA-F' }
    ]
  };

  function initComms(){
    COMMS.tasks = [
      { total: 12, colonies: 3 },
      { total: 15, colonies: 5 },
      { total: 17, colonies: 4 }   // resto não-zero — celebrar!
    ];
    COMMS.taskIdx = 0;

    dlgStart([
      'Cadete. <strong>Capitão Pyx</strong>, Comunicações.',
      'Dividir é <em>repartir igualmente</em>. Pelo menos é o que tentamos.',
      'Cada colônia da Lua precisa de antenas. Você tem um <strong>estoque</strong> e <strong>colônias</strong> para abastecer.',
      '<span class="acc-orange">Quantas vão para cada uma?</span> Você decide. Mas se a divisão der <em>resto</em>, o sistema mostrará — e isso também é matemática.',
      'Toque uma colônia para enviar uma antena. Continue até esvaziar o estoque ou achar a divisão certa.'
    ], function(){ ALEX.sessionActive = true; commsBuildStage(); });
  }

  function commsBuildStage(){
    var t = COMMS.tasks[COMMS.taskIdx];
    COMMS.total = t.total;
    COMMS.colonies = t.colonies;
    COMMS.placed = [];
    for(var i=0; i<t.colonies; i++) COMMS.placed.push(0);

    var quotient = Math.floor(t.total / t.colonies);
    var rest = t.total % t.colonies;

    showTaskBar(
      'Distribua <strong>' + t.total + '</strong> antenas entre <strong>' + t.colonies + '</strong> colônias o mais <em>igualmente</em> possível.',
      COMMS.taskIdx + 1, COMMS.tasks.length
    );

    var stage = document.getElementById('alexStationStage');
    var infoBlocks =
      '<div class="comms-info-block">' +
        '<div class="comms-info-label">EM ESTOQUE</div>' +
        '<div class="comms-info-value" id="commsLeft">' + t.total + '</div>' +
      '</div>' +
      '<div class="comms-info-block">' +
        '<div class="comms-info-label">DIVIDIR POR</div>' +
        '<div class="comms-info-value left">' + t.colonies + '</div>' +
      '</div>' +
      '<div class="comms-info-block">' +
        '<div class="comms-info-label">ALVO P/ COL.</div>' +
        '<div class="comms-info-value each">' + quotient + (rest > 0 ? '+' : '') + '</div>' +
      '</div>' +
      (rest > 0 ?
        '<div class="comms-info-block">' +
          '<div class="comms-info-label">RESTO</div>' +
          '<div class="comms-info-value rest">' + rest + '</div>' +
        '</div>' : '');

    var coloniesHtml = '';
    for(var i=0; i<t.colonies; i++){
      var c = COMMS.colonyNames[i] || { icon: '🌑', name: 'COL-' + (i+1) };
      coloniesHtml +=
        '<div class="comms-colony" id="commsCol' + i + '" onclick="commsPlace(' + i + ')">' +
          '<div class="comms-colony-icon">' + c.icon + '</div>' +
          '<div class="comms-colony-name">' + c.name + '</div>' +
          '<div class="comms-colony-count" id="commsColCount' + i + '">0</div>' +
          '<div class="comms-colony-antennas" id="commsColAnt' + i + '"></div>' +
        '</div>';
    }

    stage.innerHTML =
      '<div class="comms-stage">' +
        '<div class="comms-info-row">' + infoBlocks + '</div>' +
        '<div class="comms-stockpile">' +
          '<div class="comms-stockpile-title">▼ ESTOQUE DE ANTENAS ▼</div>' +
          '<div class="comms-stockpile-grid" id="commsStockpile"></div>' +
        '</div>' +
        '<div class="comms-colonies">' + coloniesHtml + '</div>' +
        '<div class="comms-controls">' +
          '<button class="alex-action-btn" onclick="commsReset()">REINICIAR</button>' +
          '<button class="alex-action-btn cyan" onclick="commsAuto()" id="commsAutoBtn">🤖 DISTRIBUIR EQUITATIVO</button>' +
          '<button class="alex-action-btn green" onclick="commsNext()" disabled id="commsNextBtn">PRÓXIMA ▶</button>' +
        '</div>' +
      '</div>';

    commsRenderStock();
    commsCheckEqual();
  }

  function commsRenderStock(){
    var box = document.getElementById('commsStockpile');
    if(!box) return;
    var placedSum = COMMS.placed.reduce(function(a,b){return a+b;}, 0);
    var left = COMMS.total - placedSum;
    box.innerHTML = '';
    for(var i=0; i<left; i++){
      var a = document.createElement('div');
      a.className = 'comms-antenna';
      box.appendChild(a);
    }
    if(left === 0){
      box.innerHTML = '<div style="color:var(--text-dim);font-family:Exo 2;font-size:12px;font-style:italic;">Estoque vazio.</div>';
    }
    document.getElementById('commsLeft').textContent = left;
  }

  window.commsPlace = function(idx){
    var placedSum = COMMS.placed.reduce(function(a,b){return a+b;}, 0);
    if(placedSum >= COMMS.total){
      toast('Estoque vazio! Use REINICIAR ou avance.', 'info');
      return;
    }
    COMMS.placed[idx]++;
    // anima uma antena saindo do estoque
    var stock = document.getElementById('commsStockpile');
    var ants = stock.querySelectorAll('.comms-antenna');
    if(ants.length){
      var last = ants[ants.length - 1];
      last.classList.add('placing');
      setTimeout(function(){ commsRenderStock(); }, 380);
    } else {
      commsRenderStock();
    }
    // Atualiza colônia
    var colCount = document.getElementById('commsColCount' + idx);
    var colAnt = document.getElementById('commsColAnt' + idx);
    colCount.textContent = COMMS.placed[idx];
    var s = '';
    for(var k=0; k<COMMS.placed[idx]; k++) s += '<span>📡</span>';
    colAnt.innerHTML = s;

    commsCheckEqual();
  };

  function commsCheckEqual(){
    var t = COMMS.tasks[COMMS.taskIdx];
    var quotient = Math.floor(t.total / t.colonies);
    var rest = t.total % t.colonies;
    var placedSum = COMMS.placed.reduce(function(a,b){return a+b;}, 0);

    // Marca colônias com contagem exata em verde
    for(var i=0; i<t.colonies; i++){
      var col = document.getElementById('commsCol' + i);
      if(!col) continue;
      // "alvo aceitável" — quotient ou quotient+1 (até esgotar resto)
      var ok = (COMMS.placed[i] === quotient || COMMS.placed[i] === quotient + 1);
      col.classList.toggle('equal', ok && placedSum === t.total);
    }

    // Critério de sucesso: estoque vazio E divisão respeita quociente/resto
    if(placedSum === t.total){
      var counts = COMMS.placed.slice().sort();
      var minCount = counts[0];
      var maxCount = counts[counts.length - 1];

      if(rest === 0 && minCount === maxCount){
        // divisão exata perfeita
        toast('🎯 Divisão exata! ' + t.total + ' ÷ ' + t.colonies + ' = <strong>' + quotient + '</strong>. Cada colônia ficou com ' + quotient + '.', 'success');
        ALEX.stats.totalSolutions++;
        document.getElementById('commsNextBtn').disabled = false;
        setTimeout(commsNext, 1200);
      } else if(rest > 0 && (maxCount === quotient + 1) && (minCount === quotient)){
        // divisão com resto bem distribuída
        toast('🎯 Divisão com resto! ' + t.total + ' ÷ ' + t.colonies + ' = <strong>' + quotient + '</strong> + resto <strong>' + rest + '</strong>. Algumas colônias ficaram com 1 a mais.', 'success');
        ALEX.stats.totalSolutions++;
        document.getElementById('commsNextBtn').disabled = false;
        setTimeout(commsNext, 1200);
      } else {
        toast('Estoque acabou, mas a distribuição não está equilibrada. Use REINICIAR.', 'warn');
      }
    }
  }

  window.commsAuto = function(){
    var t = COMMS.tasks[COMMS.taskIdx];
    commsReset();
    var q = Math.floor(t.total / t.colonies);
    var r = t.total % t.colonies;
    var i = 0;
    var step = function(){
      var placedSum = COMMS.placed.reduce(function(a,b){return a+b;}, 0);
      if(placedSum >= t.total) return;
      var idx = i % t.colonies;
      var maxForThis = q + (idx < r ? 1 : 0);
      if(COMMS.placed[idx] < maxForThis){
        commsPlace(idx);
      }
      i++;
      if(placedSum < t.total) setTimeout(step, 200);
    };
    step();
  };

  window.commsReset = function(){
    var t = COMMS.tasks[COMMS.taskIdx];
    for(var i=0; i<t.colonies; i++){
      COMMS.placed[i] = 0;
      var c = document.getElementById('commsColCount' + i);
      var a = document.getElementById('commsColAnt' + i);
      if(c) c.textContent = '0';
      if(a) a.innerHTML = '';
      var col = document.getElementById('commsCol' + i);
      if(col) col.classList.remove('equal');
    }
    commsRenderStock();
    document.getElementById('commsNextBtn').disabled = true;
  };

  window.commsNext = function(){
    COMMS.taskIdx++;
    if(COMMS.taskIdx < COMMS.tasks.length){
      commsBuildStage();
    } else {
      completeStation('comms');
      ALEX.sessionActive = false;
      document.getElementById('alexStationStage').innerHTML = ''; // "Fecha" sessão
      dlgStart([
        'Cadete, esse último teve <strong>resto</strong>. Notou? 17 ÷ 4 = 4 com resto 1.',
        'A divisão nem sempre é exata. <em>Às vezes sobra. Às vezes falta. E está tudo bem.</em>',
        'O que você descobriu vale para qualquer divisão na vida — <span class="acc-green">repartir é dar a cada um o mesmo, mas o que sobra é parte da resposta também</span>.',
        'Apenas a Comandante Vega te espera agora. Sala de Treinamento. <strong>É o último teste.</strong>'
      ], function(){
        document.getElementById('alexTaskBar').style.display = 'none';
        exitAlexStation(); // Retorna automaticamente
      });
    }
  };

  // ═════════════════════════════════════════════════════════════════════════
  // ESTAÇÃO 5: SALA DE TREINAMENTO (Sandbox / Síntese)
  // Conceito: dado um alvo, o usuário CONSTRÓI uma expressão matemática livre
  // usando os dígitos e operadores. Aceita qualquer expressão válida que
  // resulte no alvo. Quanto MAIS DIFERENTES respostas, mais alta a patente.
  // ═════════════════════════════════════════════════════════════════════════
  var TRAIN = {
    target: 0,
    expr: '',           // a expressão sendo construída
    solutions: [],      // expressões válidas únicas já encontradas
    taskIdx: 0,
    tasks: []
  };

  function initTraining(){
    TRAIN.tasks = [
      { target: 12, minSols: 2, hint: '12 — soma, multiplicação, divisão... várias maneiras.' },
      { target: 24, minSols: 3, hint: '24 — número rico em formas. 3+ caminhos.' },
      { target: 36, minSols: 3, hint: '36 — desafio final. 3 caminhos diferentes.' }
    ];
    TRAIN.taskIdx = 0;

    dlgStart([
      'Cadete. Sou a <strong>Comandante Vega</strong>. Esse é o teste final.',
      'Você vai ver um número. Sua tarefa é <em>construir expressões matemáticas</em> que cheguem nele.',
      'Use <strong>números, operadores, parênteses</strong>. <span class="acc-orange">Não há resposta única.</span>',
      'Quanto mais maneiras DIFERENTES você encontrar, <em>mais alta sua patente</em>.',
      '<strong>Soldado</strong> = 1 solução. <strong>Cabo</strong> = 2. <strong>Sargento</strong> = 3+. <strong>Capitão</strong> = 5+.',
      'Pronto, Cadete? <span class="acc-green">Mostre o que aprendeu.</span>'
    ], function(){ ALEX.sessionActive = true; trainingBuildStage(); });
  }

  function trainingBuildStage(){
    var t = TRAIN.tasks[TRAIN.taskIdx];
    TRAIN.target = t.target;
    TRAIN.expr = '';
    TRAIN.solutions = [];

    showTaskBar(
      'Construa expressões que resultem em <strong>' + t.target + '</strong>. Mínimo: <strong>' + t.minSols + '</strong>.',
      TRAIN.taskIdx + 1, TRAIN.tasks.length
    );

    var stage = document.getElementById('alexStationStage');
    var keypad = '';
    keypad += '<button class="training-key op" onclick="trainingKey(\'+\')">+</button>';
    keypad += '<button class="training-key op" onclick="trainingKey(\'-\')">-</button>';
    keypad += '<button class="training-key op" onclick="trainingKey(\'*\')">×</button>';
    keypad += '<button class="training-key op" onclick="trainingKey(\'/\')">÷</button>';
    keypad += '<button class="training-key" onclick="trainingKey(\'' + 7 + '\')">' + 7 + '</button>';
    keypad += '<button class="training-key" onclick="trainingKey(\'' + 8 + '\')">' + 8 + '</button>';
    keypad += '<button class="training-key" onclick="trainingKey(\'' + 9 + '\')">' + 9 + '</button>';
    keypad += '<button class="training-key special" onclick="trainingClear()">CLR</button>';
    keypad += '<button class="training-key" onclick="trainingKey(\'' + 4 + '\')">' + 4 + '</button>';
    keypad += '<button class="training-key" onclick="trainingKey(\'' + 5 + '\')">' + 5 + '</button>';
    keypad += '<button class="training-key" onclick="trainingKey(\'' + 6 + '\')">' + 6 + '</button>';
    keypad += '<button class="training-key special" onclick="trainingBack()">⌫</button>';
    keypad += '<button class="training-key" onclick="trainingKey(\'' + 1 + '\')">' + 1 + '</button>';
    keypad += '<button class="training-key" onclick="trainingKey(\'' + 2 + '\')">' + 2 + '</button>';
    keypad += '<button class="training-key" onclick="trainingKey(\'' + 3 + '\')">' + 3 + '</button>';
    keypad += '<button class="training-key zero" onclick="trainingKey(\'' + 0 + '\')">' + 0 + '</button>';
    keypad += '<button class="training-key enter" onclick="trainingTest()">Enter</button>';
    // o último vazio para alinhar grade 5xN

    stage.innerHTML =
      '<div class="training-stage">' +
        '<div class="training-target-display">' +
          '<div class="training-target-label">▼ ALVO ▼</div>' +
          '<div class="training-target-value">' + TRAIN.target + '</div>' +
        '</div>' +
        '<div class="training-equation-display" id="trainEq">' +
          '<span class="training-eq-empty">Digite uma expressão. Ex: 6+6, 4×3, 24÷2…</span>' +
        '</div>' +
        '<div class="training-keypad">' + keypad + '</div>' +
        '<div class="training-rank" id="trainRank">PATENTE ATUAL: <span class="num">CADETE</span> — 0 SOLUÇÕES</div>' +
        '<div class="training-solutions">' +
          '<div class="training-sol-title">▼ SOLUÇÕES VÁLIDAS DESCOBERTAS ▼</div>' +
          '<div class="training-sol-chips" id="trainSolChips"><span style="color:var(--text-dim);font-family:Exo 2;font-size:11px;font-style:italic;">Nenhuma ainda. Construa uma expressão e toque TESTAR.</span></div>' +
        '</div>' +
        '<div class="training-controls">' +
          '<button class="alex-action-btn cyan" onclick="trainingTest()">TESTAR EXPRESSÃO</button>' +
          '<button class="alex-action-btn green" onclick="trainingNext()" disabled id="trainNextBtn">PRÓXIMA ▶</button>' +
        '</div>' +
      '</div>';
  }

  window.trainingKey = function(k){
    TRAIN.expr += k;
    trainingRender();
  };
  window.trainingBack = function(){
    TRAIN.expr = TRAIN.expr.slice(0, -1);
    trainingRender();
  };
  window.trainingClear = function(){
    TRAIN.expr = '';
    trainingRender();
  };

  function trainingRender(){
    var box = document.getElementById('trainEq');
    if(!box) return;
    if(TRAIN.expr === ''){
      box.innerHTML = '<span class="training-eq-empty">Digite uma expressão. Ex: 6+6, 4×3, 24÷2…</span>';
      return;
    }
    // Mostra com símbolos amigáveis
    var pretty = TRAIN.expr
      .replace(/\*/g, '×')
      .replace(/\//g, '÷')
      .replace(/-/g, '−');
    // Tenta avaliar SEGURAMENTE (somente dígitos e + - * / ( ))
    var preview = '';
    try {
      if(/^[\d+\-*/() ]+$/.test(TRAIN.expr) && TRAIN.expr.length > 0){
        var v = Function('"use strict"; return (' + TRAIN.expr + ');')();
        if(typeof v === 'number' && isFinite(v)){
          var matchClass = (Math.abs(v - TRAIN.target) < 1e-9) ? ' match' : ' no';
          preview = ' <span class="training-eq-result' + matchClass + '">= ' + (Number.isInteger(v) ? v : v.toFixed(2)) + '</span>';
        }
      }
    } catch(e){
      preview = ' <span class="training-eq-result no">= ?</span>';
    }
    box.innerHTML = '<span class="training-eq-token">' + pretty + '</span>' + preview;
  }

  window.trainingTest = function(){
    if(TRAIN.expr === ''){
      toast('Digite uma expressão antes!', 'warn'); return;
    }
    if(!/^[\d+\-*/() ]+$/.test(TRAIN.expr)){
      toast('⚠ Expressão inválida.', 'error'); return;
    }
    if(!/[\+\-\*\/]/.test(TRAIN.expr)){
      toast('⚠ Use pelo menos uma operação na expressão!', 'warn'); return;
    }
    var v;
    try {
      v = Function('"use strict"; return (' + TRAIN.expr + ');')();
    } catch(e){
      toast('⚠ Expressão mal-formada. Verifique parênteses.', 'error'); return;
    }
    if(typeof v !== 'number' || !isFinite(v)){
      toast('⚠ Resultado inválido (talvez divisão por zero?).', 'error'); return;
    }
    if(Math.abs(v - TRAIN.target) > 1e-9){
      toast('= ' + (Number.isInteger(v) ? v : v.toFixed(2)) + '. Não chegou em ' + TRAIN.target + '. Tente outra!', 'info');
      return;
    }
    // Solução válida! Verificar se é "essencialmente nova"
    var canonical = TRAIN.expr.replace(/\s+/g, '');
    if(TRAIN.solutions.indexOf(canonical) !== -1){
      toast('Você já registrou essa expressão exata. Tente uma diferente!', 'info');
      return;
    }
    // verifica também por "operação principal" — para premiar variedade
    TRAIN.solutions.push(canonical);
    ALEX.stats.totalSolutions++;
    var n = TRAIN.solutions.length;
    var t = TRAIN.tasks[TRAIN.taskIdx];

    // Atualiza chips
    var chips = document.getElementById('trainSolChips');
    chips.innerHTML = '';
    TRAIN.solutions.forEach(function(s){
      var c = document.createElement('div');
      c.className = 'training-sol-chip';
      c.textContent = s.replace(/\*/g, '×').replace(/\//g, '÷').replace(/-/g, '−') + ' = ' + TRAIN.target;
      chips.appendChild(c);
    });

    // Patente
    var rank = 'CADETE'; var rankColor = 'var(--text-dim)';
    if(n >= 5){ rank = 'CAPITÃO'; rankColor = 'var(--yellow)'; }
    else if(n >= 3){ rank = 'SARGENTO'; rankColor = 'var(--green)'; }
    else if(n >= 2){ rank = 'CABO'; rankColor = 'var(--cyan)'; }
    else if(n >= 1){ rank = 'SOLDADO'; rankColor = 'var(--orange)'; }
    var rkEl = document.getElementById('trainRank');
    rkEl.innerHTML = 'PATENTE ATUAL: <span class="num" style="color:' + rankColor + '">' + rank + '</span> — ' + n + ' SOLUÇÃO' + (n !== 1 ? 'ÕES' : '');

    if(n === 1){ toast('🎯 PRIMEIRA SOLUÇÃO! Patente: SOLDADO.', 'success'); }
    else if(n === t.minSols){
      toast('🌟 Você atingiu o mínimo necessário! Avançando...', 'success');
      document.getElementById('trainNextBtn').disabled = false;
      setTimeout(trainingNext, 1200);
    }
    else if(n > t.minSols){ toast('+1! Total: ' + n + '. Patente: ' + rank + '.', 'success'); }
    else { toast('+1! Total: ' + n + '. Faltam ' + (t.minSols - n) + ' p/ avançar.', 'success'); }

    TRAIN.expr = '';
    trainingRender();
  };

  window.trainingNext = function(){
    TRAIN.taskIdx++;
    if(TRAIN.taskIdx < TRAIN.tasks.length){
      trainingBuildStage();
    } else {
      completeStation('training');
      ALEX.sessionActive = false;
      document.getElementById('alexStationStage').innerHTML = ''; // "Fecha" sessão
      dlgStart([
        'Cadete… <strong>você passou em todos os treinamentos</strong>.',
        'Mas sabe o que mais me impressionou? <em>Você nunca usou a mesma resposta duas vezes</em>.',
        'A matemática não é uma só coisa. <span class="acc-green">É uma ferramenta com mil formas.</span> E você sabe usá-las.',
        '<strong>Está pronto.</strong> Volte ao mapa. Sua cerimônia está esperando.',
        'A partir de hoje, ninguém mais vai te chamar de Cadete.'
      ], function(){
        document.getElementById('alexTaskBar').style.display = 'none';
        exitAlexStation(); // Retorna automaticamente
      });
    }
  };

  // ═════════════════════════════════════════════════════════════════════════
  // ESTAÇÃO 6: ESTAÇÃO DE FRAGMENTAÇÃO (Frações)
  // ═════════════════════════════════════════════════════════════════════════
  var FRACTIONS = {
    totalParts: 4, selectedParts: 0, target: { num: 1, den: 2 },
    taskIdx: 0,
    tasks: [
      { num: 1, den: 2, parts: 4, hint: 'Metade de 4 partes. Pinte 2.' },
      { num: 3, den: 4, parts: 8, hint: '3/4 de 8. Divida 8 em 4 e pegue 3 partes.' },
      { num: 2, den: 3, parts: 6, hint: '2/3 de 6 cristais.' }
    ]
  };

  function initFractions(){
    FRACTIONS.taskIdx = 0;
    dlgStart([
      'Bem-vindo! Sou a <strong>Sargenta Ratio</strong>.',
      'Aqui trabalhamos com pedaços. Um cristal quebrado ainda tem sua proporção de energia.',
      'Sua missão é <strong>pintar a fração exata</strong> pedida no painel circular.',
      'O de baixo diz em quanto dividimos. O de cima diz quantos pegamos.'
    ], function(){ ALEX.sessionActive = true; fractionsBuildStage(); });
  }

  function fractionsBuildStage(){
    var t = FRACTIONS.tasks[FRACTIONS.taskIdx];
    FRACTIONS.target = { num: t.num, den: t.den };
    FRACTIONS.totalParts = t.parts;
    FRACTIONS.selectedParts = 0;
    showTaskBar('Pinte <strong>' + t.num + '/' + t.den + '</strong> das ' + t.parts + ' partes.', FRACTIONS.taskIdx+1, FRACTIONS.tasks.length);
    var stage = document.getElementById('alexStationStage');
    stage.innerHTML = '<div class="fractions-stage">' +
      '<div class="fractions-display"><div class="fractions-target"><span class="num">' + t.num + '</span><span class="bar"></span><span class="den">' + t.den + '</span></div>' +
      '<div class="fractions-desc">de ' + t.parts + ' partes = <span id="fractCount">0</span> partes</div></div>' +
      '<div class="fractions-circle-wrap"><div class="fractions-circle" id="fractCircle"></div></div>' +
      '<div class="fractions-controls"><button class="alex-action-btn" onclick="fractionsReset()">LIMPAR</button>' +
      '<button class="alex-action-btn green" onclick="fractionsCheck()">VERIFICAR</button></div></div>';
    fractionsRender();
  }

  function fractionsRender(){
    var circle = document.getElementById('fractCircle'); 
    circle.innerHTML = '';
    var n = FRACTIONS.totalParts;
    
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 200 200");
    svg.style.width = "100%";
    svg.style.height = "100%";
    
    var centerX = 100, centerY = 100, radius = 98;
    
    for(var i=0; i<n; i++){
      var angleStep = 360 / n;
      var startDeg = i * angleStep - 90;
      var endDeg = (i + 1) * angleStep - 90;
      
      var startRad = startDeg * Math.PI / 180;
      var endRad = endDeg * Math.PI / 180;
      
      var x1 = centerX + radius * Math.cos(startRad);
      var y1 = centerY + radius * Math.sin(startRad);
      var x2 = centerX + radius * Math.cos(endRad);
      var y2 = centerY + radius * Math.sin(endRad);
      
      var largeArc = angleStep > 180 ? 1 : 0;
      var d = [
        "M", centerX, centerY,
        "L", x1, y1,
        "A", radius, radius, 0, largeArc, 1, x2, y2,
        "Z"
      ].join(" ");
      
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "fractions-slice-svg");
      path.dataset.idx = i;
      
      path.onclick = (function(idx){ 
        return function(){ fractionsToggle(idx); }; 
      })(i);
      
      svg.appendChild(path);
    }
    circle.appendChild(svg);
  }

  window.fractionsToggle = function(idx){
    var path = document.querySelector('.fractions-slice-svg[data-idx="' + idx + '"]');
    if(!path) return;
    if(path.classList.contains('selected')){ 
      path.classList.remove('selected'); 
      FRACTIONS.selectedParts--; 
    } else { 
      path.classList.add('selected'); 
      FRACTIONS.selectedParts++; 
    }
    document.getElementById('fractCount').textContent = FRACTIONS.selectedParts;
  };

  window.fractionsReset = function(){
    document.querySelectorAll('.fractions-slice-svg').forEach(function(s){ 
      s.classList.remove('selected'); 
    });
    FRACTIONS.selectedParts = 0;
    document.getElementById('fractCount').textContent = '0';
  };

  window.fractionsCheck = function(){
    if(FRACTIONS.selectedParts === (FRACTIONS.target.num / FRACTIONS.target.den) * FRACTIONS.totalParts){
      toast('🎉 EXATO!', 'success'); ALEX.stats.totalSolutions++; setTimeout(fractionsNext, 1200);
    } else { toast('Fração incorreta. Tente pensar na proporção.', 'warn'); }
  };

  function fractionsNext(){
    FRACTIONS.taskIdx++;
    if(FRACTIONS.taskIdx < FRACTIONS.tasks.length) fractionsBuildStage();
    else { completeStation('fractions'); ALEX.sessionActive = false; exitAlexStation(); }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // ESTAÇÃO 7: NÚCLEOS DE POLARIDADE (Inteiros)
  // ═════════════════════════════════════════════════════════════════════════
  var INTEGERS = {
    balance: 0, target: 0,
    taskIdx: 0,
    tasks: [
      { target: -3, hint: 'Carga negativa. Adicione íons vermelhos.' },
      { target: 2,  hint: 'Equilibre para chegar em +2. Neutros se anulam.' },
      { target: 0,  hint: 'Esvazie o núcleo (Zero Real).' }
    ]
  };

  function initIntegers(){
    INTEGERS.taskIdx = 0;
    dlgStart([
      'Eu sou o <strong>Engenheiro Ion</strong>.',
      'No espaço, tudo tem carga. O <strong>positivo (+)</strong> e o <strong>negativo (-)</strong> se combatem.',
      'Sua tarefa é equilibrar o núcleo para chegar na carga exata que eu pedir.',
      'Adicione íons azuis (+) ou vermelhos (-). Lembre-se: <span class="acc-orange">um de cada se anula</span>.'
    ], function(){ ALEX.sessionActive = true; integersBuildStage(); });
  }

  function integersBuildStage(){
    var t = INTEGERS.tasks[INTEGERS.taskIdx];
    INTEGERS.balance = 0;
    INTEGERS.target = t.target;
    showTaskBar('Atinja a carga <strong>' + (t.target > 0 ? '+' : '') + t.target + '</strong>.', INTEGERS.taskIdx+1, INTEGERS.tasks.length);
    var stage = document.getElementById('alexStationStage');
    stage.innerHTML = '<div class="integers-stage">' +
      '<div class="integers-display"><div class="integers-target-label">ALVO: ' + (t.target > 0 ? '+' : '') + t.target + '</div>' +
      '<div class="integers-current" id="intBalance">Carga: 0</div></div>' +
      '<div class="integers-core" id="intCore"></div>' +
      '<div class="integers-controls">' +
        '<button class="alex-action-btn" onclick="integersAdd(-1)" style="border-color:var(--red);color:var(--red);">(-) ION NEGATIVO</button>' +
        '<button class="alex-action-btn" onclick="integersAdd(1)" style="border-color:var(--cyan);color:var(--cyan);">(+) ION POSITIVO</button>' +
        '<button class="alex-action-btn green" onclick="integersCheck()">EQUILIBRAR</button>' +
      '</div></div>';
  }

  window.integersAdd = function(v){
    INTEGERS.balance += v;
    var core = document.getElementById('intCore');
    var ion = document.createElement('div');
    ion.className = 'integer-ion ' + (v > 0 ? 'pos' : 'neg');
    ion.textContent = v > 0 ? '+' : '−';
    core.appendChild(ion);
    document.getElementById('intBalance').textContent = 'Carga: ' + (INTEGERS.balance > 0 ? '+' : '') + INTEGERS.balance;
  };

  window.integersCheck = function(){
    if(INTEGERS.balance === INTEGERS.target){
      toast('🎉 NÚCLEO ESTABILIZADO!', 'success'); ALEX.stats.totalSolutions++; setTimeout(integersNext, 1200);
    } else { toast('Carga incorreta. Adicione o oposto para balancear.', 'warn'); }
  };

  function integersNext(){
    INTEGERS.taskIdx++;
    if(INTEGERS.taskIdx < INTEGERS.tasks.length) integersBuildStage();
    else { completeStation('integers'); ALEX.sessionActive = false; exitAlexStation(); }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // ESTAÇÃO 8: MAPA DE NAVEGAÇÃO (Geometria / Pitágoras)
  // ═════════════════════════════════════════════════════════════════════════
  var GEOM = {
    taskIdx: 0,
    tasks: [
      { a: 3, b: 4, c: 5, hint: 'Triângulo Sagrado (3, 4, 5).' },
      { a: 6, b: 8, c: 10, hint: 'Dobro do clássico.' }
    ]
  };

  function initGeometry(){
    GEOM.taskIdx = 0;
    dlgStart([
      'Olá! Eu sou o <strong>Tenente Axis</strong>.',
      'Sua nave viaja em linhas retas, mas o universo é feito de triângulos.',
      'No mapa, você verá dois caminhos. Um reto e outro lateral. Calcule a distância direta.',
      'Dica: <span class="acc-orange">a² + b² = c²</span>. A hipotenusa é sempre o maior lado.'
    ], function(){ ALEX.sessionActive = true; geometryBuildStage(); });
  }

  function geometryBuildStage(){
    var t = GEOM.tasks[GEOM.taskIdx];
    showTaskBar('Calcule a hipotenusa (distância direta).', GEOM.taskIdx+1, GEOM.tasks.length);
    var stage = document.getElementById('alexStationStage');
    stage.innerHTML = '<div class="geometry-stage">' +
      '<div class="geometry-canvas-wrap"><canvas id="geomCanvas" width="300" height="200"></canvas></div>' +
      '<div class="geometry-inputs">' +
        'Lado A: <b>' + t.a + '</b> | Lado B: <b>' + t.b + '</b><br>' +
        'Distância C = ? <input type="text" inputmode="numeric" pattern="[0-9]*" id="geomIn" class="alex-input" style="width:100px" oninput="this.value = this.value.replace(/[^0-9]/g, \'\')">' +
      '</div><button class="alex-action-btn green" onclick="geometryCheck()">LANÇAR NAVE</button></div>';
    geometryDraw();
  }

  function geometryDraw(){
    var t = GEOM.tasks[GEOM.taskIdx];
    var c = document.getElementById('geomCanvas');
    var ctx = c.getContext('2d');
    ctx.clearRect(0,0,300,200);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(50, 150); ctx.lineTo(50 + t.a*20, 150); ctx.lineTo(50 + t.a*20, 150 - t.b*20); ctx.closePath(); ctx.stroke();
    ctx.fillStyle = 'var(--cyan)'; ctx.font = '12px Exo 2';
    ctx.fillText(t.a, 50 + (t.a*10), 170);
    ctx.fillText(t.b, 60 + (t.a*20), 150 - (t.b*10));
    ctx.strokeStyle = 'var(--yellow)'; ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.moveTo(50, 150); ctx.lineTo(50 + t.a*20, 150 - t.b*20); ctx.stroke();
  }

  window.geometryCheck = function(){
    var t = GEOM.tasks[GEOM.taskIdx];
    var v = parseInt(document.getElementById('geomIn').value);
    if(v === t.c){
      toast('🚀 TRAJETÓRIA CALCULADA!', 'success'); ALEX.stats.totalSolutions++; setTimeout(geometryNext, 1200);
    } else { toast('Cálculo incorreto. Tente elevar ao quadrado cada lado.', 'warn'); }
  };

  function geometryNext(){
    GEOM.taskIdx++;
    if(GEOM.taskIdx < GEOM.tasks.length) geometryBuildStage();
    else { completeStation('geometry'); ALEX.sessionActive = false; exitAlexStation(); }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // ESTAÇÃO 9: SÍNTESE DE FÓRMULAS (Álgebra)
  // ═════════════════════════════════════════════════════════════════════════
  var ALGEBRA = {
    taskIdx: 0,
    tasks: [
      { eq: 'X + 5 = 12', x: 7, calc: function(val){ return val + 5; }, target: 12, hint: 'O que mais 5 dá 12?' },
      { eq: '2X = 10', x: 5, calc: function(val){ return 2 * val; }, target: 10, hint: 'Metade de 10.' },
      { eq: '3X - 1 = 8', x: 3, calc: function(val){ return 3 * val - 1; }, target: 8, hint: 'Quase lá! Deixe o X sozinho.' }
    ]
  };

  function initAlgebra(){
    ALGEBRA.taskIdx = 0;
    dlgStart([
      'Saudações. Sou o <strong>Dr. X</strong>.',
      'Na síntese química, muitas vezes não conhecemos um dos reagentes — nós o chamamos de X.',
      'Sua tarefa é encontrar o valor de X para equilibrar a fórmula.',
      'Pense como uma balança: <span class="acc-orange">o que você faz de um lado, deve fazer do outro</span>.'
    ], function(){ ALEX.sessionActive = true; algebraBuildStage(); });
  }

  function algebraBuildStage(){
    var t = ALGEBRA.tasks[ALGEBRA.taskIdx];
    showTaskBar('Pense no valor de X.', ALGEBRA.taskIdx+1, ALGEBRA.tasks.length);
    var stage = document.getElementById('alexStationStage');
    stage.innerHTML = '<div class="algebra-stage">' +
      '<div class="algebra-scale-wrap">' +
        '<div class="algebra-scale-fulcrum"></div>' +
        '<div class="algebra-scale-beam" id="algBeam">' +
          '<div class="algebra-scale-plate left"><div class="label" id="algLabelL">?</div></div>' +
          '<div class="algebra-scale-plate right"><div class="label">' + t.target + '</div></div>' +
        '</div>' +
      '</div>' +
      '<div class="algebra-eq">' + t.eq + '</div>' +
      '<div class="algebra-input-row">X = <input type="text" inputmode="numeric" pattern="[0-9]*" id="algIn" class="alex-input" style="width:100px" oninput="algebraHandleInput()"></div>' +
      '<button class="alex-action-btn green" onclick="algebraCheck()">SINTETIZAR</button></div>';
    
    algebraUpdateScale();
  }

  window.algebraHandleInput = function(){
    var inp = document.getElementById('algIn');
    inp.value = inp.value.replace(/[^0-9]/g, '');
    algebraUpdateScale();
  };

  function algebraUpdateScale(){
    var t = ALGEBRA.tasks[ALGEBRA.taskIdx];
    var val = parseInt(document.getElementById('algIn').value) || 0;
    var currentL = t.calc(val);
    var beam = document.getElementById('algBeam');
    var labelL = document.getElementById('algLabelL');
    if(!beam || !labelL) return;

    labelL.textContent = currentL;

    // Calcula inclinação: max 20 graus
    var diff = currentL - t.target;
    var tilt = Math.max(-20, Math.min(20, diff * 2)); 
    beam.style.transform = 'rotate(' + tilt + 'deg)';

    // Mantém pratos nivelados
    var plates = beam.querySelectorAll('.algebra-scale-plate');
    plates.forEach(function(p){ p.style.transform = 'rotate(' + (-tilt) + 'deg)'; });
  }

  window.algebraCheck = function(){
    var t = ALGEBRA.tasks[ALGEBRA.taskIdx];
    var v = parseInt(document.getElementById('algIn').value);
    if(v === t.x){
      toast('🧪 SÍNTESE BEM SUCEDIDA!', 'success'); ALEX.stats.totalSolutions++; setTimeout(algebraNext, 1200);
    } else { toast('Valor de X incorreto.', 'warn'); }
  };

  function algebraNext(){
    ALGEBRA.taskIdx++;
    if(ALGEBRA.taskIdx < ALGEBRA.tasks.length) algebraBuildStage();
    else { completeStation('algebra'); ALEX.sessionActive = false; exitAlexStation(); }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CERIMÔNIA FINAL
  // ═════════════════════════════════════════════════════════════════════════
  function openCeremony(){
    document.getElementById('alexBaseMap').classList.remove('show');
    document.getElementById('alexCeremonyScreen').classList.add('show');

    var elapsed = '—';
    if(ALEX.stats.timeStarted){
      var min = Math.round((Date.now() - ALEX.stats.timeStarted) / 60000);
      elapsed = min + ' min';
    }

    document.getElementById('alexCeremonyText').innerHTML =
      '<em>"Cadete Alex apresentou-se a esta base há semanas como um aluno comum…"</em><br><br>' +
      '<em>"Hoje, ele se forma como aquele que sabe que <strong>na matemática há sempre mais de um caminho</strong>. Que <strong>todo problema tem várias soluções</strong>. Que <strong>descobrir vale mais que decorar</strong>."</em><br><br>' +
      'Por essas qualidades, Alex Lunar é promovido a <strong>Capitão</strong>. A defesa do Sistema Solar agora está em suas mãos.';

    document.getElementById('alexCeremonyStats').innerHTML =
      '<div class="ceremony-stat-label">Estações concluídas:</div>' +
      '<div class="ceremony-stat-value">' + Object.values(ALEX.progress).filter(function(v){return v;}).length + ' / ' + ALEX.rooms.length + '</div>' +
      '<div class="ceremony-stat-label">Soluções descobertas:</div>' +
      '<div class="ceremony-stat-value">' + ALEX.stats.totalSolutions + '</div>' +
      '<div class="ceremony-stat-label">Insights bônus:</div>' +
      '<div class="ceremony-stat-value">' + ALEX.stats.bonusInsights + '</div>' +
      '<div class="ceremony-stat-label">Tempo de jornada:</div>' +
      '<div class="ceremony-stat-value">' + elapsed + '</div>';

    // Tenta tocar música épica
    try { if(window._spacemathPlayMusic) window._spacemathPlayMusic('victory'); } catch(_){}
  }

  window.alexCeremonyToMenu = function(){
    document.getElementById('alexCeremonyScreen').classList.remove('show');
    document.getElementById('startScreen').classList.remove('hidden');
    try { if(window._spacemathPlayMusic) window._spacemathPlayMusic('menu'); } catch(_){}
  };

  console.log('[Alex Lunar Story] Modo prequel carregado. ' + ALEX.rooms.length + ' estações disponíveis.');

})();

