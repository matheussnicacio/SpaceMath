// ===== PLANET THEMES =====
const PLANET_THEMES = {
  default: {
    skyGrad: ['#12082a', '#1a1050', '#2a2060'],
    starColor: [255, 255, 255],
    surfaceColors: ['#c8b8e8', '#a898c8'],
    surfaceBorder: '#e8d8ff',
    craterColor: ['#9a88c8', '#8a78b8'],
    bgPlanet: null,
    bgPlanetStyle: '',
    ambientGlow:
      'radial-gradient(ellipse at 50% 100%, rgba(200, 180, 255, 0.2) 0%, transparent 55%),' +
      'radial-gradient(ellipse at 20% 20%, rgba(255, 140, 0, 0.08) 0%, transparent 45%),' +
      'radial-gradient(ellipse at 85% 25%, rgba(0, 229, 255, 0.1) 0%, transparent 45%)',
    shootingStars: true,
    extraElements: null,
    skyTintA: 'rgba(255, 105, 180, 0.14)',
    skyTintB: 'rgba(100, 220, 255, 0.16)',
    skyTintC: 'rgba(180, 130, 255, 0.12)',
  },
  mercurio: {
    skyGrad: ['#1a0800', '#2a1205', '#3a1a08'],
    starColor: [255, 200, 120],
    surfaceColors: ['#d8a878', '#b88858'],
    surfaceBorder: '#f0c898',
    craterColor: ['#a07048', '#906040'],
    bgPlanet: { x: '10%', y: '5%', size: '180px', emoji: '☀️', glow: 'rgba(255,120,0,0.6)', blur: '0px', opacity: 0.9 },
    ambientGlow:
      'radial-gradient(ellipse at 15% 10%, rgba(255,80,0,0.22) 0%, transparent 55%),' +
      'radial-gradient(ellipse at 80% 30%, rgba(255,160,80,0.1) 0%, transparent 45%)',
    shootingStars: false,
    extraElements:
      '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 12% 12%,rgba(255,100,0,0.14) 0%,transparent 50%);pointer-events:none;z-index:1;"></div>',
    skyTintA: 'rgba(255, 160, 60, 0.18)',
    skyTintB: 'rgba(255, 220, 120, 0.12)',
    skyTintC: 'rgba(255, 100, 0, 0.1)',
  },
  venus: {
    skyGrad: ['#180800', '#2a1000', '#3a1805'],
    starColor: [255, 180, 80],
    surfaceColors: ['#e8a868', '#c88848'],
    surfaceBorder: '#ffd090',
    craterColor: ['#b07030', '#985820'],
    bgPlanet: null,
    ambientGlow:
      'radial-gradient(ellipse at 50% 0%, rgba(255,120,40,0.22) 0%, transparent 60%),' +
      'radial-gradient(ellipse at 30% 70%, rgba(255,180,80,0.08) 0%, transparent 50%)',
    shootingStars: false,
    extraElements: `
      <div style="position:absolute;top:0;left:0;right:0;height:40%;z-index:1;pointer-events:none;overflow:hidden;">
        <div style="position:absolute;top:5%;left:-5%;right:-5%;height:80px;background:rgba(255,140,60,0.16);border-radius:50%;filter:blur(20px);animation:campPlanetFloat 5s ease-in-out infinite;"></div>
        <div style="position:absolute;top:15%;left:10%;right:10%;height:60px;background:rgba(255,100,40,0.12);border-radius:50%;filter:blur(25px);animation:campPlanetFloat 7s 1s ease-in-out infinite;"></div>
        <div style="position:absolute;top:2%;left:20%;right:20%;height:40px;background:rgba(255,180,80,0.1);border-radius:50%;filter:blur(15px);animation:campPlanetFloat 4s 2s ease-in-out infinite;"></div>
      </div>`,
    skyTintA: 'rgba(255, 140, 40, 0.16)',
    skyTintB: 'rgba(255, 200, 100, 0.14)',
    skyTintC: 'rgba(255, 80, 0, 0.1)',
  },
  marte: {
    skyGrad: ['#1a0400', '#2a0800', '#3a1005'],
    starColor: [255, 150, 120],
    surfaceColors: ['#d87858', '#b85838'],
    surfaceBorder: '#f09878',
    craterColor: ['#903820', '#782818'],
    bgPlanet: null,
    ambientGlow:
      'radial-gradient(ellipse at 50% 100%, rgba(255,80,40,0.18) 0%, transparent 50%),' +
      'radial-gradient(ellipse at 75% 20%, rgba(255,120,80,0.1) 0%, transparent 45%)',
    shootingStars: true,
    extraElements:
      '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 85%,rgba(200,60,30,0.12) 0%,transparent 50%);pointer-events:none;z-index:1;"></div>',
    skyTintA: 'rgba(255, 100, 60, 0.14)',
    skyTintB: 'rgba(255, 160, 100, 0.12)',
    skyTintC: 'rgba(200, 50, 30, 0.1)',
  },
  jupiter: {
    skyGrad: ['#0a0800', '#141008', '#201810'],
    starColor: [255, 220, 180],
    surfaceColors: ['#c8a868', '#a88848'],
    surfaceBorder: '#e8c888',
    craterColor: ['#886838', '#705028'],
    bgPlanet: { x: '75%', y: '3%', size: '220px', emoji: '⊕', glow: 'rgba(200,150,80,0.5)', blur: '2px', opacity: 0.55 },
    ambientGlow:
      'radial-gradient(ellipse at 78% 5%, rgba(255,180,80,0.18) 0%, transparent 45%),' +
      'radial-gradient(ellipse at 20% 60%, rgba(200,140,60,0.08) 0%, transparent 50%)',
    shootingStars: true,
    extraElements: null,
    skyTintA: 'rgba(255, 180, 80, 0.14)',
    skyTintB: 'rgba(255, 220, 140, 0.12)',
    skyTintC: 'rgba(180, 120, 40, 0.1)',
  },
  saturno: {
    skyGrad: ['#080a14', '#101828', '#182038'],
    starColor: [180, 220, 255],
    surfaceColors: ['#a8b8d8', '#8898b8'],
    surfaceBorder: '#c8d8f8',
    craterColor: ['#687898', '#586888'],
    bgPlanet: { x: '70%', y: '2%', size: '200px', emoji: '♄', glow: 'rgba(150,200,255,0.5)', blur: '1px', opacity: 0.6 },
    ambientGlow:
      'radial-gradient(ellipse at 73% 4%, rgba(120,180,255,0.16) 0%, transparent 45%),' +
      'radial-gradient(ellipse at 15% 50%, rgba(180,200,255,0.08) 0%, transparent 50%)',
    shootingStars: true,
    extraElements: null,
    skyTintA: 'rgba(150, 200, 255, 0.14)',
    skyTintB: 'rgba(180, 220, 255, 0.12)',
    skyTintC: 'rgba(100, 150, 220, 0.1)',
  },
  urano: {
    skyGrad: ['#040c14', '#081828', '#0c2438'],
    starColor: [150, 230, 255],
    surfaceColors: ['#88c8d8', '#68a8b8'],
    surfaceBorder: '#a8e8f8',
    craterColor: ['#4898a8', '#388898'],
    bgPlanet: { x: '72%', y: '4%', size: '190px', emoji: '⛢', glow: 'rgba(100,220,255,0.5)', blur: '1px', opacity: 0.55 },
    ambientGlow:
      'radial-gradient(ellipse at 75% 6%, rgba(80,220,255,0.16) 0%, transparent 45%),' +
      'radial-gradient(ellipse at 25% 40%, rgba(100,200,240,0.08) 0%, transparent 50%)',
    shootingStars: true,
    extraElements: null,
    skyTintA: 'rgba(80, 220, 255, 0.14)',
    skyTintB: 'rgba(150, 240, 255, 0.12)',
    skyTintC: 'rgba(60, 160, 220, 0.1)',
  },
  netuno: {
    skyGrad: ['#020410', '#040818', '#060c28'],
    starColor: [120, 150, 255],
    surfaceColors: ['#8898e8', '#6878c8'],
    surfaceBorder: '#a8b8ff',
    craterColor: ['#4858a8', '#384898'],
    bgPlanet: { x: '68%', y: '5%', size: '180px', emoji: '♆', glow: 'rgba(80,100,255,0.6)', blur: '1px', opacity: 0.6 },
    ambientGlow:
      'radial-gradient(ellipse at 71% 7%, rgba(80,100,255,0.18) 0%, transparent 45%),' +
      'radial-gradient(ellipse at 20% 55%, rgba(100,120,255,0.08) 0%, transparent 50%)',
    shootingStars: true,
    extraElements: null,
    skyTintA: 'rgba(100, 120, 255, 0.14)',
    skyTintB: 'rgba(150, 180, 255, 0.12)',
    skyTintC: 'rgba(60, 80, 200, 0.1)',
  },
  plutao: {
    skyGrad: ['#080410', '#100818', '#180c28'],
    starColor: [200, 180, 255],
    surfaceColors: ['#b898d8', '#9878b8'],
    surfaceBorder: '#d8b8f8',
    craterColor: ['#7858a0', '#684890'],
    bgPlanet: { x: '65%', y: '6%', size: '140px', emoji: '✦', glow: 'rgba(150,100,255,0.5)', blur: '2px', opacity: 0.5 },
    ambientGlow:
      'radial-gradient(ellipse at 68% 8%, rgba(150,100,255,0.14) 0%, transparent 45%),' +
      'radial-gradient(ellipse at 30% 45%, rgba(200,150,255,0.08) 0%, transparent 50%)',
    shootingStars: true,
    extraElements: null,
    skyTintA: 'rgba(180, 120, 255, 0.14)',
    skyTintB: 'rgba(220, 180, 255, 0.12)',
    skyTintC: 'rgba(120, 80, 200, 0.1)',
  },
};

