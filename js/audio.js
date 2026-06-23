// SPACEMATH AUDIO ENGINE — Web Audio API
// Baseado no GDD seção 14 (Sonorização)
// ============================================================
(function(){

  var AC = null;
  var musicGain = null;
  var sfxGain = null;
  var musicNodes = {}; // active music nodes
  var currentMusicContext = null; // 'menu'|'game-low'|'game-mid'|'game-high'|'gameover'
  var musicStartTime = 0;
  var _audioEnabled = true;
  var _userInteracted = false;

  function getAC(){
    if(!AC){ AC = new (window.AudioContext||window.webkitAudioContext)(); }
    if(AC.state==='suspended') AC.resume();
    return AC;
  }

  function initGains(){
    if(musicGain) return;
    var ac = getAC();
    musicGain = ac.createGain(); musicGain.gain.value = 0.25;
    sfxGain   = ac.createGain(); sfxGain.gain.value   = 0.5;
    musicGain.connect(ac.destination);
    sfxGain.connect(ac.destination);
  }

  // --- SFX helpers ---

  function playTone(freq, type, duration, gainVal, delay, dest){
    var ac = getAC(); initGains();
    var g = ac.createGain();
    g.connect(dest||sfxGain);
    g.gain.setValueAtTime(0, ac.currentTime+(delay||0));
    g.gain.linearRampToValueAtTime(gainVal||0.4, ac.currentTime+(delay||0)+0.01);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime+(delay||0)+duration);
    var o = ac.createOscillator();
    o.type = type||'sine';
    o.frequency.value = freq;
    o.connect(g);
    o.start(ac.currentTime+(delay||0));
    o.stop(ac.currentTime+(delay||0)+duration+0.02);
  }

  function playNoise(duration, gainVal, delay, dest){
    var ac = getAC(); initGains();
    var bufSize = ac.sampleRate * duration;
    var buf = ac.createBuffer(1, bufSize, ac.sampleRate);
    var d = buf.getChannelData(0);
    for(var i=0;i<bufSize;i++) d[i]=(Math.random()*2-1);
    var src = ac.createBufferSource(); src.buffer = buf;
    var filt = ac.createBiquadFilter(); filt.type='lowpass'; filt.frequency.value=600;
    var g = ac.createGain();
    g.connect(dest||sfxGain);
    g.gain.setValueAtTime(gainVal||0.3, ac.currentTime+(delay||0));
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime+(delay||0)+duration);
    src.connect(filt); filt.connect(g);
    src.start(ac.currentTime+(delay||0));
    src.stop(ac.currentTime+(delay||0)+duration+0.05);
  }

  // --- SOUND EFFECTS ---

  // Digitação de número: beep eletrônico suave
  window.sfxDigit = function(){
    if(!_audioEnabled||!_userInteracted) return;
    playTone(880, 'square', 0.06, 0.08);
  };

  // Botão Apagar: whoosh reverso
  window.sfxDelete = function(){
    if(!_audioEnabled||!_userInteracted) return;
    var ac=getAC(); initGains();
    var o=ac.createOscillator(); var g=ac.createGain();
    o.type='sawtooth'; o.frequency.setValueAtTime(600,ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(200,ac.currentTime+0.12);
    g.gain.setValueAtTime(0.15,ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.15);
    o.connect(g); g.connect(sfxGain);
    o.start(); o.stop(ac.currentTime+0.18);
  };

  // Botão Enviar: confirmação eletrônica
  window.sfxSend = function(){
    if(!_audioEnabled||!_userInteracted) return;
    playTone(440,'sine',0.05,0.2);
    playTone(660,'sine',0.05,0.2,0.06);
  };

  // Acerto: explosão satisfatória + jingle curto
  window.sfxCorrect = function(comboCount){
    if(!_audioEnabled||!_userInteracted) return;
    comboCount = comboCount||1;
    // Explosão
    playNoise(0.18, 0.35);
    // Jingle
    var notes = comboCount>=3 ? [523,659,784,1047] : [523,659,784];
    notes.forEach(function(f,i){ playTone(f,'square',0.12,0.25,i*0.07); });
  };

  // Erro: buzzer
  window.sfxError = function(){
    if(!_audioEnabled||!_userInteracted) return;
    var ac=getAC(); initGains();
    var o=ac.createOscillator(); var g=ac.createGain();
    o.type='sawtooth'; o.frequency.value=120;
    g.gain.setValueAtTime(0.4,ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.35);
    o.connect(g); g.connect(sfxGain);
    o.start(); o.stop(ac.currentTime+0.4);
    playNoise(0.12,0.15,0.05);
  };

  // Combo 3+: explosão múltipla + jingle especial
  window.sfxCombo = function(){
    if(!_audioEnabled||!_userInteracted) return;
    [0,0.06,0.12].forEach(function(d){ playNoise(0.2,0.3,d); });
    [523,659,784,1047,1319].forEach(function(f,i){ playTone(f,'square',0.14,0.3,i*0.06); });
  };

  // Perda de vida: impacto + resmungo alienígena
  window.sfxLoseLife = function(){
    if(!_audioEnabled||!_userInteracted) return;
    playNoise(0.3,0.5);
    // Resmungo alienígena (descendente cômico)
    var ac=getAC(); initGains();
    var o=ac.createOscillator(); var g=ac.createGain();
    o.type='triangle';
    o.frequency.setValueAtTime(600,ac.currentTime+0.05);
    o.frequency.exponentialRampToValueAtTime(80,ac.currentTime+0.5);
    g.gain.setValueAtTime(0.25,ac.currentTime+0.05);
    g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.55);
    o.connect(g); g.connect(sfxGain);
    o.start(ac.currentTime+0.05); o.stop(ac.currentTime+0.6);
  };

  // Spawn de nave: propulsão alienígena
  window.sfxSpawn = function(){
    if(!_audioEnabled||!_userInteracted) return;
    var ac=getAC(); initGains();
    var o=ac.createOscillator(); var g=ac.createGain();
    o.type='sawtooth';
    o.frequency.setValueAtTime(200,ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(400,ac.currentTime+0.15);
    g.gain.setValueAtTime(0.06,ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.18);
    o.connect(g); g.connect(sfxGain);
    o.start(); o.stop(ac.currentTime+0.2);
  };

  // --- MUSIC ENGINE ---
  // Música procedural synthwave/eletrônica gerada por síntese

  function stopAllMusic(fadeTime){
    fadeTime = fadeTime||0.5;
    var ac=getAC();
    Object.keys(musicNodes).forEach(function(k){
      var n=musicNodes[k];
      if(n && n.gain){
        n.gain.gain.setTargetAtTime(0,ac.currentTime,fadeTime/3);
        setTimeout(function(){ try{ n.osc&&n.osc.stop(); }catch(e){} }, (fadeTime+0.2)*1000);
      }
    });
    musicNodes = {};
    currentMusicContext = null;
  }

  // Padrão de notas para cada contexto (synthwave)
  var SCALES = {
    menu:     [196,220,246,261,220,246,196,174],    // Am pentatónico lento, misterioso
    gameLow:  [261,294,329,349,392,349,329,294],    // C major motivacional
    gameMid:  [220,261,293,349,392,440,392,349],    // Am motivacional intenso
    gameHigh: [220,246,293,370,440,493,440,370],    // Am alta energia
    gameover: [196,185,174,164,155,146,138,130],    // Descendente melancólico
  };

  var BPM_MAP = {
    menu:85, gameLow:125, gameMid:135, gameHigh:145, gameover:75
  };

  function buildMusicLoop(contextKey){
    var ac=getAC(); initGains();
    var scale = SCALES[contextKey];
    var bpm   = BPM_MAP[contextKey];
    var step  = 60/bpm; // seconds per beat

    var masterG = ac.createGain();
    masterG.gain.value = 0;
    masterG.connect(musicGain);

    var fadeSpeed = (contextKey==='menu'||contextKey==='gameover') ? 2 : 1;
    masterG.gain.setTargetAtTime(1, ac.currentTime, fadeSpeed);

    // Bass line
    var bassG = ac.createGain(); bassG.gain.value = 0.5; bassG.connect(masterG);
    var bassOsc = ac.createOscillator();
    bassOsc.type = 'sawtooth';
    var bassFilter = ac.createBiquadFilter(); bassFilter.type='lowpass'; bassFilter.frequency.value=300;
    bassOsc.connect(bassFilter); bassFilter.connect(bassG);

    // Pad (atmospheric)
    var padG = ac.createGain(); padG.gain.value = 0.3; padG.connect(masterG);
    var padOsc = ac.createOscillator();
    padOsc.type = 'sine';
    padOsc.frequency.value = (scale[0]/2);
    var padFilter = ac.createBiquadFilter(); padFilter.type='bandpass'; padFilter.frequency.value=400; padFilter.Q.value=2;
    padOsc.connect(padFilter); padFilter.connect(padG);

    // Lead arp
    var leadG = ac.createGain(); leadG.gain.value = 0.0; leadG.connect(masterG);
    var leadOsc = ac.createOscillator(); leadOsc.type='square';
    var leadFilter = ac.createBiquadFilter(); leadFilter.type='highpass'; leadFilter.frequency.value=500;
    leadOsc.connect(leadFilter); leadFilter.connect(leadG);

    var now = ac.currentTime;
    var loopLen = scale.length * step;

    // Schedule bass and lead arp notes
    scale.forEach(function(freq, i){
      var t = now + i*step;
      bassOsc.frequency.setValueAtTime(freq/2, t);
      // Lead plays every other note for menu/gameover, every note otherwise
      if(contextKey!=='menu'&&contextKey!=='gameover'){
        leadOsc.frequency.setValueAtTime(freq*2, t);
        leadG.gain.setTargetAtTime(0.35, t, 0.02);
        leadG.gain.setTargetAtTime(0.0, t+step*0.7, 0.05);
      }
    });

    bassOsc.start(now); padOsc.start(now); leadOsc.start(now);

    // Drum pattern (kick + hihat via noise) for gameplay music
    if(contextKey!=='menu'&&contextKey!=='gameover'){
      var drumG = ac.createGain(); drumG.gain.value=0.6; drumG.connect(masterG);
      function schedDrum(time, isKick){
        var dur = isKick ? 0.25 : 0.04;
        var bufSize = Math.ceil(ac.sampleRate*dur);
        var buf = ac.createBuffer(1,bufSize,ac.sampleRate);
        var d=buf.getChannelData(0);
        for(var i=0;i<bufSize;i++) d[i]=(Math.random()*2-1)*(1-i/bufSize);
        var src=ac.createBufferSource(); src.buffer=buf;
        var f=ac.createBiquadFilter();
        if(isKick){ f.type='lowpass'; f.frequency.value=120; }
        else      { f.type='highpass'; f.frequency.value=5000; }
        var g=ac.createGain(); g.gain.value = isKick?0.7:0.18;
        src.connect(f); f.connect(g); g.connect(drumG);
        src.start(time); src.stop(time+dur+0.05);
      }
      // kick on beats 1,3; hihat on every beat
      for(var b=0;b<scale.length;b++){
        var bt = now + b*step;
        schedDrum(bt, b%2===0); // kick
        schedDrum(bt+step*0.5, false); // hihat off-beat
        schedDrum(bt, false); // hihat on beat
      }
    }

    // Store for stopping
    var key = contextKey + '_' + Date.now();
    musicNodes[key] = { gain:masterG, osc:bassOsc, loopLen:loopLen, scale:scale, step:step, startTime:now };

    // Self-rescheduling loop
    var loopTimeoutId = setTimeout(function loop(){
      if(!musicNodes[key]) return; // stopped
      // Reschedule notes for next loop iteration
      var loopNow = ac.currentTime;
      scale.forEach(function(freq,i){
        var t = loopNow + i*step;
        bassOsc.frequency.setValueAtTime(freq/2, t);
        if(contextKey!=='menu'&&contextKey!=='gameover'){
          leadOsc.frequency.setValueAtTime(freq*2,t);
          leadG.gain.setTargetAtTime(0.35,t,0.02);
          leadG.gain.setTargetAtTime(0.0,t+step*0.7,0.05);
        }
      });
      if(contextKey!=='menu'&&contextKey!=='gameover'){
        for(var b=0;b<scale.length;b++){
          var bt=loopNow+b*step;
          schedDrum(bt, b%2===0);
          schedDrum(bt+step*0.5, false);
          schedDrum(bt, false);
        }
      }
      loopTimeoutId = setTimeout(loop, loopLen*1000*0.9);
    }, loopLen*1000*0.95);

    musicNodes[key]._loopTimeout = loopTimeoutId;
    return key;
  }

  window.playMusic = function(contextKey){
    if(!_audioEnabled||!_userInteracted) return;
    if(currentMusicContext===contextKey) return;
    stopAllMusic(0.8);
    currentMusicContext = contextKey;
    if(SCALES[contextKey]) buildMusicLoop(contextKey);
  };

  window.stopMusic = function(){ stopAllMusic(1.0); };

  window.setMusicVolume = function(v){ if(musicGain) musicGain.gain.setTargetAtTime(v*0.25,getAC().currentTime,0.1); };
  window.setSfxVolume   = function(v){ if(sfxGain)   sfxGain.gain.setTargetAtTime(v*0.5,getAC().currentTime,0.1); };

  // UNLOCK AUDIO on first user interaction
  function unlock(){
    if(_userInteracted) return;
    _userInteracted = true;
    getAC(); initGains();
    // Start menu music if on start screen
    var ss = document.getElementById('startScreen');
    if(ss && !ss.classList.contains('hidden')){
      window.playMusic('menu');
    }
  }
  document.addEventListener('click', unlock, {passive:true});
  document.addEventListener('keydown', unlock, {passive:true});
  document.addEventListener('touchstart', unlock, {passive:true});

  // --- HOOK INTO GAME EVENTS ---

  // Wait for DOM + game code to be ready
  window.addEventListener('load', function(){

    // DIGIT INPUT - hook number buttons and keyboard display update
    var origCheckAnswer = window.checkAnswer;
    window.checkAnswer = function(){
      window.sfxSend();
      var prevCorrect = state.correct;
      var prevErrors  = state.errors;
      origCheckAnswer.apply(this, arguments);
      if(state.correct > prevCorrect){
        var hits = (state.ufos||[]).length; // already removed, use score diff hint
        // detect combo via score change or just play correct
        window.sfxCorrect(1);
      } else if(state.errors > prevErrors){
        window.sfxError();
      }
    };

    // LOSE LIFE
    var origLoseLife = window.loseLife;
    window.loseLife = function(){
      window.sfxLoseLife();
      origLoseLife.apply(this, arguments);
    };

    // SPAWN UFO
    var origSpawnUFO = window.spawnUFO;
    window.spawnUFO = function(){
      origSpawnUFO.apply(this, arguments);
      window.sfxSpawn();
    };

    // ADVANCE WAVE - update music intensity
    var origAdvanceWave = window.advanceWave;
    window.advanceWave = function(){
      origAdvanceWave.apply(this, arguments);
      _updateGameMusic();
    };

    // START GAME
    var origStartGame = window.startGame;
    window.startGame = function(diff){
      origStartGame.apply(this, arguments);
      setTimeout(function(){ window.playMusic('gameLow'); }, 100);
    };

    // GAME OVER
    var origGameOver = window.gameOver;
    window.gameOver = function(){
      origGameOver.apply(this, arguments);
      window.playMusic('gameover');
    };

    // GO TO MAIN MENU
    var origGoToMainMenu = window.goToMainMenu;
    window.goToMainMenu = function(){
      origGoToMainMenu.apply(this, arguments);
      setTimeout(function(){ window.playMusic('menu'); }, 300);
    };

    // PAUSE
    var origPauseGame = window.pauseGame;
    window.pauseGame = function(){
      origPauseGame.apply(this, arguments);
      if(musicGain && AC) musicGain.gain.setTargetAtTime(0.07, AC.currentTime, 0.3);
    };

    var origResumeGame = window.resumeGame;
    window.resumeGame = function(){
      origResumeGame.apply(this, arguments);
      if(musicGain && AC) musicGain.gain.setTargetAtTime(0.25, AC.currentTime, 0.3);
    };

    // Hook digit buttons
    document.querySelectorAll('.btn-num').forEach(function(btn){
      btn.addEventListener('click', function(){ window.sfxDigit(); });
    });
    document.querySelector('.btn-del') && document.querySelector('.btn-del').addEventListener('click', function(){ window.sfxDelete(); });
    // Keyboard digits
    document.addEventListener('keydown', function(e){
      if(e.key>='0'&&e.key<='9') window.sfxDigit();
      if(e.key==='Backspace'||e.key==='Delete') window.sfxDelete();
    }, {passive:true});

  }); // end load

  function _updateGameMusic(){
    if(!state||!state.running) return;
    var w = state.wave||1;
    var ctx = w>=10 ? 'gameHigh' : w>=6 ? 'gameMid' : 'gameLow';
    window.playMusic(ctx);
  }

  // Expose toggle
  window.toggleAudio = function(){
    _audioEnabled = !_audioEnabled;
    if(!_audioEnabled){ stopAllMusic(0.3); }
    else if(_userInteracted){
      var ss=document.getElementById('startScreen');
      if(ss&&!ss.classList.contains('hidden')) window.playMusic('menu');
      else if(state&&state.running) _updateGameMusic();
    }
    return _audioEnabled;
  };

  // Add a mute button (fixed overlay, always visible)
  window.addEventListener('load', function(){
    if(document.getElementById('audioToggleBtn')) return;
    var muteBtn = document.createElement('button');
    muteBtn.id = 'audioToggleBtn';
    muteBtn.title = 'Ativar/Desativar Som';
    muteBtn.innerHTML = '🔊';
    muteBtn.style.cssText = 'position:fixed;bottom:12px;right:12px;z-index:10050;background:rgba(0,20,40,0.85);border:1px solid rgba(0,229,255,0.3);color:#00e5ff;border-radius:8px;padding:6px 10px;cursor:pointer;font-size:16px;transition:all 0.2s;pointer-events:auto;';
    muteBtn.addEventListener('click', function(){
      var on = window.toggleAudio();
      muteBtn.innerHTML = on ? '🔊' : '🔇';
      muteBtn.style.opacity = on ? '1' : '0.5';
    });
    document.body.appendChild(muteBtn);
  });

})();
// ============================================================
// END SPACEMATH AUDIO ENGINE BASE
// ============================================================

