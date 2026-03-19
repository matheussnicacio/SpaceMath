// ===================== STORY SCREEN =====================

// Each slide has: slideNum, icon, title, text (HTML), visualType, diffClass
// visualType: 'colony' | 'captain' | 'invasion' | 'math' | 'alert' | 'laser' | 'shield'
var STORIES = {
  easy: {
    label: 'FÁCIL', cls: 'easy',
    glowColor: 'rgba(57,255,20,0.18)',
    laserColor: '#39ff14',
    slides: [
      {
        slideNum: 'PRÓLOGO · 1 / 4', icon: '🌍', title: 'ANO 2150\nCOLÔNIA LUNAR',
        visual: 'colony',
        text: 'A humanidade finalmente realizou seu sonho mais antigo: a <strong>Base Lunar Central</strong>.\n\nDepois de décadas de esforço, a Lua se tornou <em>o primeiro lar humano fora da Terra</em>.\n\nVida, ciência e esperança floresciam ali em paz...'
      },
      {
        slideNum: 'PRÓLOGO · 2 / 4', icon: '👨‍🚀', title: 'CAPITÃO\nALEX LUNAR',
        visual: 'captain',
        text: 'Você é o <strong>Capitão Alex Lunar</strong>, guardião da base.\n\nSeu maior talento não é a força — é a <em>mente afiada</em>. Você resolve equações no ritmo de um coração acelerado.\n\nPor anos, nada perturbou essa tranquilidade.'
      },
      {
        slideNum: 'PRÓLOGO · 3 / 4', icon: '🛸', title: 'ALERTA!\nELES CHEGARAM',
        visual: 'invasion',
        text: 'Os sensores dispararam em <strong>pânico</strong>. Uma frota alienígena se aproxima — não para destruir, mas para <em>roubar a Lua</em> como troféu.\n\nSistemas automáticos de defesa: <span class="red">OFFLINE</span>.\n\n<span class="grn">Seus escudos têm um ponto fraco...</span>'
      },
      {
        slideNum: 'PRÓLOGO · 4 / 4', icon: '🔢', title: 'MATEMÁTICA\nÉ SUA ARMA',
        visual: 'shield',
        text: 'Cada nave é protegida por um <strong>escudo matemático</strong>. Resolva a operação — e o laser destrói a nave!\n\nEles apostaram que humanos entrariam em pânico e <em>errariam os cálculos</em>.\n\n<span class="grn">Eles não contavam com você. É hora de defender a Lua!</span>'
      }
    ]
  },
  medium: {
    label: 'MÉDIO', cls: 'medium',
    glowColor: 'rgba(0,229,255,0.18)',
    laserColor: '#00e5ff',
    slides: [
      {
        slideNum: 'PRÓLOGO · 1 / 4', icon: '📡', title: 'SINAL DO\nESPAÇO PROFUNDO',
        visual: 'colony',
        text: 'Os telescópios da base captaram algo <strong>impossível</strong>: sinais organizados do espaço profundo.\n\nNão eram estáticos. Eram padrões — sequências matemáticas precisas, como se alguém <em>estivesse nos testando</em>.\n\nA equipe não sabia se comemorar ou se apavorar.'
      },
      {
        slideNum: 'PRÓLOGO · 2 / 4', icon: '⚠️', title: 'A FROTA SE\nAPROXIMA RÁPIDO',
        visual: 'alert',
        text: 'Em horas, os sinais se tornaram naves. <strong>Dezenas delas</strong>, em formação precisa.\n\nSistemas de defesa automáticos falharam. Os escudos alienígenas <em>neutralizam qualquer ataque eletrônico</em>.\n\nSó existe uma fraqueza — e ela exige um humano.'
      },
      {
        slideNum: 'PRÓLOGO · 3 / 4', icon: '🧮', title: 'ESCUDOS\nMATEMÁTICOS',
        visual: 'invasion',
        text: 'Cada nave exibe uma <strong>operação matemática</strong> — não como decoração. É uma provocação direta.\n\nEles apostaram que humanos sob ataque <em>entrariam em pânico e errariam</em>. Que o medo bloquearia o raciocínio.\n\nSua missão é provar o contrário.'
      },
      {
        slideNum: 'PRÓLOGO · 4 / 4', icon: '🎯', title: 'CAPITÃO,\nA BASE PRECISA',
        visual: 'laser',
        text: '<strong>Capitão Alex Lunar</strong>, você foi convocado. Não por ser o mais forte — mas por ser o mais <em>preciso sob pressão</em>.\n\nAs ondas se sucedem sem pausa. A velocidade aumenta. Os cálculos ficam mais complexos.\n\n<em>Cada segundo conta. Cada acerto salva vidas.</em>'
      }
    ]
  },
  hard: {
    label: 'DIFÍCIL', cls: 'hard',
    glowColor: 'rgba(255,34,68,0.22)',
    laserColor: '#ff2244',
    slides: [
      {
        slideNum: 'PRÓLOGO · 1 / 4', icon: '💀', title: 'HORA ZERO\nSOB ATAQUE',
        visual: 'alert',
        text: 'Não há tempo para avisos. Não há tempo para protocolos. A <strong>invasão já começou</strong>.\n\nA frota mais agressiva já registrada está em queda livre sobre a Lua. Sistemas automáticos foram <span class="red">destruídos nos primeiros segundos</span>.\n\nResta apenas você.'
      },
      {
        slideNum: 'PRÓLOGO · 2 / 4', icon: '🔴', title: 'ÚLTIMA LINHA\nDE DEFESA',
        visual: 'captain',
        text: 'Os colonos foram evacuados. Os cientistas, engenheiros — todos nos abrigos subterrâneos.\n\nVocê ficou. <strong>Por escolha.</strong> Porque alguém precisava ficar. Porque sem defesa, as naves alcançam a Terra.\n\n<span class="red">Bilhões de pessoas dormem sem saber o que acontece aqui.</span>'
      },
      {
        slideNum: 'PRÓLOGO · 3 / 4', icon: '⚡', title: 'NAVES VELOZES\nCÁLCULOS DIFÍCEIS',
        visual: 'invasion',
        text: 'Esta frota é diferente. As naves não descem — elas <strong>mergulham</strong>. Velozes, imprevisíveis, agressivas.\n\nOs escudos têm operações complexas: números grandes, divisões difíceis, multiplicações de dois dígitos.\n\n<span class="red">Você precisará ser mais rápido que nunca.</span>'
      },
      {
        slideNum: 'PRÓLOGO · 4 / 4', icon: '🌍', title: 'DEFENDA A LUA.\nSALVE A TERRA.',
        visual: 'laser',
        text: 'Lá no horizonte, a Terra brilha. Oceanos, continentes, bilhões de vidas que <strong>nunca saberão seu nome</strong>.\n\nEsta não é apenas uma batalha pela Lua — é a prova de que a mente humana é <em>a arma mais poderosa do universo</em>.\n\n<span class="red">Não existe Plano B. Capitão, é agora.</span>'
      }
    ]
  }
};