const GAME_STAR_PALETTE = [
  { cls: 'star-white', weight: 0.32 },
  { cls: 'star-yellow', weight: 0.22 },
  { cls: 'star-cyan', weight: 0.2 },
  { cls: 'star-pink', weight: 0.14 },
  { cls: 'star-purple', weight: 0.12 },
];

let _currentPlanetTheme = 'default';

const GAME_SKY_EFFECTS_HTML =
  '<div class="game-scene-nebula"></div>' +
  '<div class="game-scene-aurora"></div>' +
  '<div id="gameColorStars"></div>' +
  '<div id="gameSparkles"></div>' +
  '<div class="game-float-icons">' +
  '<span class="game-float-icon" style="--x:10%;--y:14%;--d:0s">✨</span>' +
  '<span class="game-float-icon" style="--x:82%;--y:10%;--d:1.4s">🌟</span>' +
  '<span class="game-float-icon" style="--x:72%;--y:38%;--d:2.6s">⭐</span>' +
  '<span class="game-float-icon" style="--x:18%;--y:48%;--d:0.9s">💫</span>' +
  '</div>';

function ensureGameSkyEffects(area) {
  let box = document.getElementById('gameSkyEffects');
  if (!box) {
    box = document.createElement('div');
    box.id = 'gameSkyEffects';
    const canvas = document.getElementById('spaceCanvas');
    if (canvas && canvas.nextSibling) area.insertBefore(box, canvas.nextSibling);
    else area.appendChild(box);
  }
  if (!box.querySelector('.game-scene-nebula')) {
    box.className = 'game-sky-effects';
    box.setAttribute('aria-hidden', 'true');
    box.innerHTML = GAME_SKY_EFFECTS_HTML;
  }
  return box;
}

