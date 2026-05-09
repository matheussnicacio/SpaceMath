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

  // Add a mute button to the HUD
  window.addEventListener('load', function(){
    var hud = document.getElementById('hudStats')||document.getElementById('statsPanel');
    if(!hud) return;
    var muteBtn = document.createElement('button');
    muteBtn.id = 'audioToggleBtn';
    muteBtn.title = 'Ativar/Desativar Som';
    muteBtn.innerHTML = '🔊';
    muteBtn.style.cssText = 'position:fixed;bottom:12px;right:12px;z-index:9999;background:rgba(0,20,40,0.85);border:1px solid rgba(0,229,255,0.3);color:#00e5ff;border-radius:8px;padding:6px 10px;cursor:pointer;font-size:16px;transition:all 0.2s;';
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
// Campanha por planeta, Multiverso por dimensão, e
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

  // ── Paletas de notas para cada Dimensão do Multiverso ────────
  var MV_MUSIC = {
    mv_percent: { scale:[261,311,370,440,370,311,261,220], bpm:118, color:'#f59e0b' },  // % — dourado, flutuante
    mv_prob:    { scale:[220,261,294,349,294,261,220,196], bpm:115, color:'#06b6d4' },  // probabilidade — ciano, calmo
    mv_stat:    { scale:[196,220,247,294,330,294,247,220], bpm:112, color:'#10b981' },  // estatística — verde, analítico
    mv_sqrt:    { scale:[185,207,247,311,370,311,247,207], bpm:116, color:'#f43f5e' },  // raiz — vermelho, preciso
    mv_med:     { scale:[174,196,233,277,330,277,233,196], bpm:120, color:'#8b5cf6' }   // grandezas — violeta, épico
  };

  // ── Menu da Campanha — ambiente épico de mapa estelar ────────
  var CAMP_MAP_MUSIC = { scale:[131,147,165,196,220,196,165,147], bpm:82 };

  // ── Menu do Multiverso — ambiente dimensional, misterioso ────
  var MV_MAP_MUSIC = { scale:[116,130,155,185,207,185,155,130], bpm:72 };

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

    // === 3. _mvStoryTypewrite (histórias do Multiverso) ===
    var orig_mvTypewrite = window._mvStoryTypewrite;
    window._mvStoryTypewrite = function(idx){
      orig_mvTypewrite.apply(this, arguments);
      _patchTypewriteEl(
        function(){ return document.getElementById('mvStTxt'+idx); },
        function(){ return mvState && mvState.storyTwTimer; },
        function(v){ if(mvState) mvState.storyTwTimer = v; }
      );
    };

    // ── Hooks de campanha ────────────────────────────────────────
    patchCampaignAudio();

    // ── Hooks de multiverso ─────────────────────────────────────
    patchMultiversoAudio();

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

  // ── MULTIVERSO: áudio por dimensão ───────────────────────────
  function patchMultiversoAudio(){

    // Mapa do multiverso — música dimensional misteriosa
    var origOpenMultiversoMap = window.openMultiversoMap;
    window.openMultiversoMap = function(){
      origOpenMultiversoMap.apply(this, arguments);
      _playMvMapMusic();
    };

    // Fechar mapa do multiverso
    var origCloseMultiversoMap = window.closeMultiversoMap;
    window.closeMultiversoMap = function(){
      origCloseMultiversoMap.apply(this, arguments);
      setTimeout(function(){ window.playMusic('menu'); }, 400);
    };

    // Selecionar dimensão — efeito sonoro de portal + começa música
    var origSelectMvDimension = window.selectMvDimension;
    window.selectMvDimension = function(idx){
      origSelectMvDimension.apply(this, arguments);
      _sfxPortal();
    };

    // Iniciar fase do multiverso — música da dimensão específica
    var origStartMvPhase = window.startMvPhase;
    window.startMvPhase = function(idx){
      var ph = typeof MULTIVERSO_PHASES!=='undefined' ? MULTIVERSO_PHASES[idx] : null;
      origStartMvPhase.apply(this, arguments);
      if(ph && MV_MUSIC[ph.id]){
        _stopWithFade(0.4);
        setTimeout(function(){
          _playMvDimensionMusic(ph.id);
        }, 200);
      }
    };

    // Vitória de dimensão do multiverso
    var origCompleteMvPhase = window.completeMvPhase;
    window.completeMvPhase = function(phId){
      origCompleteMvPhase.apply(this, arguments);
      _stopWithFade(0.3);
      setTimeout(function(){ _sfxDimensionClear(phId); }, 300);
    };

    // Tela final do multiverso
    var origShowMvFinal = window._showMvFinal;
    window._showMvFinal = function(){
      origShowMvFinal && origShowMvFinal.apply(this, arguments);
      _stopWithFade(0.5);
      setTimeout(function(){ _sfxMultiversoComplete(); }, 400);
    };
  }

  // ── Funções de música específica ─────────────────────────────

  function _playCampMapMusic(){
    if(!window._audioEnabled_get()) return;
    if(window._currentMusicCtx_get && window._currentMusicCtx_get()==='campMap') return;
    window._playCustomLoop('campMap', CAMP_MAP_MUSIC.scale, CAMP_MAP_MUSIC.bpm, 0.8, false);
  }

  function _playMvMapMusic(){
    if(!window._audioEnabled_get()) return;
    window._playCustomLoop('mvMap', MV_MAP_MUSIC.scale, MV_MAP_MUSIC.bpm, 1.5, false);
  }

  function _playPlanetGameplayMusic(planetId){
    if(!window._audioEnabled_get()) return;
    var p = PLANET_MUSIC[planetId];
    if(!p) return;
    var hasDrums = (p.gameplay.type==='mid'||p.gameplay.type==='high');
    window._playCustomLoop('planet_'+planetId, p.gameplay.scale, p.gameplay.bpm, 0.6, hasDrums);
  }

  function _playMvDimensionMusic(mvId){
    if(!window._audioEnabled_get()) return;
    var m = MV_MUSIC[mvId];
    if(!m) return;
    window._playCustomLoop('mv_'+mvId, m.scale, m.bpm, 1.2, false);
  }

  function _stopWithFade(time){
    if(window.stopMusic) window.stopMusic();
  }

  // ── SFX Especiais ────────────────────────────────────────────

  // Portal do multiverso — woosh tonal
  function _sfxPortal(){
    if(!window._audioEnabled_get()) return;
    var ac = getSharedAC();
    var t = ac.currentTime;
    var master = ac.createGain(); master.gain.value=0.3; master.connect(ac.destination);
    // Sweep tonal ascendente
    var o = ac.createOscillator(); o.type='sine';
    o.frequency.setValueAtTime(200,t);
    o.frequency.exponentialRampToValueAtTime(1200,t+0.6);
    var g = ac.createGain();
    g.gain.setValueAtTime(0.6,t);
    g.gain.exponentialRampToValueAtTime(0.001,t+0.7);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t+0.75);
    // Reverb sintético (eco)
    var o2 = ac.createOscillator(); o2.type='triangle';
    o2.frequency.setValueAtTime(400,t+0.2);
    o2.frequency.exponentialRampToValueAtTime(800,t+0.7);
    var g2 = ac.createGain();
    g2.gain.setValueAtTime(0.2,t+0.2);
    g2.gain.exponentialRampToValueAtTime(0.001,t+0.9);
    o2.connect(g2); g2.connect(master);
    o2.start(t+0.2); o2.stop(t+0.95);
  }

  // Dimensão liberada — jingle cristalino
  function _sfxDimensionClear(mvId){
    if(!window._audioEnabled_get()) return;
    var ac = getSharedAC();
    var t = ac.currentTime;
    var master = ac.createGain(); master.gain.value=0.3; master.connect(ac.destination);
    var mvCol = MV_MUSIC[mvId];
    var scale = mvCol ? mvCol.scale : [523,659,784,1047];
    // Arpegio cristalino
    scale.slice(0,6).forEach(function(freq,i){
      var o=ac.createOscillator(); o.type='triangle'; o.frequency.value=freq*2;
      var g=ac.createGain();
      g.gain.setValueAtTime(0,t+i*0.08);
      g.gain.linearRampToValueAtTime(0.5,t+i*0.08+0.02);
      g.gain.exponentialRampToValueAtTime(0.001,t+i*0.08+0.4);
      o.connect(g); g.connect(master);
      o.start(t+i*0.08); o.stop(t+i*0.08+0.45);
    });
    // Noise sparkle
    if(window.sfxCorrect) setTimeout(function(){ window.sfxCorrect(3); }, 600);
  }

  // Multiverso completo — épico
  function _sfxMultiversoComplete(){
    if(!window._audioEnabled_get()) return;
    var ac = getSharedAC();
    var t = ac.currentTime;
    var master = ac.createGain(); master.gain.value=0.35; master.connect(ac.destination);
    var epic = [261,329,392,523,659,784,1047,784,659,523,392,523];
    epic.forEach(function(freq,i){
      var o=ac.createOscillator(); o.type='square'; o.frequency.value=freq;
      var g=ac.createGain();
      g.gain.setValueAtTime(0,t+i*0.12);
      g.gain.linearRampToValueAtTime(0.6,t+i*0.12+0.03);
      g.gain.exponentialRampToValueAtTime(0.001,t+i*0.12+0.5);
      o.connect(g); g.connect(master);
      o.start(t+i*0.12); o.stop(t+i*0.12+0.55);
    });
    if(window.sfxCombo) setTimeout(function(){ window.sfxCombo(); }, 800);
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

  // ── Patching de _updateGameMusic para respeitar campanha/MV ──
  // Durante campanha ou MV, a música por planeta/dimensão deve prevalecer
  var _origUpdateGameMusic = window._updateGameMusic || function(){};
  window._updateGameMusic_base = _origUpdateGameMusic;

  // Redefinimos a função — se estiver em modo campanha/MV, usa música do planeta
  // Caso contrário usa o comportamento padrão por onda
  // (Nota: _origUpdateGameMusic é a versão do engine base que lê state.wave)
  // Para ser seguro, verificamos se há um loop custom ativo de planeta
  var _origAdvWave = window.advanceWave;
  window.advanceWave = function(){
    _origAdvWave && _origAdvWave.apply(this, arguments);
    // Se estiver em modo campanha, ajusta intensidade mas não troca a música por onda
    var isCamp = typeof campState!=='undefined' && campState.inProgress;
    var isMv   = typeof mvState!=='undefined' && mvState.inProgress;
    if(!isCamp && !isMv){
      // Modo livre — comportamento padrão (onda define música)
      // já tratado pelo engine base via window._updateGameMusic
    }
    // Em campanha/MV os loops custom já tocam — não precisa trocar
  };

  console.log('[SpaceMath Audio+] Extensão de campanha, multiverso e typewriter carregada.');

})();
// ============================================================
// END SPACEMATH AUDIO ENGINE — EXTENSÃO AVANÇADA
// ============================================================


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
        instructor: { emoji: '🧑‍🏫', name: 'COMTE. VEGA' } }
    ],
    progress: { reactor:false, hangar:false, lab:false, comms:false, training:false },
    currentRoom: null,
    stats: {
      totalSolutions: 0,
      stationsVisited: 0,
      timeStarted: null,
      bonusInsights: 0   // descobertas extras (formas alternativas, propriedades)
    }
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

      card.innerHTML =
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
        skipBtn.classList.add('sonar-active');
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
      skipBtn.classList.add('sonar-active');
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
    ], function(){ reactorBuildStage(); });
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
          '<button class="alex-action-btn" onclick="reactorReset()">↺ LIMPAR</button>' +
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
      toast('Passou do alvo! Use ↺ LIMPAR para tentar de novo.', 'warn');
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
        reactorNext()
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
      dlgStart([
        '<strong>Excelente, Cadete!</strong> Você acabou de descobrir algo que muitos professores tentam ensinar com fórmulas.',
        'A <em>adição é apenas uma maneira de combinar coisas</em>. Não importa se você usa cristais grandes ou pequenos — o resultado é o mesmo.',
        '<span class="acc-green">Esse é o segredo da matemática: existem caminhos diferentes para o mesmo destino.</span>',
        'Continue para a próxima estação. O <strong>Tenente Diff</strong> espera você no Hangar.'
      ], function(){
        document.getElementById('alexTaskBar').style.display = 'none';
        document.getElementById('alexStationStage').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;"><button class="alex-action-btn green" onclick="exitAlexStation()">◄ VOLTAR AO MAPA</button></div>';
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
    ], function(){ hangarBuildStage(); });
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
          '<button class="alex-action-btn" onclick="hangarDeselect()">↺ DESMARCAR</button>' +
          '<button class="alex-action-btn cyan" id="hgDispatchBtn" onclick="hangarDispatch()" disabled>📤 DESPACHAR <span id="hgDispatchN">0</span></button>' +
        '</div>' +
      '</div>';

    hangarRenderCrates();
  }

  function hangarRenderCrates(){
    var area = document.getElementById('hgArea');
    area.innerHTML = '';
    HANGAR.crates.forEach(function(c){
      if(c.gone) return;
      var el = document.createElement('div');
      el.className = 'hangar-crate' + (c.sel ? ' selected' : '');
      el.textContent = '📦';
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
      dlgStart([
        'Cadete, você captou. <strong>Subtrair é remover</strong>. Não é decorar — é <em>tirar de algo o que precisa sair</em>.',
        'Notei como você varia: às vezes uma a uma, às vezes em lotes. <span class="acc-green">Os dois funcionam.</span> Importa o resultado.',
        'A <strong>Engenheira Kaya</strong> espera você no Laboratório. Cuidado com os cristais — são frágeis.'
      ], function(){
        document.getElementById('alexTaskBar').style.display = 'none';
        document.getElementById('alexStationStage').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;"><button class="alex-action-btn green" onclick="exitAlexStation()">◄ VOLTAR AO MAPA</button></div>';
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
    ], function(){ labBuildStage(); });
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
          '<button class="alex-action-btn green" onclick="labSubmit()" id="labSubmitBtn">✓ REGISTRAR ARRANJO</button>' +
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
    }
  };

  window.labNext = function(){
    LAB.taskIdx++;
    if(LAB.taskIdx < LAB.tasks.length){
      labBuildStage();
    } else {
      completeStation('lab');
      dlgStart([
        'Cadete! Você notou? <strong>3×4 e 4×3 dão o mesmo resultado.</strong> Isso tem nome: <em>comutatividade</em>.',
        'Mas o que importa não é o nome. É que você <span class="acc-green">descobriu por si mesmo</span> — não decorou.',
        'A multiplicação <strong>é uma forma de organizar coisas em retângulos</strong>. Sempre que vir uma, pense no retângulo.',
        'Vá ao <strong>Capitão Pyx</strong>, na Estação de Comunicação. Ele tem antenas para distribuir.'
      ], function(){
        document.getElementById('alexTaskBar').style.display = 'none';
        document.getElementById('alexStationStage').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;"><button class="alex-action-btn green" onclick="exitAlexStation()">◄ VOLTAR AO MAPA</button></div>';
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
    ], function(){ commsBuildStage(); });
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
          '<button class="alex-action-btn" onclick="commsReset()">↺ REINICIAR</button>' +
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
      toast('Estoque vazio! Use ↺ REINICIAR ou avance.', 'info');
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
      } else if(rest > 0 && (maxCount === quotient + 1) && (minCount === quotient)){
        // divisão com resto bem distribuída
        toast('🎯 Divisão com resto! ' + t.total + ' ÷ ' + t.colonies + ' = <strong>' + quotient + '</strong> + resto <strong>' + rest + '</strong>. Algumas colônias ficaram com 1 a mais.', 'success');
        ALEX.stats.totalSolutions++;
        document.getElementById('commsNextBtn').disabled = false;
      } else {
        toast('Estoque acabou, mas a distribuição não está equilibrada. Use ↺ REINICIAR.', 'warn');
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
      dlgStart([
        'Cadete, esse último teve <strong>resto</strong>. Notou? 17 ÷ 4 = 4 com resto 1.',
        'A divisão nem sempre é exata. <em>Às vezes sobra. Às vezes falta. E está tudo bem.</em>',
        'O que você descobriu vale para qualquer divisão na vida — <span class="acc-green">repartir é dar a cada um o mesmo, mas o que sobra é parte da resposta também</span>.',
        'Apenas a Comandante Vega te espera agora. Sala de Treinamento. <strong>É o último teste.</strong>'
      ], function(){
        document.getElementById('alexTaskBar').style.display = 'none';
        document.getElementById('alexStationStage').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;"><button class="alex-action-btn green" onclick="exitAlexStation()">◄ VOLTAR AO MAPA</button></div>';
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
    ], function(){ trainingBuildStage(); });
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
          '<span class="training-eq-empty">Digite uma expressão. Ex: 6+6, 4×3, 24÷2, (3+1)×3…</span>' +
        '</div>' +
        '<div class="training-keypad">' + keypad + '</div>' +
        '<div class="training-rank" id="trainRank">PATENTE ATUAL: <span class="num">CADETE</span> — 0 SOLUÇÕES</div>' +
        '<div class="training-solutions">' +
          '<div class="training-sol-title">▼ SOLUÇÕES VÁLIDAS DESCOBERTAS ▼</div>' +
          '<div class="training-sol-chips" id="trainSolChips"><span style="color:var(--text-dim);font-family:Exo 2;font-size:11px;font-style:italic;">Nenhuma ainda. Construa uma expressão e toque ✓ TESTAR.</span></div>' +
        '</div>' +
        '<div class="training-controls">' +
          '<button class="alex-action-btn cyan" onclick="trainingTest()">✓ TESTAR EXPRESSÃO</button>' +
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
      box.innerHTML = '<span class="training-eq-empty">Digite uma expressão. Ex: 6+6, 4×3, 24÷2, (3+1)×3…</span>';
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
      toast('🌟 Você atingiu o mínimo necessário! Pode avançar — ou continuar descobrindo.', 'success');
      document.getElementById('trainNextBtn').disabled = false;
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
      dlgStart([
        'Cadete… <strong>você passou em todos os treinamentos</strong>.',
        'Mas sabe o que mais me impressionou? <em>Você nunca usou a mesma resposta duas vezes</em>.',
        'A matemática não é uma só coisa. <span class="acc-green">É uma ferramenta com mil formas.</span> E você sabe usá-las.',
        '<strong>Está pronto.</strong> Volte ao mapa. Sua cerimônia está esperando.',
        'A partir de hoje, ninguém mais vai te chamar de Cadete.'
      ], function(){
        document.getElementById('alexTaskBar').style.display = 'none';
        document.getElementById('alexStationStage').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;"><button class="alex-action-btn green" onclick="exitAlexStation()">◄ VOLTAR AO MAPA</button></div>';
      });
    }
  };

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
      '<div class="ceremony-stat-value">' + Object.values(ALEX.progress).filter(function(v){return v;}).length + ' / 5</div>' +
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
// ═══════════════════════════════════════════════════════════════════════════
// END — A HISTÓRIA DE ALEX LUNAR
// ═══════════════════════════════════════════════════════════════════════════