// ============================================================
// SPACEMATH AUDIO ENGINE — EXTENSÃO AVANÇADA
// Campanha por planeta, e
// efeito de digitação (typewriter) nas histórias
// ============================================================
(function(){

  // ── Aguarda o engine base estar pronto ──────────────────────
  function waitForAudio(cb){ var t=setInterval(function(){ if(window.playMusic){ clearInterval(t); cb(); } },50); }

  // ── Paletas de notas temáticas por planeta ───────────────────
  // Cada planeta tem seu próprio conjunto de notas e BPM no gameplay
  // baseado na progressão de dificuldade do GDD (fácil→lendário)
  var PLANET_MUSIC = {
    // MERCÚRIO — fácil, quente, percussivo
    mercurio: {
      gameplay: { scale:[261,294,329,392,440,392,329,294], bpm:120, type:'intro' },
      victory:  { scale:[523,659,784,1047,784,659,523,392], bpm:140 },
      color: '#c0a060'
    },
    // VÊNUS — fácil+, atmosférico, sinuoso
    venus: {
      gameplay: { scale:[220,247,294,349,392,349,294,247], bpm:124, type:'intro' },
      victory:  { scale:[440,523,659,880,659,523,440,349], bpm:144 },
      color: '#ffa500'
    },
    // MARTE — médio, marcial, agressivo
    marte: {
      gameplay: { scale:[196,220,262,294,349,294,262,220], bpm:130, type:'mid' },
      victory:  { scale:[392,440,523,659,523,440,392,330], bpm:150 },
      color: '#dd3300'
    },
    // JÚPITER — médio+, épico, grandioso
    jupiter: {
      gameplay: { scale:[174,196,220,262,330,262,220,196], bpm:132, type:'mid' },
      victory:  { scale:[349,392,523,659,784,659,523,392], bpm:152 },
      color: '#c89040'
    },
    // SATURNO — difícil, misterioso, tenso
    saturno: {
      gameplay: { scale:[185,208,233,277,311,277,233,208], bpm:136, type:'high' },
      victory:  { scale:[370,415,466,523,622,523,466,415], bpm:156 },
      color: '#d4b06a'
    },
    // URANO — difícil+, frio, etéreo
    urano: {
      gameplay: { scale:[165,185,220,247,294,247,220,185], bpm:138, type:'high' },
      victory:  { scale:[330,370,440,494,587,494,440,370], bpm:158 },
      color: '#88cccc'
    },
    // NETUNO — difícil++, profundo, ominoso
    netuno: {
      gameplay: { scale:[147,165,196,220,262,220,196,165], bpm:142, type:'high' },
      victory:  { scale:[294,330,392,440,523,440,392,330], bpm:162 },
      color: '#4488ff'
    },
    // PLUTÃO — lendário, épico final, máxima tensão
    plutao: {
      gameplay: { scale:[138,155,185,207,246,207,185,155], bpm:148, type:'high' },
      victory:  { scale:[277,311,370,415,494,415,370,311], bpm:168 },
      color: '#aa88ff'
    }
  };

  // ── Menu da Campanha — ambiente épico de mapa estelar ────────
  var CAMP_MAP_MUSIC = { scale:[131,147,165,196,220,196,165,147], bpm:82 };

  // ── Victory fanfare — jingle de vitória por planeta ──────────
  function playVictoryFanfare(planetId){
    if(!window._audioEnabled_get || !window._audioEnabled_get()) return;
    var p = PLANET_MUSIC[planetId];
    if(!p) return;
    var ac = window._getAC ? window._getAC() : (new (window.AudioContext||window.webkitAudioContext)());
    var master = ac.createGain(); master.gain.value=0.35; master.connect(ac.destination);
    p.victory.scale.forEach(function(freq,i){
      var o=ac.createOscillator(); o.type='square'; o.frequency.value=freq;
      var g=ac.createGain();
      g.gain.setValueAtTime(0,ac.currentTime+i*0.1);
      g.gain.linearRampToValueAtTime(0.7,ac.currentTime+i*0.1+0.02);
      g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+i*0.1+0.3);
      o.connect(g); g.connect(master);
      o.start(ac.currentTime+i*0.1);
      o.stop(ac.currentTime+i*0.1+0.35);
    });
    // Noise burst finale
    setTimeout(function(){
      if(window.sfxCombo) window.sfxCombo();
    }, p.victory.scale.length * 100);
  }

  // ── Expõe AC para sub-módulos ─────────────────────────────────
  // O engine base já tem getAC internamente, precisamos de acesso
  // Criamos um wrapper que tenta reutilizar o contexto existente
  function getSharedAC(){
    if(window._sharedAC && window._sharedAC.state!=='closed') return window._sharedAC;
    window._sharedAC = new (window.AudioContext||window.webkitAudioContext)();
    return window._sharedAC;
  }
  // Expõe para o fanfare
  window._getAC = getSharedAC;
  window._audioEnabled_get = function(){ return window._audioEnabled !== false; };

  // ── TYPEWRITER SOUND ENGINE ──────────────────────────────────
  // Som de digitação mecânica enquanto o texto aparece nas histórias
  // Cada caractere emite um clique eletrônico com leve variação de pitch
  var twAC = null;
  var twGain = null;
  var _twSoundActive = false;
  var _twLastChar = 0;
  var TW_INTERVAL_MIN = 40; // ms mínimo entre sons (não spama)

  function initTwAudio(){
    if(twAC) return;
    twAC = getSharedAC();
    twGain = twAC.createGain();
    twGain.gain.value = 0.18;
    twGain.connect(twAC.destination);
  }

  // Som de uma tecla sendo pressionada — clique mecânico com pitch variável
  function playTypeKey(charCode){
    if(!window._audioEnabled_get()) return;
    var now = Date.now();
    if(now - _twLastChar < TW_INTERVAL_MIN) return; // throttle
    _twLastChar = now;

    initTwAudio();
    var ac = twAC;
    var t = ac.currentTime;

    // Pitch varia sutilmente baseado no código do caractere (textura sonora)
    var basePitch = 800 + (charCode % 16) * 30;

    // Clique principal (muito curto, tipo teclado mecânico)
    var buf = ac.createBuffer(1, Math.ceil(ac.sampleRate*0.025), ac.sampleRate);
    var d = buf.getChannelData(0);
    for(var i=0;i<d.length;i++){
      var env = 1 - i/d.length;
      d[i] = (Math.random()*2-1) * env * env;
    }
    var src = ac.createBufferSource(); src.buffer=buf;
    var filt = ac.createBiquadFilter(); filt.type='bandpass';
    filt.frequency.value = basePitch; filt.Q.value = 3;
    var g = ac.createGain(); g.gain.value=1.0;
    src.connect(filt); filt.connect(g); g.connect(twGain);
    src.start(t); src.stop(t+0.03);

    // Sub-toque suave (harmônico)
    var o2 = ac.createOscillator(); o2.type='sine'; o2.frequency.value=basePitch*0.5;
    var g2 = ac.createGain();
    g2.gain.setValueAtTime(0.15,t);
    g2.gain.exponentialRampToValueAtTime(0.001,t+0.04);
    o2.connect(g2); g2.connect(twGain);
    o2.start(t); o2.stop(t+0.045);
  }

  // Expõe a função de tecla para os patches de typewrite
  window.sfxTypeKey = playTypeKey;

  // ── PATCH DAS FUNÇÕES DE TYPEWRITE ──────────────────────────
  // Aguarda o DOM carregar para fazer os patches
  window.addEventListener('load', function(){

    // === 1. _storyTypewrite (histórias de fácil/médio/difícil) ===
    var orig_storyTypewrite = window._storyTypewrite;
    window._storyTypewrite = function(idx){
      // Chama a original
      orig_storyTypewrite.apply(this, arguments);
      // Intercepta o timer de revealNext adicionando som
      _patchTypewriteEl(
        function(){ return document.getElementById('sTxt'+idx); },
        function(){ return storyState && storyState.twTimer; },
        function(v){ if(storyState) storyState.twTimer = v; }
      );
    };

    // === 2. _campStoryTypewrite (histórias da Campanha) ===
    var orig_campTypewrite = window._campStoryTypewrite;
    window._campStoryTypewrite = function(idx){
      orig_campTypewrite.apply(this, arguments);
      _patchTypewriteEl(
        function(){ return document.getElementById('campStTxt'+idx); },
        function(){ return window._campStoryTwTimer; },
        function(v){ window._campStoryTwTimer = v; }
      );
    };

    // ── Hooks de campanha ────────────────────────────────────────
    patchCampaignAudio();

  });

  // ── MutationObserver — observa mudança de texto no elemento ──
  // É a forma mais confiável de capturar cada caractere revelado
  // sem reimplementar a lógica de typewrite completa
  function _patchTypewriteEl(getEl, getTimer, setTimer){
    // Pequeno delay para o elemento existir após a função original rodar
    setTimeout(function(){
      var el = getEl();
      if(!el) return;

      // Observa mutações de innerHTML — cada nova letra é uma mutação
      var obs = new MutationObserver(function(mutations){
        mutations.forEach(function(m){
          if(m.type==='childList'||m.type==='characterData'){
            // Pega o último caractere visível adicionado
            var text = el.textContent||'';
            var lastChar = text[text.length-1]||'';
            var code = lastChar.charCodeAt(0)||65;
            // Não toca para espaços, quebras e caracteres de controle
            if(code > 32 && code < 1000){
              window.sfxTypeKey(code);
            }
          }
        });
      });

      obs.observe(el, { childList:true, subtree:true, characterData:true });

      // Para o observer quando o timer terminar (texto completo)
      // Checa a cada 100ms se o timer sumiu (typewrite completo)
      var checkDone = setInterval(function(){
        var timer = getTimer();
        if(!timer){
          clearInterval(checkDone);
          // Aguarda mais um pouquinho antes de desconectar
          setTimeout(function(){ obs.disconnect(); }, 200);
        }
      }, 100);

    }, 10);
  }

  // ── CAMPANHA: áudio por planeta ──────────────────────────────
  function patchCampaignAudio(){

    // Mapa musical do planeta — música ambiente ao abrir o mapa
    var origOpenCampaignMap = window.openCampaignMap;
    window.openCampaignMap = function(){
      origOpenCampaignMap.apply(this, arguments);
      _playCampMapMusic();
    };

    // Ao fechar mapa da campanha — volta para menu
    var origCloseCampaignMap = window.closeCampaignMap;
    window.closeCampaignMap = function(){
      origCloseCampaignMap.apply(this, arguments);
      setTimeout(function(){ window.playMusic('menu'); }, 400);
    };

    // Ao iniciar fase da campanha — música do planeta específico
    var origStartCampaignPhase = window.startCampaignPhase;
    window.startCampaignPhase = function(){
      var phIdx = typeof campState!=='undefined' ? campState.currentPhase : 0;
      var ph = typeof CAMPAIGN_PHASES!=='undefined' ? CAMPAIGN_PHASES[phIdx] : null;
      origStartCampaignPhase.apply(this, arguments);
      if(ph && PLANET_MUSIC[ph.id]){
        // Música da história de intro — para logo antes do jogo começar
        _stopWithFade(0.5);
        setTimeout(function(){
          _playPlanetGameplayMusic(ph.id);
        }, 200);
      }
    };

    // Vitória de fase da campanha — fanfare + música de vitória
    var origShowCampVictory = window.showCampVictory;
    window.showCampVictory = function(ph){
      origShowCampVictory.apply(this, arguments);
      _stopWithFade(0.3);
      if(ph && ph.id && PLANET_MUSIC[ph.id]){
        setTimeout(function(){ playVictoryFanfare(ph.id); }, 400);
      }
    };

    // Botão de próxima fase após vitória (outro da campanha)
    var origCampVictoryNextOutro = window.campVictoryNextOutro;
    window.campVictoryNextOutro = function(){
      origCampVictoryNextOutro.apply(this, arguments);
      // Durante o outro — música calma de mapa novamente
      setTimeout(function(){ _playCampMapMusic(); }, 300);
    };

    // Ao fechar o modal de vitória da campanha
    var origCloseCampVictory = window.closeCampVictory;
    window.closeCampVictory = function(){
      origCloseCampVictory.apply(this, arguments);
      setTimeout(function(){ _playCampMapMusic(); }, 300);
    };

    // Ao concluir toda a campanha — música épica final
    var origShowCampFinal = window.showCampFinal;
    window.showCampFinal = function(){
      origShowCampFinal && origShowCampFinal.apply(this, arguments);
      _stopWithFade(0.5);
      setTimeout(function(){
        // Usa escala épica ascendente — plutão vitória
        if(PLANET_MUSIC.plutao) playVictoryFanfare('plutao');
      }, 600);
    };
  }

  // ── Funções de música específica ─────────────────────────────

  function _playCampMapMusic(){
    if(!window._audioEnabled_get()) return;
    if(window._currentMusicCtx_get && window._currentMusicCtx_get()==='campMap') return;
    window._playCustomLoop('campMap', CAMP_MAP_MUSIC.scale, CAMP_MAP_MUSIC.bpm, 0.8, false);
  }

  function _playPlanetGameplayMusic(planetId){
    if(!window._audioEnabled_get()) return;
    var p = PLANET_MUSIC[planetId];
    if(!p) return;
    var hasDrums = (p.gameplay.type==='mid'||p.gameplay.type==='high');
    window._playCustomLoop('planet_'+planetId, p.gameplay.scale, p.gameplay.bpm, 0.6, hasDrums);
  }

  function _stopWithFade(time){
    if(window.stopMusic) window.stopMusic();
  }

  // ── API: playCustomLoop ───────────────────────────────────────
  // Implementação de loop musical totalmente self-contained
  // (não depende do buildMusicLoop do engine base)
  var _customLoops = {};

  window._playCustomLoop = function(contextKey, scale, bpm, fadeIn, drums){
    if(!window._audioEnabled_get()) return;
    // Para qualquer loop atual
    _stopCustomLoops(0.6);
    if(window.stopMusic) window.stopMusic();

    var ac = getSharedAC();
    if(ac.state==='suspended') ac.resume();

    var step = 60/bpm;
    var loopLen = scale.length * step;

    var masterG = ac.createGain(); masterG.gain.value=0; masterG.connect(ac.destination);
    masterG.gain.setTargetAtTime(0.22, ac.currentTime, fadeIn||0.8);

    // Bass
    var bassG = ac.createGain(); bassG.gain.value=0.55; bassG.connect(masterG);
    var bassFilter = ac.createBiquadFilter(); bassFilter.type='lowpass'; bassFilter.frequency.value=350;
    var bassOsc = ac.createOscillator(); bassOsc.type='sawtooth';
    bassOsc.connect(bassFilter); bassFilter.connect(bassG);

    // Pad
    var padG = ac.createGain(); padG.gain.value=0.28; padG.connect(masterG);
    var padOsc = ac.createOscillator(); padOsc.type='sine'; padOsc.frequency.value=scale[0]/2;
    var padFilt = ac.createBiquadFilter(); padFilt.type='bandpass'; padFilt.frequency.value=400; padFilt.Q.value=2;
    padOsc.connect(padFilt); padFilt.connect(padG);

    // Lead
    var leadG = ac.createGain(); leadG.gain.value=0; leadG.connect(masterG);
    var leadOsc = ac.createOscillator(); leadOsc.type='square';
    var leadFilt = ac.createBiquadFilter(); leadFilt.type='highpass'; leadFilt.frequency.value=400;
    leadOsc.connect(leadFilt); leadFilt.connect(leadG);

    var now = ac.currentTime;

    function scheduleNotes(startT){
      scale.forEach(function(freq,i){
        var t = startT + i*step;
        bassOsc.frequency.setValueAtTime(freq/2, t);
        if(drums){
          leadOsc.frequency.setValueAtTime(freq*2, t);
          leadG.gain.setTargetAtTime(0.3, t, 0.02);
          leadG.gain.setTargetAtTime(0.0, t+step*0.65, 0.04);
        }
      });
      if(drums){
        for(var b=0;b<scale.length;b++){
          var bt = startT + b*step;
          schedDrum(bt, true);          // kick
          schedDrum(bt+step*0.5, false); // hihat off
          schedDrum(bt, false);          // hihat on
        }
      }
    }

    function schedDrum(time, isKick){
      var dur = isKick ? 0.22 : 0.04;
      var bufSize = Math.ceil(ac.sampleRate*dur);
      var buf = ac.createBuffer(1,bufSize,ac.sampleRate);
      var d=buf.getChannelData(0);
      for(var i=0;i<bufSize;i++) d[i]=(Math.random()*2-1)*(1-i/bufSize);
      var src=ac.createBufferSource(); src.buffer=buf;
      var f=ac.createBiquadFilter();
      if(isKick){f.type='lowpass';f.frequency.value=110;}
      else{f.type='highpass';f.frequency.value=4500;}
      var g=ac.createGain(); g.gain.value=isKick?0.65:0.15;
      src.connect(f); f.connect(g); g.connect(masterG);
      src.start(time); src.stop(time+dur+0.05);
    }

    bassOsc.start(now); padOsc.start(now); leadOsc.start(now);
    scheduleNotes(now);

    var loopId = contextKey+'_'+Date.now();
    var alive = true;

    var loopTimer = setTimeout(function loop(){
      if(!alive || !_customLoops[loopId]) return;
      var loopNow = ac.currentTime;
      scheduleNotes(loopNow);
      loopTimer = setTimeout(loop, loopLen*1000*0.92);
    }, loopLen*1000*0.93);

    _customLoops[loopId] = {
      masterG: masterG,
      oscs: [bassOsc, padOsc, leadOsc],
      loopTimer: loopTimer,
      alive: alive
    };
  };

  function _stopCustomLoops(fadeTime){
    var ac = getSharedAC();
    Object.keys(_customLoops).forEach(function(k){
      var l = _customLoops[k];
      if(l){
        try{ l.masterG.gain.setTargetAtTime(0, ac.currentTime, (fadeTime||0.5)/3); }catch(e){}
        clearTimeout(l.loopTimer);
        l.alive = false;
        setTimeout(function(){ l.oscs.forEach(function(o){ try{o.stop();}catch(e){} }); }, ((fadeTime||0.5)+0.3)*1000);
      }
    });
    _customLoops = {};
  }

  // Garante que ao chamar playMusic do engine base, os loops custom param
  var _origPlayMusic = window.playMusic;
  window.playMusic = function(contextKey){
    _stopCustomLoops(0.5);
    _origPlayMusic.apply(this, arguments);
  };

  // Expõe getter do contexto atual para verificações internas
  window._currentMusicCtx_get = function(){
    return Object.keys(_customLoops)[0] || null;
  };

  window._stopCustomLoops = _stopCustomLoops;

  // Mute must stop campaign/custom loops; unmute must restore campaign context
  var _origToggleAudio = window.toggleAudio;
  window.toggleAudio = function(){
    var on = _origToggleAudio.apply(this, arguments);
    if(!on){
      _stopCustomLoops(0.3);
    } else {
      var campMap = document.getElementById('campaignMapScreen');
      if(campMap && campMap.classList.contains('show')){
        _playCampMapMusic();
      } else if(typeof state !== 'undefined' && state.running && state._campPhaseId){
        _playPlanetGameplayMusic(state._campPhaseId);
      }
    }
    return on;
  };

  // ── Patching de _updateGameMusic para respeitar campanha ──
  // Durante campanha, a música por planeta deve prevalecer
  var _origUpdateGameMusic = window._updateGameMusic || function(){};
  window._updateGameMusic_base = _origUpdateGameMusic;

  // Redefinimos a função — se estiver em modo campanha, usa música do planeta
  // Caso contrário usa o comportamento padrão por onda
  var _origAdvWave = window.advanceWave;
  window.advanceWave = function(){
    _origAdvWave && _origAdvWave.apply(this, arguments);
    var isCamp = typeof campState!=='undefined' && campState.inProgress;
    if(!isCamp){
      // Modo livre — comportamento padrão (onda define música)
      // já tratado pelo engine base via window._updateGameMusic
    }
    // Em campanha os loops custom já tocam — não precisa trocar
  };

  console.log('[SpaceMath Audio+] Extensão de campanha e typewriter carregada.');

})();
// ============================================================
// END SPACEMATH AUDIO ENGINE — EXTENSÃO AVANÇADA
// ============================================================