// Background visual configs per visual type
var STORY_VISUALS = {
  colony: { bg: 'radial-gradient(ellipse at 50% 90%, #0d1f3c 0%, #050810 55%)' },
  captain: { bg: 'radial-gradient(ellipse at 30% 70%, #071a12 0%, #040810 65%)' },
  invasion: { bg: 'radial-gradient(ellipse at 50% 20%, #150a20 0%, #04060f 60%)' },
  alert: { bg: 'radial-gradient(ellipse at 50% 50%, #1a0505 0%, #04060f 65%)' },
  laser: { bg: 'radial-gradient(ellipse at 50% 80%, #050f20 0%, #04060f 60%)' },
  shield: { bg: 'radial-gradient(ellipse at 50% 40%, #141005 0%, #04060f 65%)' }
};

var storyState = { diff: null, slide: 0, total: 0, twTimer: null };

function openStoryScreen(diff){
  storyState.diff = diff;
  storyState.slide = 0;
  var story = STORIES[diff];
  storyState.total = story.slides.length;

  document.getElementById('storyDiffBadge').textContent = story.label;
  document.getElementById('storyDiffBadge').className = 'story-diff-badge ' + story.cls;
  _storyBuild(story);
  _storyBuildDots();
  document.getElementById('storyScreen').classList.add('show');
  _storyGoTo(0);
}