function pickGameStarColor() {
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < GAME_STAR_PALETTE.length; i++) {
    acc += GAME_STAR_PALETTE[i].weight;
    if (r < acc) return GAME_STAR_PALETTE[i].cls;
  }
  return GAME_STAR_PALETTE[0].cls;
}

function applyGameSkyTheme(theme) {
  const box = document.getElementById('gameSkyEffects');
  if (!box) return;
  box.style.setProperty('--game-nebula-a', theme.skyTintA || 'rgba(255, 105, 180, 0.14)');
  box.style.setProperty('--game-nebula-b', theme.skyTintB || 'rgba(100, 220, 255, 0.16)');
  box.style.setProperty('--game-nebula-c', theme.skyTintC || 'rgba(180, 130, 255, 0.12)');
}

function populateGameColorStars(container, count) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'game-px-star ' + pickGameStarColor();
    const sz = Math.random() < 0.12 ? 4 : Math.random() < 0.35 ? 3 : Math.random() < 0.55 ? 2 : 1;
    s.style.cssText =
      'width:' +
      sz +
      'px;height:' +
      sz +
      'px;left:' +
      (Math.random() * 100).toFixed(1) +
      '%;top:' +
      (Math.random() * 78).toFixed(1) +
      '%;--d:' +
      (1.2 + Math.random() * 2.8).toFixed(1) +
      's;--dl:' +
      (Math.random() * 4).toFixed(1) +
      's;';
    container.appendChild(s);
  }
}

function populateGameSparkles(container) {
  container.innerHTML = '';
  const chars = ['✨', '⭐', '·', '✦'];
  for (let i = 0; i < 12; i++) {
    const sp = document.createElement('span');
    sp.className = 'game-menu-sparkle';
    sp.textContent = chars[i % chars.length];
    sp.style.left = (8 + Math.random() * 84).toFixed(1) + '%';
    sp.style.top = (8 + Math.random() * 65).toFixed(1) + '%';
    sp.style.setProperty('--dur', (3 + Math.random() * 4).toFixed(1) + 's');
    sp.style.setProperty('--dl', (Math.random() * 5).toFixed(1) + 's');
    sp.style.setProperty('--sz', (8 + Math.random() * 8).toFixed(0) + 'px');
    container.appendChild(sp);
  }
}

function initGameSkyEffects(theme, area) {
  const box = ensureGameSkyEffects(area);
  applyGameSkyTheme(theme);
  const starsEl = document.getElementById('gameColorStars');
  const sparklesEl = document.getElementById('gameSparkles');
  const w = area.offsetWidth || 800;
  const count = Math.min(95, Math.max(60, Math.floor((w * area.offsetHeight) / 14000)));
  if (starsEl) populateGameColorStars(starsEl, count);
  if (sparklesEl) populateGameSparkles(sparklesEl);
}

function applyPlanetTheme(planetId) {
  _currentPlanetTheme = planetId || 'default';
  const theme = PLANET_THEMES[_currentPlanetTheme] || PLANET_THEMES.default;
  const area = getGameArea();

  area.style.background =
    'radial-gradient(ellipse 90% 55% at 50% 110%, rgba(168, 85, 247, 0.12) 0%, transparent 55%),' +
    'linear-gradient(180deg, ' +
    theme.skyGrad[0] +
    ' 0%, ' +
    theme.skyGrad[1] +
    ' 50%, ' +
    theme.skyGrad[2] +
    ' 100%)';

  initGameSkyEffects(theme, area);

  let glowEl = document.getElementById('planetGlowOverlay');
  if (!glowEl) {
    glowEl = document.createElement('div');
    glowEl.id = 'planetGlowOverlay';
    glowEl.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;';
    area.appendChild(glowEl);
  }
  glowEl.style.background = theme.ambientGlow || '';

  let atmosEl = document.getElementById('planetAtmosEl');
  if (atmosEl) atmosEl.remove();
  if (theme.extraElements) {
    atmosEl = document.createElement('div');
    atmosEl.id = 'planetAtmosEl';
    atmosEl.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;';
    atmosEl.innerHTML = theme.extraElements;
    area.insertBefore(atmosEl, area.firstChild);
  }

  let bgPlanetEl = document.getElementById('bgPlanetOrb');
  if (bgPlanetEl) bgPlanetEl.remove();
  if (theme.bgPlanet) {
    bgPlanetEl = document.createElement('div');
    bgPlanetEl.id = 'bgPlanetOrb';
    const p = theme.bgPlanet;
    bgPlanetEl.style.cssText =
      'position:absolute;left:' +
      p.x +
      ';top:' +
      p.y +
      ';font-size:' +
      p.size +
      ';filter:drop-shadow(0 0 40px ' +
      p.glow +
      ') blur(' +
      p.blur +
      ');opacity:' +
      p.opacity +
      ';pointer-events:none;z-index:2;animation:campPlanetFloat 8s ease-in-out infinite;';
    bgPlanetEl.textContent = p.emoji;
    area.insertBefore(bgPlanetEl, area.firstChild);
  }

  const surf = document.getElementById('moonSurface');
  if (surf) {
    surf.style.background =
      'linear-gradient(to bottom, ' + theme.surfaceColors[0] + ' 0%, ' + theme.surfaceColors[1] + ' 100%)';
    surf.style.borderTopColor = theme.surfaceBorder;
  }
  document.querySelectorAll('.crater').forEach(function (c) {
    c.style.background =
      'radial-gradient(circle, ' + theme.craterColor[0] + ' 0%, ' + theme.craterColor[1] + ' 100%)';
  });

  const earth = document.getElementById('earth');
  if (earth) earth.style.display = planetId && planetId !== 'default' ? 'none' : '';
}

function initBackground(planetId) {
  _currentPlanetTheme = planetId || _currentPlanetTheme || 'default';
  const theme = PLANET_THEMES[_currentPlanetTheme] || PLANET_THEMES.default;
  const canvas = document.getElementById('spaceCanvas');
  const area = getGameArea();
  if (!canvas || !area) return;

  canvas.width = area.offsetWidth;
  canvas.height = area.offsetHeight;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const [sr, sg, sb] = theme.starColor;
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 1.2;
    const a = Math.random() * 0.35 + 0.08;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + sr + ',' + sg + ',' + sb + ',' + a + ')';
    ctx.fill();
  }

  initGameSkyEffects(theme, area);

  if (shootingStarInterval) {
    clearInterval(shootingStarInterval);
    shootingStarInterval = null;
  }
  if (theme.shootingStars) {
    shootingStarInterval = setInterval(spawnShootingStar, 3500 + Math.random() * 4500);
    setTimeout(spawnShootingStar, 800);
  }
}

function spawnShootingStar() {
  if (!state.running) return;
  const area = getGameArea();
  const el = document.createElement('div');
  el.className = 'shoot-star game-shoot-star';
  el.style.left = Math.random() * 65 + '%';
  el.style.top = Math.random() * 42 + '%';
  el.style.setProperty('--angle', (-20 - Math.random() * 30).toFixed(0) + 'deg');
  el.style.setProperty('--len', (50 + Math.random() * 60).toFixed(0) + 'px');
  area.appendChild(el);
  setTimeout(function () {
    el.remove();
  }, 1100);
}