function _storyBuild(story){
  var wrap = document.getElementById('storySlides');
  wrap.innerHTML = '';
  story.slides.forEach(function(sl, i){
    var slide = document.createElement('div');
    slide.className = 'story-slide';
    slide.appendChild(_storyMakeVisual(sl, story, i));
    slide.appendChild(_storyMakeContent(sl, story, i));
    wrap.appendChild(slide);
  });
  // draw stars after paint
  setTimeout(function(){
    story.slides.forEach(function(sl, i){
      var cvs = document.getElementById('sStars'+i);
      if(!cvs) return;
      var p = cvs.parentElement;
      cvs.width = p.offsetWidth||600; cvs.height = p.offsetHeight||500;
      var ctx = cvs.getContext('2d');
      for(var s=0;s<180;s++){
        var x=Math.random()*cvs.width, y=Math.random()*cvs.height;
        ctx.beginPath(); ctx.arc(x,y,Math.random()*1.5,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,'+(Math.random()*0.7+0.1)+')'; ctx.fill();
      }
      // occasional brighter star
      for(var b=0;b<12;b++){
        var bx=Math.random()*cvs.width, by=Math.random()*cvs.height;
        ctx.beginPath(); ctx.arc(bx,by,1.8,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.fill();
        ctx.beginPath(); ctx.arc(bx,by,3.5,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,0.12)'; ctx.fill();
      }
    });
  }, 80);
}

function _storyMakeVisual(sl, story, i){
  var vc = STORY_VISUALS[sl.visual] || STORY_VISUALS.colony;
  var vis = document.createElement('div');
  vis.className = 'story-visual';
  vis.style.background = vc.bg;

  // stars canvas
  var cvs = document.createElement('canvas');
  cvs.id = 'sStars'+i; cvs.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:0;width:100%;height:100%';
  vis.appendChild(cvs);

  // glow orb
  var orb = document.createElement('div');
  orb.className = 'story-glow-orb';
  orb.style.background = story.glowColor;
  vis.appendChild(orb);

  // earth (always visible bottom-right)
  var earth = document.createElement('div');
  earth.className = 'story-earth';
  vis.appendChild(earth);

  // lunar surface SVG
  var surf = document.createElement('div');
  surf.className = 'story-surface';
  surf.innerHTML = '<svg viewBox="0 0 700 100" preserveAspectRatio="none" width="100%" height="90"><polygon points="0,100 0,55 50,38 100,65 160,28 220,52 280,20 340,48 400,18 460,42 520,28 580,52 640,35 700,50 700,100" fill="#111d2e"/><polygon points="0,100 0,68 50,52 100,76 160,42 220,64 280,34 340,60 400,30 460,55 520,42 580,65 640,50 700,62 700,100" fill="#162030"/></svg>';
  vis.appendChild(surf);

  // Main visual element based on type
  var mainEl = document.createElement('div');
  mainEl.style.cssText = 'position:relative;z-index:4;display:flex;flex-direction:column;align-items:center;gap:14px;';

  if(sl.visual === 'colony'){
    // Base + astronaut floating
    mainEl.innerHTML =
      '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:rgba(255,255,255,0.3);letter-spacing:4px;margin-bottom:4px;">ANO 2150 — LUA</div>' +
      '<div style="font-size:80px;animation:stIconPop 0.7s cubic-bezier(0.34,1.56,0.64,1) both;filter:drop-shadow(0 0 24px '+story.glowColor+')">🌕</div>' +
      '<div style="font-family:\'Press Start 2P\',monospace;font-size:11px;color:'+_storyDiffColor(story.cls)+';text-shadow:2px 2px 0 #000;text-align:center;line-height:1.8;">BASE LUNAR CENTRAL<br><span style="font-size:8px;color:rgba(255,255,255,0.4);">COLÔNIA Nº 001</span></div>';
  }
  else if(sl.visual === 'captain'){
    // Astronaut SVG centered with glow
    var activeSkinId = (typeof proState!=='undefined' && proState.active) ? proState.active : (typeof skinState!=='undefined' ? skinState.active : 'classic');
    var activeSkin = (typeof getProSkin==='function' && typeof proState!=='undefined' && proState.active) ? getProSkin(proState.active) : (typeof getSkin==='function' ? getSkin(activeSkinId||'classic') : null);
    var astroSVG = (activeSkin && typeof buildAstronautSVG==='function') ? buildAstronautSVG(activeSkin, 1.8) : '👨‍🚀';
    mainEl.innerHTML =
      '<div style="font-family:\'Press Start 2P\',monospace;font-size:8px;color:rgba(255,255,255,0.3);letter-spacing:3px;margin-bottom:6px;">CAPITÃO ALEX LUNAR</div>' +
      '<div style="animation:stAstroFloat 3s ease-in-out infinite;filter:drop-shadow(0 0 22px '+story.glowColor+')">'+astroSVG+'</div>' +
      '<div style="font-family:\'Exo 2\',sans-serif;font-size:12px;color:rgba(255,255,255,0.4);text-align:center;">Especialista em Defesa Orbital</div>';
  }
  else if(sl.visual === 'invasion'){
    // UFOs dropping
    mainEl.style.position = 'absolute';
    mainEl.style.inset = '0';
    mainEl.style.gap = '0';
    var equations = ['7 + 5', '12 × 3', '48 ÷ 6', '9 × 4'];
    [
      {left:'12%', delay:'0s', dur:'3.6s', eq:equations[0]},
      {left:'44%', delay:'0.9s', dur:'4.2s', eq:equations[1]},
      {left:'68%', delay:'1.8s', dur:'3.9s', eq:equations[2]},
    ].forEach(function(cfg){
      var ufo = document.createElement('div');
      ufo.className = 'story-ufo';
      ufo.style.cssText = 'position:absolute;top:-70px;left:'+cfg.left+';z-index:5;pointer-events:none;display:flex;flex-direction:column;align-items:center;gap:5px;animation:stUFOfall '+cfg.dur+' ease-in-out infinite;animation-delay:'+cfg.delay;
      ufo.innerHTML = '<div class="story-ufo-label">'+cfg.eq+' = ?</div><div id="stUfo_'+i+'_'+cfg.left+'"></div>';
      ufo.style.setProperty('--delay', cfg.delay);
      mainEl.appendChild(ufo);
    });
  }
  else if(sl.visual === 'alert'){
    var alertCls = story.cls === 'hard' ? 'red' : story.cls === 'medium' ? 'cyan' : 'green';
    var alertIcon = story.cls === 'hard' ? '🚨' : story.cls === 'medium' ? '⚠️' : '🔔';
    mainEl.innerHTML =
      '<div class="story-alert '+alertCls+'">' +
        '<span class="story-alert-icon">'+alertIcon+'</span>' +
        '<div class="story-alert-title '+alertCls+'">ALERTA DE INVASÃO</div>' +
        '<div class="story-alert-sub">Naves detectadas em órbita lunar</div>' +
      '</div>';
  }
  else if(sl.visual === 'laser'){
    // Astronaut + laser firing up at UFO
    var lSkinId = (typeof proState!=='undefined' && proState.active) ? proState.active : (typeof skinState!=='undefined' ? skinState.active : 'classic');
    var lSkin = (typeof getProSkin==='function' && typeof proState!=='undefined' && proState.active) ? getProSkin(proState.active) : (typeof getSkin==='function' ? getSkin(lSkinId||'classic') : null);
    var lSVG = (lSkin && typeof buildAstronautSVG==='function') ? buildAstronautSVG(lSkin, 1.4) : '👨‍🚀';
    mainEl.style.position = 'absolute'; mainEl.style.inset = '0'; mainEl.style.gap = '0';
    // UFO at top
    var ufoTop = document.createElement('div');
    ufoTop.style.cssText='position:absolute;top:10%;left:48%;transform:translateX(-50%);z-index:5;display:flex;flex-direction:column;align-items:center;gap:5px;';
    ufoTop.innerHTML='<div class="story-ufo-label" style="font-size:12px;padding:5px 12px;">'+_storyEquation(story.cls)+' = ?</div><div id="stLaserUfo'+i+'"></div>';
    mainEl.appendChild(ufoTop);
    // laser beam
    var beam = document.createElement('div');
    beam.className = 'story-laser';
    beam.style.cssText += 'background:linear-gradient(to top,'+story.laserColor+',rgba(255,255,255,0.9));box-shadow:0 0 12px '+story.laserColor+',0 0 24px '+story.laserColor+';';
    mainEl.appendChild(beam);
    // explosion
    var exp = document.createElement('div');
    exp.className = 'story-explosion';
    mainEl.appendChild(exp);
    // astronaut at bottom
    var astroW = document.createElement('div');
    astroW.style.cssText='position:absolute;bottom:90px;left:50%;transform:translateX(-50%);z-index:4;filter:drop-shadow(0 0 16px '+story.laserColor+');';
    astroW.innerHTML = lSVG;
    mainEl.appendChild(astroW);
  }
  else if(sl.visual === 'shield'){
    var eqs = story.cls==='hard'?['27 + 34','9 × 8','72 ÷ 8']:story.cls==='medium'?['12 + 8','6 × 4','35 ÷ 5']:['3 + 6','2 × 4','12 ÷ 3'];
    mainEl.innerHTML =
      '<div style="font-family:\'Press Start 2P\',monospace;font-size:8px;color:rgba(255,255,255,0.3);letter-spacing:3px;margin-bottom:6px;">SISTEMA DE ESCUDO</div>' +
      '<div class="story-shield-demo">' +
        '<div class="story-shield-eq">'+eqs[0]+' = ?</div>' +
        '<div class="story-shield-hint">→ Resolva para destruir a nave!</div>' +
      '</div>' +
      '<div style="display:flex;gap:10px;margin-top:8px;">' +
        eqs.slice(1).map(function(eq){ return '<div style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:rgba(255,215,0,0.4);background:rgba(0,0,0,0.4);padding:5px 10px;border-radius:5px;border:1px solid rgba(255,215,0,0.2);">'+eq+'</div>'; }).join('') +
      '</div>';
  }

  vis.appendChild(mainEl);

  // inject UFO SVGs after append
  setTimeout(function(){
    var ufoEls = vis.querySelectorAll('[id^="stUfo_'+i+'_"], [id^="stLaserUfo'+i+'"]');
    ufoEls.forEach(function(el){ if(typeof buildUFOSVG==='function'){ el.innerHTML=buildUFOSVG(1); } });
  }, 100);

  return vis;
}

function _storyMakeContent(sl, story, i){
  var content = document.createElement('div');
  content.className = 'story-content';
  content.innerHTML =
    '<div class="story-slide-num">'+sl.slideNum+'</div>' +
    '<div class="story-slide-icon">'+sl.icon+'</div>' +
    '<div class="story-slide-title '+story.cls+'">'+sl.title.replace('\n','<br>')+'</div>' +
    '<div class="story-slide-text" id="sTxt'+i+'"></div>';
  return content;
}

function _storyDiffColor(cls){ return cls==='easy'?'var(--green)':cls==='medium'?'var(--cyan)':'var(--red)'; }
function _storyEquation(cls){ return cls==='hard'?'27 + 34':cls==='medium'?'12 + 8':'3 + 6'; }

function _storyBuildDots(){
  var story = STORIES[storyState.diff];
  var dots = document.getElementById('storyDots');
  dots.innerHTML = '';
  story.slides.forEach(function(sl, i){
    var d = document.createElement('div');
    d.className = 'story-dot';
    d.onclick = (function(idx){ return function(){ _storyGoTo(idx); }; })(i);
    dots.appendChild(d);
  });
}

function _storyGoTo(idx){
  var story = STORIES[storyState.diff];
  if(idx < 0 || idx >= story.slides.length) return;
  storyState.slide = idx;

  document.getElementById('storySlides').style.transform = 'translateX(-'+(idx*100)+'%)';

  // dots
  document.querySelectorAll('.story-dot').forEach(function(d,i){ d.classList.toggle('active', i===idx); });

  // prev button
  document.getElementById('storyPrevBtn').disabled = idx === 0;

  // next/go button
  var btn = document.getElementById('storyNextBtn');
  var isLast = idx === story.slides.length - 1;
  if(isLast){
    btn.textContent = '⚔ INICIAR MISSÃO!';
    btn.className = 'story-nav-btn go ' + story.cls;
    btn.onclick = function(){ skipStory(); };
  } else {
    btn.textContent = 'PRÓXIMO ►';
    btn.className = 'story-nav-btn';
    btn.onclick = function(){ storyNav(1); };
  }

  // restart content animations
  var content = document.querySelectorAll('.story-content')[idx];
  if(content){
    ['story-slide-icon','story-slide-title','story-slide-text'].forEach(function(cls){
      var el = content.querySelector('.'+cls);
      if(el){ el.style.animation='none'; void el.offsetWidth; el.style.animation=''; }
    });
  }

  // typewriter
  _storyTypewrite(idx);
}

function _storyTypewrite(idx){
  if(storyState.twTimer){ clearTimeout(storyState.twTimer); storyState.twTimer=null; }
  var story = STORIES[storyState.diff];
  var rawHtml = story.slides[idx].text.replace(/\n/g, '<br>');
  var el = document.getElementById('sTxt'+idx);
  if(!el) return;

  // Strip HTML tags to get plain text length, then reveal char by char
  // We use a "revealed" counter over the raw text stripped of tags
  var stripped = rawHtml.replace(/<[^>]+>/g,'');
  var total = stripped.length;
  var revealed = 0;
  var speed = Math.max(12, Math.floor(2400 / total)); // auto-speed so it finishes ~2.4s

  function revealNext(){
    revealed++;
    // Rebuild displayed HTML up to revealed chars of plain text
    var shown = 0;
    var out = '';
    var inTag = false;
    for(var ci = 0; ci < rawHtml.length; ci++){
      var ch = rawHtml[ci];
      if(ch === '<'){ inTag = true; out += ch; continue; }
      if(ch === '>'){ inTag = false; out += ch; continue; }
      if(inTag){ out += ch; continue; }
      // plain char
      if(shown < revealed){ out += ch; shown++; }
      else { break; }
    }
    // close any unclosed tags crudely
    el.innerHTML = out + (revealed < total ? '<span class="story-cursor"></span>' : '');
    if(revealed < total){
      storyState.twTimer = setTimeout(revealNext, speed);
    }
  }
  el.innerHTML = '';
  revealNext();
}

function storyNav(dir){ _storyGoTo(storyState.slide + dir); }

function skipStory(){
  if(storyState.twTimer){ clearTimeout(storyState.twTimer); storyState.twTimer=null; }
  document.getElementById('storyScreen').classList.remove('show');
  startGame(storyState.diff);
}


