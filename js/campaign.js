// =====================================================
// ========== MODO CAMPANHA — ALEX LUNAR ==============
// =====================================================

// --- CAMPAIGN SKINS (exclusive, not in wave unlocks) ---
const CAMP_SKINS = [
  { id:'camp_mercurio', name:'Mercurial', icon:'☿', desc:'Traje forjado no calor extremo de Mercúrio. Resiste ao sol mais próximo.', suit:'#c0a060', visor:'#ff6600', accent:'#805020', chest:'#a07030', glow:'rgba(255,100,0,0.6)' },
  { id:'camp_venus', name:'Vênus', icon:'♀', desc:'Traje que sobreviveu ao inferno ácido de Vênus. Lendário.', suit:'#e8c860', visor:'#ffa500', accent:'#c8a840', chest:'#b08030', glow:'rgba(255,165,0,0.6)' },
  { id:'camp_marte', name:'Marciano', icon:'♂', desc:'Traje de guerra usado nas batalhas das planícies vermelhas de Marte.', suit:'#8b2500', visor:'#ff4422', accent:'#660e00', chest:'#5a1000', glow:'rgba(220,50,20,0.7)' },
  { id:'camp_jupiter', name:'Joviano', icon:'⊕', desc:'Traje gigante para um planeta gigante. A tempestade não pode te parar.', suit:'#c8a060', visor:'#ff8c44', accent:'#886040', chest:'#9a7040', glow:'rgba(200,140,60,0.6)' },
  { id:'camp_saturno', name:'Saturnino', icon:'♄', desc:'Traje com anéis de proteção. Ninguém passa pelos seus escudos.', suit:'#d4b06a', visor:'#ffd080', accent:'#a08040', chest:'#b09050', glow:'rgba(220,180,100,0.6)' },
  { id:'camp_urano', name:'Urânio', icon:'⛢', desc:'Traje criogênico das geleiras de Urano. Tão frio quanto preciso.', suit:'#88cccc', visor:'#00ffdd', accent:'#60aaaa', chest:'#508888', glow:'rgba(0,220,200,0.6)' },
  { id:'camp_netuno', name:'Netuniano', icon:'♆', desc:'Traje do fundo do sistema solar. Guardião do abismo profundo.', suit:'#2244aa', visor:'#4488ff', accent:'#113388', chest:'#1a2a8a', glow:'rgba(68,136,255,0.7)' },
  { id:'camp_plutao', name:'Defensor Final', icon:'✦', desc:'Traje definitivo do último defensor. Conquistou todos os mundos conhecidos.', suit:'#1a0a30', visor:'#ffd700', accent:'#4a2870', chest:'#2a1050', glow:'rgba(180,100,255,0.8)' },
];

// Each planet = a phase with 3 waves
const CAMPAIGN_PHASES = [
  {
    id: 'mercurio', name: 'MERCÚRIO', emoji: '☿', color: '#c0a060',
    glowColor: 'rgba(192,160,96,0.25)',
    bg: 'radial-gradient(ellipse at 50% 80%, #2a1500 0%, #0d0800 60%)',
    diff: 'easy', diffLabel: 'Fácil',
    speedMult: 1.0, spawnMult: 1.0, numMax: 10,
    lore: 'Primeira parada: Mercúrio. As temperaturas extremas não são problema — mas os invasores sim.',
    introStory: [
      { icon: '☿', title: 'MERCÚRIO\nO INÍCIO DA JORNADA', text: 'O <strong>rádio de longo alcance</strong> trouxe notícias terríveis. A frota alienígena que atacou a Lua era apenas a vanguarda.\n\nSeu <em>destino final: o Sistema Solar inteiro</em>. Planeta por planeta, mundo por mundo.\n\nComo único defensor humano operacional, Alex Lunar recebeu uma missão impossível.', slideNum: 'MISSÃO 1 · 1/3' },
      { icon: '🌡️', title: 'O PLANETA\nMAIS QUENTE', text: 'Mercúrio — o planeta mais próximo do Sol. <strong>430°C durante o dia</strong>, -180°C à noite.\n\nAs naves alienígenas se aproveitaram das temperaturas extremas para desativar os <em>sistemas de defesa automáticos</em> do posto avançado.\n\nSó o calor humano pode salvar o lugar.', slideNum: 'MISSÃO 1 · 2/3' },
      { icon: '⚔️', title: 'DEFENDA\nMERCÚRIO!', text: 'Os colonos mercurianos se abrigaram nas cavernas de chumbo fundido. Só você pode comprar o tempo que eles precisam para evacuar.\n\n<strong>3 ondas de invasores</strong> chegam em formação cerrada.\n\n<span class="grnn">Use o laser matemático. Não deixe nenhuma nave pousar!</span>', slideNum: 'MISSÃO 1 · 3/3' }
    ],
    outroStory: [
      { icon: '🎉', title: 'MERCÚRIO\nLIBERTADO!', text: '<strong>As últimas naves fugiram</strong> em chamas para o espaço aberto. Os colonos de Mercúrio saíram das cavernas aplaudindo.\n\nA <em>transmissão foi captada</em> em toda a frota inimiga. Eles sabem que Alex Lunar é real.\n\n<span class="grnn">Mas a jornada mal começou...</span>', slideNum: 'DESFECHO 1 · 1/2' },
      { icon: '🚨', title: 'PRÓXIMA PARADA:\nVÊNUS', text: 'Os radares captaram movimento. A frota se reorganizou e <strong>avançou para Vênus</strong>.\n\nVênus é ainda mais hostil — nuvens de <em>ácido sulfúrico</em> e pressão atmosférica esmagadora.\n\n<span class="redd">Alex Lunar parte imediatamente. Não há tempo a perder.</span>', slideNum: 'DESFECHO 1 · 2/2' }
    ],
    campSkinId: 'camp_mercurio',
  },
  {
    id: 'venus', name: 'VÊNUS', emoji: '♀', color: '#ffa500',
    glowColor: 'rgba(255,165,0,0.22)',
    bg: 'radial-gradient(ellipse at 50% 60%, #301500 0%, #0d0700 60%)',
    diff: 'easy', diffLabel: 'Fácil+',
    speedMult: 1.2, spawnMult: 0.95, numMax: 12,
    lore: 'Vênus é o inferno do sistema solar. Mas nem o inferno pode parar Alex Lunar.',
    introStory: [
      { icon: '♀', title: 'VÊNUS\nO PLANETA INFERNAL', text: 'A temperatura de Vênus derreteria qualquer metal comum. As naves alienígenas, porém, <strong>prosperaram neste ambiente</strong>.\n\nO <em>calor extremo carregou os escudos delas</em>, tornando os cálculos mais intensos e as equações mais complexas.\n\nMas Alex Lunar já não é o mesmo de antes.', slideNum: 'MISSÃO 2 · 1/3' },
      { icon: '☁️', title: 'NUVENS\nDE ÁCIDO', text: 'Voar em Vênus é voar no <strong>inferno ácido</strong>. As naves mergulham de dentro das nuvens de ácido sulfúrico, aproveitando a cobertura.\n\nO visual é comprometido — elas aparecem <em>mais rápido que o esperado</em>.\n\nSua reação matemática precisa ser mais veloz.', slideNum: 'MISSÃO 2 · 2/3' },
      { icon: '🔥', title: 'HORA DE\nACENDER O LASER!', text: 'Os colonos venusianos vivem em <strong>estações flutuantes nas nuvens</strong> — longe do solo mortal.\n\nSe as naves atingirem as estações, <em>não haverá mais onde escapar</em>.\n\n<span class="grnn">Defenda Vênus. Mantenha as estações de pé!</span>', slideNum: 'MISSÃO 2 · 3/3' }
    ],
    outroStory: [
      { icon: '🌟', title: 'VÊNUS\nEM PAZ!', text: 'As últimas naves <strong>explodiram nas nuvens ácidas</strong> — uma bela ironia poética.\n\nAs estações flutuantes soaram o alarme de vitória. Os colonos, em <em>gratidão eterna</em>, batizaram uma névoa com o nome de Alex Lunar.\n\n<span class="grnn">O herói não parou para comemorar.</span>', slideNum: 'DESFECHO 2 · 1/2' },
      { icon: '♂', title: 'MARTE\nEM CHAMAS', text: 'As transmissões de Marte chegaram cortadas por estática de batalha. <strong>A guerra lá é diferente</strong> — mais brutal, mais rápida.\n\nOs invasores evoluíram. Aprenderam com as derrotas em Mercúrio e Vênus.\n\n<span class="redd">Marte será diferente. Prepare-se, Capitão.</span>', slideNum: 'DESFECHO 2 · 2/2' }
    ],
    campSkinId: 'camp_venus',
  },
  {
    id: 'marte', name: 'MARTE', emoji: '♂', color: '#dd3300',
    glowColor: 'rgba(220,50,20,0.22)',
    bg: 'radial-gradient(ellipse at 50% 70%, #2a0500 0%, #080200 60%)',
    diff: 'medium', diffLabel: 'Médio',
    speedMult: 1.0, spawnMult: 1.0, numMax: 20,
    lore: 'O planeta vermelho da guerra. Os invasores trouxeram suas forças mais agressivas para Marte.',
    introStory: [
      { icon: '♂', title: 'MARTE\nPLANETA DE GUERRA', text: 'Desde os primórdios, humanos olharam para Marte e pensaram em batalhas. <strong>A profecia se cumpriu</strong>.\n\nOs invasores trouxeram para Marte sua <em>frota de elite</em> — naves tipo 2, velozes e imprevisíveis. Elas não pousam: elas <strong>mergulham</strong>.\n\nO solo vermelho ficará ainda mais vermelho.', slideNum: 'MISSÃO 3 · 1/3' },
      { icon: '🔴', title: 'AS PLANÍCIES\nDE VALLES MARINERIS', text: 'A batalha se desenrolará sobre <strong>Valles Marineris</strong> — o maior cânion do sistema solar.\n\nAs naves alienígenas usam as paredes do cânion para <em>aparecer de ângulos inesperados</em>, tornando o tracking visual ainda mais difícil.\n\nOs cálculos agora chegam a 20. Prepare sua mente.', slideNum: 'MISSÃO 3 · 2/3' },
      { icon: '⚡', title: 'PROTEÇÃO\nDAS COLÔNIAS', text: 'As cúpulas coloniais de Marte abrigam <strong>50.000 pessoas</strong>. Uma nave que pousar pode destruir tudo.\n\nOs invasores sabem disso. Esta é a razão pela qual eles <em>concentraram tantas forças aqui</em>.\n\n<span class="grnn">Marte não pode cair. A humanidade conta com você.</span>', slideNum: 'MISSÃO 3 · 3/3' }
    ],
    outroStory: [
      { icon: '🏆', title: 'AS PLANÍCIES\nSÃO NOSSAS!', text: 'As últimas naves da elite alienígena <strong>recuaram para o espaço profundo</strong>. Nunca tinham sofrido três derrotas consecutivas.\n\nOs colonos de Marte saíram das cúpulas. A poeira vermelha formava redemoinhos ao redor de <em>Alex Lunar — o herói da humanidade</em>.\n\n<span class="grnn">Mas o sistema solar é imenso...</span>', slideNum: 'DESFECHO 3 · 1/2' },
      { icon: '⊕', title: 'JÚPITER\nO GIGANTE CHAMA', text: 'Júpiter. <strong>O maior planeta do sistema solar</strong>. Sua gravidade puxa tudo — incluindo frotas inimigas inteiras.\n\nSe Júpiter cair, sua gravidade transformará a frota alienígena em uma arma de destruição planetária.\n\n<span class="redd">O destino do sistema solar depende desta próxima batalha.</span>', slideNum: 'DESFECHO 3 · 2/2' }
    ],
    campSkinId: 'camp_marte',
  },
  {
    id: 'jupiter', name: 'JÚPITER', emoji: '⊕', color: '#c89040',
    glowColor: 'rgba(200,144,60,0.22)',
    bg: 'radial-gradient(ellipse at 50% 50%, #1a0d00 0%, #060300 60%)',
    diff: 'medium', diffLabel: 'Médio+',
    speedMult: 1.2, spawnMult: 0.92, numMax: 20,
    lore: 'O gigante dos gigantes. A batalha mais épica até agora acontece entre as luas de Júpiter.',
    introStory: [
      { icon: '⊕', title: 'JÚPITER\nO COLOSSO', text: '<strong>1.300 Terras caberiam dentro de Júpiter</strong>. Quando algo tão grande é ameaçado, o cosmos sente.\n\nA frota invasora orbitou Júpiter por dias, <em>estudando as correntes de vento</em> da Grande Mancha Vermelha para usá-las como cobertura.\n\nEles são cada vez mais inteligentes.', slideNum: 'MISSÃO 4 · 1/3' },
      { icon: '🌪️', title: 'LUAS EM\nPERIGO', text: 'Europa, Ganimedes, Io — as luas de Júpiter são <strong>mundos em si mesmos</strong>. Europa guarda um oceano sob o gelo que pode abrigar vida extraterrestre humana.\n\nSe a frota usar Júpiter como base, <em>todas as luas serão capturadas</em>.\n\nPrecisamos de mais que habilidade. Precisamos de precisão perfeita.', slideNum: 'MISSÃO 4 · 2/3' },
      { icon: '🔢', title: 'NÚMEROS\nMAIORES, MENTE\nMAIS FORTE', text: 'Os escudos das naves evoluíram. Os cálculos chegam a <strong>números de dois dígitos</strong>.\n\nMas Alex Lunar também evoluiu. Cada batalha anterior treinou a mente — <em>mais rápida, mais precisa</em>.\n\n<span class="grnn">Mostre o que um humano é capaz. Salve Júpiter!</span>', slideNum: 'MISSÃO 4 · 3/3' }
    ],
    outroStory: [
      { icon: '🌟', title: 'O GIGANTE\nFOI SALVO!', text: 'A Grande Mancha Vermelha testemunhou algo <strong>nunca visto: a derrota da frota de elite alienígena</strong>.\n\nEuropa, Ganimedes, Io — as luas cantaram nas frequências de rádio. Os cientistas das estações orbitais <em>gravaram o sinal e o chamaram de A Sinfonia de Alex</em>.\n\n<span class="grnn">O herói sorriu. Apenas por um segundo.</span>', slideNum: 'DESFECHO 4 · 1/2' },
      { icon: '♄', title: 'SATURNO\nOS ANÉIS CHACOALHAM', text: '<strong>Os anéis de Saturno vibram</strong> com a aproximação da frota. Os sensores registraram perturbações gravitacionais — centenas de naves se escondendo nos anéis de gelo e rocha.\n\nÉ uma armadilha clássica alienígena. <em>Eles planejaram isso desde o início.</em>\n\n<span class="redd">Alex Lunar parte em direção aos anéis. Não tem escolha.</span>', slideNum: 'DESFECHO 4 · 2/2' }
    ],
    campSkinId: 'camp_jupiter',
  },
  {
    id: 'saturno', name: 'SATURNO', emoji: '♄', color: '#d4b06a',
    glowColor: 'rgba(212,176,106,0.22)',
    bg: 'radial-gradient(ellipse at 50% 40%, #1a1400 0%, #060500 60%)',
    diff: 'hard', diffLabel: 'Difícil',
    speedMult: 1.0, spawnMult: 1.0, numMax: 50,
    lore: 'Os anéis de Saturno escondem uma armadilha alienígena. O maior campo minado do sistema solar.',
    introStory: [
      { icon: '♄', title: 'SATURNO\nA ARMADILHA DOS ANÉIS', text: 'Os anéis de Saturno — <strong>bilhões de pedaços de gelo e rocha</strong> em órbita perfeita — agora escondem a maior frota já vista.\n\nOs invasores <em>desligaram seus motores</em>, deixando as naves deslizarem nos anéis como detritos inocentes. Radar: cego.\n\nSó os olhos de um humano podem distingui-las.', slideNum: 'MISSÃO 5 · 1/3' },
      { icon: '🧊', title: 'GELO E\nFOGO CRUZADO', text: 'As temperaturas perto de Saturno chegam a <strong>-178°C</strong>. O traje de Alex Lunar opera no limite.\n\nO pior? As naves aparecem de múltiplas direções ao mesmo tempo — cada anel de Saturno <em>servindo como rampa de lançamento oculta</em>.\n\nDificuldade: máxima. Recompensa: imensa.', slideNum: 'MISSÃO 5 · 2/3' },
      { icon: '🎯', title: 'CÁLCULOS ATÉ 50\nSEM ERROS', text: 'Esta batalha exige o que há de melhor em você. Os escudos das naves agora exibem <strong>operações que chegam a 50</strong> — multiplicações, divisões, tudo mais complexo.\n\nMas você chegou até aqui. <em>Cada planeta te moldou.</em>\n\n<span class="grnn">Os anéis de Saturno serão o seu palco mais glorioso.</span>', slideNum: 'MISSÃO 5 · 3/3' }
    ],
    outroStory: [
      { icon: '💎', title: 'OS ANÉIS\nBRILHAM NOVAMENTE', text: 'Com as últimas naves destruídas, os anéis de Saturno voltaram ao seu brilho natural — mas agora com <strong>rastros de detritos alienígenas</strong> entre o gelo.\n\nOs astrônomos de todo o sistema solar assistiram ao vivo. <em>Alex Lunar se tornou um mito ainda vivo.</em>\n\n<span class="grnn">Mas ainda há mais para lutar.</span>', slideNum: 'DESFECHO 5 · 1/2' },
      { icon: '⛢', title: 'URANO\nDE LADO', text: 'Urano é o planeta mais estranho do sistema solar — <strong>rotaciona de lado</strong>, como se algo gigantesco o tivesse derrubado no passado.\n\nAgora uma frota alienígena usa esta inclinação para lançar naves em ângulos impossíveis, <em>impossivelmente difíceis de rastrear</em>.\n\n<span class="redd">O próximo desafio é o mais tecnicamente exigente.</span>', slideNum: 'DESFECHO 5 · 2/2' }
    ],
    campSkinId: 'camp_saturno',
  },
  {
    id: 'urano', name: 'URANO', emoji: '⛢', color: '#88cccc',
    glowColor: 'rgba(100,200,200,0.22)',
    bg: 'radial-gradient(ellipse at 50% 40%, #001520 0%, #010507 60%)',
    diff: 'hard', diffLabel: 'Difícil+',
    speedMult: 1.25, spawnMult: 0.9, numMax: 50,
    lore: 'O planeta inclinado. Lançamentos de naves em ângulos impossíveis — o caos matemático total.',
    introStory: [
      { icon: '⛢', title: 'URANO\nO MUNDO INCLINADO', text: 'Urano gira de lado — <strong>seu eixo inclinado 98°</strong> cria estações extremas: 42 anos de dia, 42 de noite.\n\nOs invasores dominaram esse ângulo. Eles lançam as naves <em>em espiral descendente</em> para confundir os sistemas de mira.\n\nSeu cérebro precisa recalibrar completamente.', slideNum: 'MISSÃO 6 · 1/3' },
      { icon: '💨', title: 'VENTOS\nDE 900 KM/H', text: 'Os ventos de Urano chegam a <strong>900 km/h</strong>. As naves alienígenas surfam essas correntes como projéteis.\n\nÉ quase impossível prever a trajetória delas. <em>O padrão muda a cada onda.</em>\n\nMas você não precisa prever — você precisa calcular. Rápido. Sem erros.', slideNum: 'MISSÃO 6 · 2/3' },
      { icon: '🧊', title: 'GELO E\nMATEMÁTICA', text: 'As estações de pesquisa de Urano <strong>são únicas no universo humano</strong>. Elas estudam formas de vida criogênicas que podem existir no oceano de água supercrítica sob as nuvens.\n\nSe essas estações caírem, <em>décadas de pesquisa são perdidas</em>.\n\n<span class="grnn">Defenda a ciência. Defenda Urano.</span>', slideNum: 'MISSÃO 6 · 3/3' }
    ],
    outroStory: [
      { icon: '🌊', title: 'URANO\nPROTEGIDO!', text: 'As estações de pesquisa soaram o alarme de fim de batalha. Pela primeira vez, <strong>os cientistas pararam seus experimentos</strong> para aplaudir.\n\nUm deles transmitiu ao vivo: <em>"Alex Lunar não é apenas humano. É o que toda a humanidade quer ser."</em>\n\n<span class="grnn">Ainda falta o penúltimo desafio.</span>', slideNum: 'DESFECHO 6 · 1/2' },
      { icon: '♆', title: 'NETUNO\nAS TREVAS PROFUNDAS', text: 'Netuno. <strong>O planeta mais afastado</strong>. A fronteira do sistema solar. Onde a luz do Sol chega fraca e o frio é total.\n\nÉ aqui que a frota alienígena montou seu <em>quartel-general definitivo</em>. A base que comanda tudo.\n\n<span class="redd">Se Netuno não for liberado, a guerra nunca acaba.</span>', slideNum: 'DESFECHO 6 · 2/2' }
    ],
    campSkinId: 'camp_urano',
  },
  {
    id: 'netuno', name: 'NETUNO', emoji: '♆', color: '#4488ff',
    glowColor: 'rgba(68,136,255,0.22)',
    bg: 'radial-gradient(ellipse at 50% 30%, #000d1a 0%, #020508 60%)',
    diff: 'hard', diffLabel: 'Difícil++',
    speedMult: 1.4, spawnMult: 0.88, numMax: 50,
    lore: 'A base-mãe alienígena. O quartel-general final. Destrua isto e a guerra pode acabar... certo?',
    introStory: [
      { icon: '♆', title: 'NETUNO\nO FIM DO SISTEMA', text: '<strong>4,5 bilhões de km do Sol</strong>. Aqui a escuridão é quase total. Aqui é onde os invasores construíram sua maior instalação.\n\nA base-mãe orbitando Netuno coordena toda a invasão. <em>Cada planeta atacado recebeu ordens daqui.</em>\n\nDestruí-la não é apenas uma batalha — é a declaração de vitória.', slideNum: 'MISSÃO 7 · 1/3' },
      { icon: '❄️', title: 'O FRIO\nQUE CONGELA TUDO', text: 'A temperatura perto de Netuno é de <strong>-214°C</strong>. Até os motores das naves alienígenas sofrem com o frio.\n\nMas não o suficiente. Elas ainda voam. Ainda mergulham. Ainda tentam destruir o que é humano.\n\n<em>Você precisará ser perfeito aqui.</em>', slideNum: 'MISSÃO 7 · 2/3' },
      { icon: '💀', title: 'ÚLTIMA CHANCE\nNÃO HÁ RECUO', text: 'Se a base-mãe não for destruída hoje, os invasores vão se reagrupar, aprender com todas as derrotas anteriores e <strong>lançar uma contra-invasão definitiva</strong>.\n\nAlex Lunar tem apenas este momento. <em>Esta batalha define o destino da humanidade.</em>\n\n<span class="redd">Sem recuo. Sem falhas. Por todos os planetas.</span>', slideNum: 'MISSÃO 7 · 3/3' }
    ],
    outroStory: [
      { icon: '💥', title: 'A BASE-MÃE\nDESTRUÍDA!', text: 'A última nave da base-mãe explodiu em <strong>uma nuvem de luz azul</strong> que foi visível de Netuno à Lua.\n\nOs sistemas de comunicação alienígenas silenciaram. A frota dispersa, sem comando, recuou para o espaço profundo.\n\n<span class="grnn">Foi o maior silêncio que Alex Lunar já ouviu.</span>', slideNum: 'DESFECHO 7 · 1/2' },
      { icon: '✦', title: 'MAS PLUTÃO\nAINDA CHAMA...', text: 'Os sensores captaram um último sinal. Fraco, mas organizado. Vindo de Plutão.\n\nUm <strong>batalhão final</strong> alienígena, isolado, esperando. <em>Um último desafio.</em>\n\n<span class="redd">Alex Lunar olhou para a escuridão além de Netuno. E foi.</span>', slideNum: 'DESFECHO 7 · 2/2' }
    ],
    campSkinId: 'camp_netuno',
  },
  {
    id: 'plutao', name: 'PLUTÃO', emoji: '✦', color: '#aa88ff',
    glowColor: 'rgba(170,136,255,0.25)',
    bg: 'radial-gradient(ellipse at 50% 50%, #05001a 0%, #020108 70%)',
    diff: 'hard', diffLabel: 'Lendário',
    speedMult: 1.6, spawnMult: 0.85, numMax: 50,
    lore: 'O planeta anão além de tudo. O último bastião alienígena. A batalha final da campanha.',
    introStory: [
      { icon: '✦', title: 'PLUTÃO\nO FIM DE TUDO', text: '<strong>Plutão. O planeta anão.</strong> Técnicamente, não é nem um planeta. Mas para Alex Lunar, é o fim de uma jornada impossível.\n\nO batalhão final aguardava aqui. Eles sabiam que se chegaste até aqui, <em>és diferente de qualquer humano que existiu antes</em>.\n\nEles foram enviados para te derrotar de uma vez por todas.', slideNum: 'MISSÃO FINAL · 1/3' },
      { icon: '🌑', title: 'A ESCURIDÃO\nABSOLUTA', text: 'Neste ponto do sistema solar, o Sol é <strong>apenas uma estrela brilhante</strong> entre milhares. A luz demora 5,5 horas para chegar aqui.\n\nEsta batalha acontece na quase-escuridão absoluta. As naves saem das sombras como pesadelos.\n\n<em>Sua mente é a única luz que importa.</em>', slideNum: 'MISSÃO FINAL · 2/3' },
      { icon: '🎖️', title: 'POR TODOS\nOS MUNDOS', text: 'Mercúrio. Vênus. Marte. Júpiter. Saturno. Urano. Netuno. <strong>Cada planeta que você defendeu</strong> está contando com você agora.\n\nSete mundos respiram porque você escolheu lutar. <em>O oitavo espera sua decisão.</em>\n\n<span class="grnn">Esta é sua última missão, Capitão. Faça-a valer.</span>', slideNum: 'MISSÃO FINAL · 3/3' }
    ],
    outroStory: [
      { icon: '🎖️', title: 'VITÓRIA\nFINAL!', text: 'A última nave alienígena desapareceu na escuridão de Plutão. <strong>Não havia mais nenhuma.</strong>\n\nNo silêncio gelado além do sistema solar, Alex Lunar ficou imóvel por longos segundos.\n\n<span class="grnn">Oito mundos. Uma mente. Uma vitória.</span>', slideNum: 'FIM DA CAMPANHA · 1/2' },
      { icon: '🌌', title: 'A MEDALHA\nDE HONRA', text: 'De Mercúrio a Plutão, cada planeta livre é um testamento. <strong>A humanidade venceu não com bombas, mas com matemática.</strong>\n\nO Conselho Interplanetário criou uma medalha especial — jamais concedida antes.\n\n<em>A Medalha de Honra de Defensor de Todos os Mundos.</em>', slideNum: 'FIM DA CAMPANHA · 2/2' }
    ],
    campSkinId: 'camp_plutao',
  },
];

// --- CAMPAIGN STATE ---
let campState = {
  currentPhase: 0,       // 0..7 index of CAMPAIGN_PHASES
  completedPhases: [],   // array of completed phase IDs
  unlockedSkins: [],     // campaign skin IDs unlocked
  activePlanetIndex: null,
  storyMode: null,       // 'intro' or 'outro'
  storySlide: 0,
  storyTwTimer: null,
  inProgress: false,     // currently playing a campaign phase
  campWave: 1,           // current wave within the 3-wave phase (1,2,3)
};

(function loadCampState(){
  try {
    const s = localStorage.getItem('spacemath_campaign_v1');
    if(s){ const d=JSON.parse(s); campState.currentPhase=d.currentPhase||0; campState.completedPhases=d.completedPhases||[]; campState.unlockedSkins=d.unlockedSkins||[]; }
  } catch(e){}
  // Unlock skins for completed phases
  campState.completedPhases.forEach(pid=>{
    const ph=CAMPAIGN_PHASES.find(p=>p.id===pid);
    if(ph && !campState.unlockedSkins.includes(ph.campSkinId)){
      campState.unlockedSkins.push(ph.campSkinId);
    }
  });
})();

function saveCampState(){
  try { localStorage.setItem('spacemath_campaign_v1', JSON.stringify({currentPhase:campState.currentPhase,completedPhases:campState.completedPhases,unlockedSkins:campState.unlockedSkins})); } catch(e){}
}

// --- OPEN / CLOSE MAP ---
function openCampaignMap(){
  document.getElementById('startScreen').classList.add('hidden');
  renderCampaignMap();
  initCampStars();
  document.getElementById('campaignMapScreen').classList.add('show');
}
function closeCampaignMap(){
  document.getElementById('campaignMapScreen').classList.remove('show');
  document.getElementById('startScreen').classList.remove('hidden');
  closePlanetInfo();
}

// --- RENDER MAP ---
function renderCampaignMap(){
  const row = document.getElementById('campPlanetsRow');
  row.innerHTML = '';
  const completed = campState.completedPhases.length;
  const total = CAMPAIGN_PHASES.length;
  document.getElementById('campProgressText').textContent = completed+' / '+total+' PLANETAS';
  document.getElementById('campProgressFill').style.width = (completed/total*100)+'%';

  CAMPAIGN_PHASES.forEach((ph,i)=>{
    // Connector
    if(i>0){
      const conn=document.createElement('div');
      conn.className='camp-planet-connector'+(campState.completedPhases.includes(CAMPAIGN_PHASES[i-1].id)?' done':'');
      row.appendChild(conn);
    }
    const isDone = campState.completedPhases.includes(ph.id);
    const isCurrent = i === campState.currentPhase && !isDone;
    const isLocked = i > campState.currentPhase;
    const node = document.createElement('div');
    node.className='camp-planet-node'+(isDone?' completed':'')+(isCurrent?' current':'')+(isLocked?' locked':'');
    // Planet sizes vary
    const sizes=[44,48,46,56,54,46,50,42];
    const sz=sizes[i]||46;
    // Wave progress dots
    let waveDots='';
    const phData = campState.phaseWaveData ? campState.phaseWaveData[ph.id] : null;
    for(let w=1;w<=3;w++){
      const cls = isDone ? 'done' : '';
      waveDots+=`<div class="camp-wave-dot ${cls}"></div>`;
    }
    node.innerHTML=`
      <div class="camp-planet-orb" style="width:${sz}px;height:${sz}px;" >
        <span class="camp-planet-emoji" style="font-size:${sz-10}px;--float-dur:${3.5+i*0.3}s;--float-delay:${i*0.25}s">${ph.emoji}</span>
        ${isDone?'<div class="camp-planet-check">✓</div>':''}
        ${isLocked?'<div class="camp-planet-lock">🔒</div>':''}
      </div>
      <div class="camp-planet-name">${ph.name}</div>
      <div class="camp-planet-diff">${ph.diffLabel}</div>
      <div class="camp-planet-waves">${waveDots}</div>
    `;
    if(!isLocked){
      node.addEventListener('click',()=>showPlanetInfo(i));
    }
    row.appendChild(node);
  });
}

function showPlanetInfo(idx){
  const ph=CAMPAIGN_PHASES[idx];
  campState.activePlanetIndex=idx;
  const isDone=campState.completedPhases.includes(ph.id);
  document.getElementById('campInfoIcon').textContent=ph.emoji;
  document.getElementById('campInfoName').textContent=ph.name;
  document.getElementById('campInfoLore').textContent=ph.lore;
  const badgesEl=document.getElementById('campInfoBadges');
  badgesEl.innerHTML=`
    <span class="camp-info-badge diff-${ph.diff}">${ph.diffLabel}</span>
    <span class="camp-info-badge wave-badge">3 ONDAS</span>
    <span class="camp-info-badge skin-badge">🎨 Skin: ${_getCampSkin(ph.campSkinId).name}</span>
    ${isDone?'<span class="camp-info-badge skin-badge">✓ CONCLUÍDO</span>':''}
  `;
  const playBtn=document.getElementById('campPlayBtn');
  playBtn.disabled=false;
  playBtn.textContent=isDone?'↺ REPLAY':'⚔ MISSÃO!';
  document.getElementById('campPlanetInfo').classList.add('show');
}
function closePlanetInfo(){
  document.getElementById('campPlanetInfo').classList.remove('show');
  campState.activePlanetIndex=null;
}

function _getCampSkin(id){ return CAMP_SKINS.find(s=>s.id===id)||CAMP_SKINS[0]; }

// --- START CAMPAIGN PHASE ---
function startCampaignPhase(){
  const idx=campState.activePlanetIndex;
  if(idx===null)return;
  const ph=CAMPAIGN_PHASES[idx];
  campState.inProgress=true;
  campState.campWave=1;
  campState.activePlanetIndex=idx;
  closePlanetInfo();
  // Show intro story
  openCampStory(ph, 'intro', ()=>{
    // After intro, start the actual game with campaign parameters
    document.getElementById('campaignMapScreen').classList.remove('show');
    _startCampGamePhase(ph);
  });
}

// --- CAMPAIGN GAME SETUP ---
function _startCampGamePhase(ph){
  const diffCfg = DIFF[ph.diff] || DIFF.easy;
  // Override with campaign-specific params
  state.difficulty = ph.diff;
  state.lives = diffCfg.lives;
  state.ufoSpeed = diffCfg.speed * ph.speedMult;
  state.spawnInterval = Math.floor(diffCfg.spawn * ph.spawnMult);
  state.maxUfos = diffCfg.maxUfos;
  // Patch numMax
  state._campNumMax = ph.numMax;
  state.score=0; state.wave=1; state.waveTime=0;
  state.correct=0; state.errors=0; state.ufos=[];
  state.lastSkinUnlockWave=0;
  state.running=true; state.paused=false;
  // Campaign waves: 3 waves then end
  state._campPhaseId = ph.id;
  state._campWavesDone = 0;
  state._campTotalWaves = 3;
  // Show campaign HUD
  document.getElementById('campHudBar').classList.add('show');
  document.getElementById('campHudPlanet').textContent=ph.emoji;
  document.getElementById('campHudName').textContent=ph.name;
  document.getElementById('campHudWaveNum').textContent='1';
  // Equip campaign skin (visual only)
  const cSkin=_getCampSkin(ph.campSkinId);
  const astroEl=document.getElementById('astronaut');
  if(astroEl) astroEl.innerHTML=buildAstronautSVG(cSkin);
  // Standard game start
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('gameOverScreen').classList.add('hidden');
  document.getElementById('pauseScreen').classList.add('hidden');
  applyPlanetTheme(ph.id); initBackground(ph.id); refreshAreaDims(); updateHUD(); clearDisplay();
  updateAbilityHud();
  const ann=document.getElementById('waveAnnounce');
  ann.textContent='ONDA 1'; ann.style.display='block';
  ann.style.animation='none'; void ann.offsetWidth;
  ann.style.animation='waveAnim 2.5s ease-out forwards';
  setTimeout(()=>ann.style.display='none',2500);
  clearInterval(gameLoop); clearInterval(spawnLoop);
  gameLoop=setInterval(()=>{if(!state.running||state.paused)return;moveUFOs();tickWave();},33);
  spawnLoop=setInterval(spawnUFO,state.spawnInterval);
  setTimeout(spawnUFO,800);
}

// Patch advanceWave to handle campaign 3-wave limit
const _campOrigAdvance = advanceWave;
advanceWave = function(){
  if(state._campPhaseId){
    // Check if this is a Multiverso phase
    var isMvPhase = typeof mvState!=='undefined' && mvState.inProgress && mvState.currentPhaseId === state._campPhaseId;
    // Campaign mode
    state._campWavesDone++;
    if(!isMvPhase){
      document.getElementById('campHudWaveNum').textContent=(state.wave+1).toString();
    } else {
      document.getElementById('mvHudWaveNum').textContent=Math.min(state.wave+1,3);
    }
    if(state._campWavesDone >= state._campTotalWaves){
      if(isMvPhase){
        // MV phase complete
        setTimeout(function(){ completeMvPhase(mvState.currentPhaseId); }, 500);
      } else {
        // Normal campaign phase complete
        setTimeout(()=>_onCampPhaseComplete(), 500);
      }
      return;
    }
    // Still has waves — do normal advance but don't trigger skin unlocks
    state.wave++;
    state.waveTime=0;
    state.ufoSpeed=Math.min(state.ufoSpeed+0.1,3.5);
    state.spawnInterval=Math.max(1500,state.spawnInterval-150);
    state.maxUfos=Math.min(7,state.maxUfos+1);
    clearInterval(spawnLoop);
    spawnLoop=setInterval(spawnUFO,state.spawnInterval);
    const ann=document.getElementById('waveAnnounce');
    ann.textContent=`ONDA ${state.wave}`; ann.style.display='block';
    ann.style.animation='none'; void ann.offsetWidth;
    ann.style.animation='waveAnim 2.5s ease-out forwards';
    setTimeout(()=>ann.style.display='none',2500);
    updateHUD();
    // HUD update
    if(!isMvPhase){
      document.getElementById('campHudWaveNum').textContent=state.wave.toString();
    } else {
      document.getElementById('mvHudWaveNum').textContent=Math.min(state.wave,3);
    }
    return;
  }
  _campOrigAdvance();
};

function _onCampPhaseComplete(){
  state.running=false;
  clearInterval(gameLoop); gameLoop=null;
  clearInterval(spawnLoop); spawnLoop=null;
  if(shootingStarInterval){ clearInterval(shootingStarInterval); shootingStarInterval=null; }
  state.ufos.forEach(u=>{try{u.el.remove()}catch(e){}});
  state.ufos=[];
  document.getElementById('campHudBar').classList.remove('show');
  const phaseId=state._campPhaseId;
  state._campPhaseId=null;
  state._campWavesDone=0;
  const phIdx=CAMPAIGN_PHASES.findIndex(p=>p.id===phaseId);
  const ph=CAMPAIGN_PHASES[phIdx];
  // Mark as completed
  if(!campState.completedPhases.includes(phaseId)){
    campState.completedPhases.push(phaseId);
    if(phIdx+1 > campState.currentPhase) campState.currentPhase=phIdx+1;
    // Unlock campaign skin
    const cSkin=_getCampSkin(ph.campSkinId);
    if(!campState.unlockedSkins.includes(ph.campSkinId)){
      campState.unlockedSkins.push(ph.campSkinId);
      // Also add to main skins unlocked list
      if(!skinState.unlocked.includes(ph.campSkinId)){
        skinState.unlocked.push(ph.campSkinId);
        saveSkins();
      }
    }
    saveCampState();
  }
  // Show victory modal
  showCampVictory(ph);
}

function showCampVictory(ph){
  const cSkin=_getCampSkin(ph.campSkinId);
  document.getElementById('campVictoryMedal').textContent=ph.emoji;
  document.getElementById('campVictoryTitle').textContent=ph.name+' LIBERTADO!';
  document.getElementById('campVicSub').textContent=`Missão concluída com sucesso! ${ph.name} está livre dos invasores.`;
  const skinBox=document.getElementById('campVictorySkinBox');
  skinBox.style.display='flex';
  document.getElementById('campVictorySkinSVG').innerHTML=buildAstronautSVG(cSkin, 0.85);
  document.getElementById('campVictorySkinName').textContent='SKIN: '+cSkin.name.toUpperCase();
  document.getElementById('campVictorySkinDesc').textContent=cSkin.desc;
  document.getElementById('campVictoryModal').classList.add('show');
  // Store current ph for outro callback
  document.getElementById('campVictoryModal')._currentPh = ph;
}
function campVictoryNextOutro(){
  const ph=document.getElementById('campVictoryModal')._currentPh;
  document.getElementById('campVictoryModal').classList.remove('show');
  document.getElementById('startScreen').classList.add('hidden');
  // Show outro
  openCampStory(ph, 'outro', ()=>{
    // After outro, check if campaign complete
    if(campState.completedPhases.length >= CAMPAIGN_PHASES.length){
      showCampFinal();
    } else {
      openCampaignMap();
    }
  });
}
function closeCampVictory(){
  document.getElementById('campVictoryModal').classList.remove('show');
  openCampaignMap();
}

// --- CAMPAIGN STORY SYSTEM ---
let _campStoryCallback=null;
let _campStorySlide=0;
let _campStorySlides=[];
let _campStoryTwTimer=null;

function openCampStory(ph, mode, callback){
  _campStoryCallback=callback;
  _campStorySlide=0;
  _campStorySlides = mode==='intro' ? ph.introStory : ph.outroStory;
  document.getElementById('campStoryEmoji').textContent=ph.emoji;
  document.getElementById('campStoryPlanetName').textContent=ph.name;
  document.getElementById('campStoryType').textContent=mode==='intro'?'PRÓLOGO':'DESFECHO';
  _campBuildStorySlides(ph, mode);
  _campBuildStoryDots();
  document.getElementById('campStoryScreen').classList.add('show');
  _campStoryGoTo(0);
}

// ===== ANIMATED STORY SCENE BUILDER =====
function _buildStoryScene(ph, sl, mode, idx) {
  // Each slide key is composed from planet id + slide index for unique scenes
  const sceneKey = ph.id + '_' + mode + '_' + idx;

  // Generate star background HTML
  function stars(count, color='255,255,255') {
    let s = '';
    for(let i=0;i<count;i++){
      const x=Math.random()*100, y=Math.random()*100;
      const sz=Math.random()*2+0.5, op=Math.random()*0.6+0.2;
      const dur=(Math.random()*3+1.5).toFixed(1), dl=(Math.random()*3).toFixed(1);
      s+=`<div style="position:absolute;left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;width:${sz.toFixed(1)}px;height:${sz.toFixed(1)}px;border-radius:50%;background:rgba(${color},${op.toFixed(2)});animation:px-twinkle ${dur}s ${dl}s ease-in-out infinite;"></div>`;
    }
    return s;
  }

  // Scene definitions per planet + slide
  const scenes = {
    // ── MERCÚRIO ──────────────────────────────────
    mercurio_intro_0: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,#3a1800 0%,#120a00 50%,#050305 100%)"></div>
      ${stars(120,'255,200,120')}
      <div style="position:absolute;top:8%;left:50%;transform:translateX(-50%);font-family:'Press Start 2P',monospace;font-size:7px;color:rgba(255,200,80,0.35);letter-spacing:4px;">TRANSMISSÃO RECEBIDA</div>
      <div style="position:absolute;top:18%;left:50%;transform:translateX(-50%);z-index:5;">
        <div style="width:180px;height:120px;border:2px solid rgba(0,229,255,0.4);border-radius:8px;background:rgba(0,10,30,0.8);padding:10px;box-shadow:0 0 30px rgba(0,229,255,0.2);position:relative;overflow:hidden;">
          <div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 4px,rgba(0,229,255,0.04) 4px,rgba(0,229,255,0.04) 5px);pointer-events:none;"></div>
          <div style="font-family:'Press Start 2P',monospace;font-size:6px;color:rgba(255,80,80,0.9);margin-bottom:6px;animation:px-twinkle 0.8s ease-in-out infinite;">⚠ ALERTA NÍVEL 5</div>
          <div style="font-family:'Press Start 2P',monospace;font-size:5px;color:rgba(0,229,255,0.7);line-height:1.8;">FROTA: 847 NAVES<br>ORIGEM: SETOR 9<br>DESTINO: SOL. SOLAR<br>ETA: 14.3 DIAS</div>
        </div>
      </div>
      <div style="position:absolute;bottom:28%;left:50%;transform:translateX(-50%);font-size:70px;animation:campPlanetFloat 3.5s ease-in-out infinite;filter:drop-shadow(0 0 40px rgba(255,120,0,0.8));z-index:4;">☿</div>
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 80" width="100%" height="70" preserveAspectRatio="none"><polygon points="0,80 0,40 80,25 160,50 250,15 340,38 430,12 520,35 620,22 700,40 700,80" fill="#1a0d05"/><polygon points="0,80 0,55 80,42 160,63 250,32 340,54 430,28 520,50 620,38 700,55 700,80" fill="#261208"/></svg></div>`,

    mercurio_intro_1: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 20% 20%,#ff6600 0%,#3a1800 25%,#050305 70%)"></div>
      ${stars(80,'255,180,80')}
      <div style="position:absolute;top:10%;left:15%;font-size:100px;filter:drop-shadow(0 0 60px rgba(255,120,0,1)) drop-shadow(0 0 120px rgba(255,60,0,0.5));z-index:2;animation:campPlanetFloat 4s ease-in-out infinite;">☀️</div>
      <div style="position:absolute;top:45%;left:50%;transform:translateX(-50%);font-size:60px;filter:drop-shadow(0 0 30px rgba(200,150,80,0.8));z-index:4;animation:campPlanetFloat 3s 0.5s ease-in-out infinite;">☿</div>
      <div style="position:absolute;top:38%;right:15%;z-index:5;">
        <div style="font-family:'Press Start 2P',monospace;font-size:7px;color:#ff6600;text-shadow:0 0 10px rgba(255,100,0,0.8);margin-bottom:8px;">TEMPERATURA</div>
        <div style="font-family:'Press Start 2P',monospace;font-size:16px;color:#ff4400;text-shadow:0 0 20px rgba(255,68,0,1);">430°C</div>
        <div style="width:6px;height:80px;background:linear-gradient(180deg,#ff0000,#ff6600,#ffaa00);border-radius:3px;margin:8px auto 0;box-shadow:0 0 10px rgba(255,100,0,0.8);"></div>
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 80" width="100%" height="70" preserveAspectRatio="none"><polygon points="0,80 0,35 100,18 200,45 310,10 420,32 530,8 650,28 700,38 700,80" fill="#2a1005"/><polygon points="0,80 0,52 100,38 200,62 310,28 420,50 530,25 650,46 700,55 700,80" fill="#1a0a03"/></svg></div>`,

    mercurio_intro_2: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 80%,#2a1000 0%,#0a0500 50%,#030208 100%)"></div>
      ${stars(150,'255,180,100')}
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:65px;filter:drop-shadow(0 0 25px rgba(200,150,80,0.7));z-index:4;animation:campPlanetFloat 3s ease-in-out infinite;">☿</div>
      ${[...Array(5)].map((_,k)=>{
        const x=15+k*18, dur=(2+k*0.3).toFixed(1), dl=(k*0.4).toFixed(1);
        return `<div style="position:absolute;top:15%;left:${x}%;z-index:5;animation:tutUFODrop ${dur}s ${dl}s ease-in-out infinite;font-size:28px;filter:drop-shadow(0 0 10px rgba(255,0,100,0.7));">🛸</div>`;
      }).join('')}
      <div style="position:absolute;bottom:22%;left:50%;transform:translateX(-50%);z-index:6;font-family:'Press Start 2P',monospace;font-size:7px;color:rgba(255,200,80,0.6);letter-spacing:2px;text-align:center;">EVACUAÇÃO EM CURSO<br><span style="color:rgba(255,80,80,0.8);font-size:9px;">⚠ 3 ONDAS</span></div>
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 80" width="100%" height="70" preserveAspectRatio="none"><polygon points="0,80 0,40 80,25 160,50 250,15 340,38 430,12 520,35 620,22 700,40 700,80" fill="#200e05"/><polygon points="0,80 0,55 80,42 160,63 250,32 340,54 430,28 520,50 620,38 700,55 700,80" fill="#170904"/></svg></div>`,

    // MERCURIO OUTRO
    mercurio_outro_0: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#1a0f00 0%,#050305 70%)"></div>
      ${stars(120,'255,220,150')}
      <div style="position:absolute;top:30%;left:50%;transform:translateX(-50%);font-size:75px;filter:drop-shadow(0 0 40px rgba(255,200,0,0.9));z-index:4;animation:campPlanetFloat 3s ease-in-out infinite;">☿</div>
      ${[...Array(6)].map((_,k)=>{
        const x=10+k*16, dur=(1.5+k*0.2).toFixed(1), dl=(k*0.3).toFixed(1), size=14+Math.random()*18;
        return `<div style="position:absolute;bottom:25%;left:${x}%;z-index:5;font-size:${size}px;animation:explAnim ${dur}s ${dl}s ease-out infinite;">💥</div>`;
      }).join('')}
      <div style="position:absolute;top:15%;left:50%;transform:translateX(-50%);z-index:6;font-family:'Press Start 2P',monospace;font-size:8px;color:#ffd700;text-shadow:0 0 12px rgba(255,215,0,0.9);letter-spacing:2px;animation:px-twinkle 1.5s ease-in-out infinite;">✦ VITÓRIA! ✦</div>
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 80" width="100%" height="70" preserveAspectRatio="none"><polygon points="0,80 0,40 80,25 160,50 250,15 340,38 430,12 520,35 620,22 700,40 700,80" fill="#1a0d05"/></svg></div>`,

    mercurio_outro_1: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 30%,#200a30 0%,#050210 60%)"></div>
      ${stars(140,'200,180,255')}
      <div style="position:absolute;top:20%;left:20%;font-size:55px;filter:drop-shadow(0 0 25px rgba(200,120,255,0.8));z-index:3;animation:campPlanetFloat 3s 0.5s ease-in-out infinite;">♀</div>
      <div style="position:absolute;top:15%;right:20%;font-size:45px;filter:drop-shadow(0 0 20px rgba(200,150,80,0.7));z-index:3;animation:campPlanetFloat 3.5s ease-in-out infinite;">☿</div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:5;">
        <div style="font-family:'Press Start 2P',monospace;font-size:7px;color:rgba(255,80,80,0.9);text-align:center;line-height:2;text-shadow:0 0 10px rgba(255,50,50,0.7);">PRÓXIMA PARADA<br><span style="font-size:11px;color:#ff4444;">VÊNUS</span></div>
        <div style="text-align:center;font-size:24px;margin-top:8px;animation:px-twinkle 1s ease-in-out infinite;">➡️</div>
      </div>
      ${[...Array(3)].map((_,k)=>{ const x=30+k*20, dur=(2+k*0.5).toFixed(1); return `<div style="position:absolute;top:8%;left:${x}%;z-index:5;animation:tutUFODrop ${dur}s ${k*0.4}s ease-in-out infinite;font-size:22px;">🛸</div>`; }).join('')}
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 60" width="100%" height="55" preserveAspectRatio="none"><polygon points="0,60 0,30 100,18 220,40 350,8 480,32 620,15 700,28 700,60" fill="#100520"/></svg></div>`,

    // ── VÊNUS ────────────────────────────────────
    venus_intro_0: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#2a1500 0%,#1a0800 40%,#050208 100%)"></div>
      ${stars(90,'255,160,80')}
      <div style="position:absolute;top:25%;left:50%;transform:translateX(-50%);font-size:80px;filter:drop-shadow(0 0 40px rgba(255,150,50,0.9));z-index:4;animation:campPlanetFloat 4s ease-in-out infinite;">♀</div>
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 30%,rgba(200,80,0,0.15) 60%,rgba(100,30,0,0.4) 100%);pointer-events:none;z-index:2;"></div>
      <div style="position:absolute;bottom:15%;left:10%;right:10%;z-index:5;display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">
        ${[...Array(8)].map((_,k)=>`<div style="font-size:16px;animation:campPlanetFloat ${(2+k*0.3).toFixed(1)}s ${(k*0.2).toFixed(1)}s ease-in-out infinite;opacity:0.8;">🔥</div>`).join('')}
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 80" width="100%" height="70" preserveAspectRatio="none"><polygon points="0,80 0,45 80,28 180,55 290,18 400,42 510,15 620,38 700,48 700,80" fill="#1a0800"/><polygon points="0,80 0,60 80,45 180,70 290,35 400,58 510,30 620,55 700,63 700,80" fill="#120500"/></svg></div>`,

    venus_intro_1: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,#3a2000 0%,#1a0800 40%,#050208 100%)"></div>
      ${stars(60,'255,200,100')}
      <div style="position:absolute;top:20%;left:50%;transform:translateX(-50%);font-size:70px;filter:drop-shadow(0 0 30px rgba(255,120,30,0.8));z-index:4;animation:campPlanetFloat 4s ease-in-out infinite;">♀</div>
      ${[...Array(12)].map((_,k)=>{
        const x=5+k*8, op=0.3+Math.random()*0.5, dur=(4+Math.random()*4).toFixed(1), dl=(Math.random()*3).toFixed(1);
        return `<div style="position:absolute;top:0;left:${x}%;width:${(20+Math.random()*40).toFixed(0)}px;height:${(60+Math.random()*80).toFixed(0)}px;background:linear-gradient(180deg,rgba(180,80,0,${op}),transparent);border-radius:50%;animation:campPlanetFloat ${dur}s ${dl}s ease-in-out infinite;z-index:2;"></div>`;
      }).join('')}
      <div style="position:absolute;bottom:35%;left:50%;transform:translateX(-50%);z-index:6;font-family:'Press Start 2P',monospace;font-size:6px;color:rgba(255,180,80,0.7);letter-spacing:2px;text-align:center;">ÁCIDO SULFÚRICO<br>COBERTURA TOTAL</div>
      ${[...Array(4)].map((_,k)=>{ const dur=(2.5+k*0.3).toFixed(1); return `<div style="position:absolute;top:5%;left:${15+k*22}%;z-index:5;animation:tutUFODrop ${dur}s ${k*0.5}s ease-in-out infinite;font-size:24px;filter:drop-shadow(0 0 8px rgba(255,100,0,0.6));">🛸</div>`; }).join('')}
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 80" width="100%" height="70" preserveAspectRatio="none"><polygon points="0,80 0,45 80,28 180,55 290,18 400,42 510,15 620,38 700,48 700,80" fill="#180800"/></svg></div>`,

    venus_intro_2: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 80%,#1a0a00 0%,#050208 70%)"></div>
      ${stars(100,'255,180,100')}
      <div style="position:absolute;top:25%;left:50%;transform:translateX(-50%);font-size:72px;filter:drop-shadow(0 0 35px rgba(255,130,40,0.9));z-index:4;animation:campPlanetFloat 4s ease-in-out infinite;">♀</div>
      <div style="position:absolute;top:15%;left:55%;z-index:5;font-size:40px;animation:campPlanetFloat 2.5s ease-in-out infinite;filter:drop-shadow(0 0 15px rgba(200,100,0,0.8));">🏭</div>
      <div style="position:absolute;top:20%;right:20%;z-index:5;font-size:32px;animation:campPlanetFloat 3s 0.5s ease-in-out infinite;">🏭</div>
      ${[...Array(5)].map((_,k)=>{ const dur=(2+k*0.4).toFixed(1); return `<div style="position:absolute;top:5%;left:${10+k*20}%;z-index:6;animation:tutUFODrop ${dur}s ${k*0.3}s ease-in-out infinite;font-size:26px;filter:drop-shadow(0 0 8px rgba(255,50,100,0.7));">🛸</div>`; }).join('')}
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 80" width="100%" height="70" preserveAspectRatio="none"><polygon points="0,80 0,45 80,28 180,55 290,18 400,42 510,15 620,38 700,48 700,80" fill="#1a0800"/></svg></div>`,

    // ── MARTE ────────────────────────────────────
    marte_intro_0: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#2a0808 0%,#150404 45%,#050208 100%)"></div>
      ${stars(110,'255,150,130')}
      <div style="position:absolute;top:25%;left:50%;transform:translateX(-50%);font-size:80px;filter:drop-shadow(0 0 40px rgba(220,80,50,0.9));z-index:4;animation:campPlanetFloat 3.5s ease-in-out infinite;">♂</div>
      ${[...Array(6)].map((_,k)=>{ const x=8+k*16, dur=(1.8+k*0.25).toFixed(1); return `<div style="position:absolute;top:8%;left:${x}%;z-index:5;animation:tutUFODrop ${dur}s ${k*0.35}s ease-in-out infinite;font-size:22px;filter:drop-shadow(0 0 8px rgba(255,50,50,0.8));">🛸</div>`; }).join('')}
      <div style="position:absolute;bottom:22%;left:50%;transform:translateX(-50%);font-family:'Press Start 2P',monospace;font-size:7px;color:rgba(255,100,100,0.8);letter-spacing:2px;text-align:center;z-index:6;">FROTA DE ELITE<br><span style="color:#ff4444;">NÍVEL 3</span></div>
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 80" width="100%" height="70" preserveAspectRatio="none"><polygon points="0,80 0,40 80,22 180,50 290,12 400,38 510,10 620,32 700,42 700,80" fill="#2a0808"/><polygon points="0,80 0,58 80,42 180,65 290,28 400,55 510,25 620,50 700,60 700,80" fill="#1a0505"/></svg></div>`,

    marte_intro_1: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 100%,#2a1208 0%,#0a0303 60%)"></div>
      ${stars(100,'255,180,160')}
      <div style="position:absolute;top:20%;left:50%;transform:translateX(-50%);font-size:70px;filter:drop-shadow(0 0 30px rgba(200,80,50,0.8));z-index:4;animation:campPlanetFloat 3.5s ease-in-out infinite;">♂</div>
      <div style="position:absolute;bottom:8%;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 180" width="100%" height="160" preserveAspectRatio="none">
        <polygon points="0,180 0,100 60,20 120,90 180,30 240,100 300,40 360,110 420,50 480,120 540,60 600,130 660,70 700,100 700,180" fill="#2a1208"/>
        <polygon points="0,180 0,130 60,55 120,120 180,65 240,130 300,75 360,140 420,85 480,150 540,95 600,160 660,105 700,130 700,180" fill="#1a0a05"/>
      </svg></div>
      <div style="position:absolute;bottom:15%;left:50%;transform:translateX(-50%);font-family:'Press Start 2P',monospace;font-size:6px;color:rgba(255,150,100,0.6);letter-spacing:2px;text-align:center;z-index:6;">VALLES MARINERIS<br><span style="color:rgba(255,100,100,0.7);">CÂNION 4000 KM</span></div>
      ${[...Array(4)].map((_,k)=>{ return `<div style="position:absolute;top:10%;left:${18+k*22}%;z-index:5;animation:tutUFODrop ${(2.2+k*0.3).toFixed(1)}s ${(k*0.4).toFixed(1)}s ease-in-out infinite;font-size:24px;">🛸</div>`; }).join('')}`,

    marte_intro_2: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%,#1e0505 0%,#050208 70%)"></div>
      ${stars(130,'255,180,160')}
      <div style="position:absolute;top:22%;left:50%;transform:translateX(-50%);font-size:72px;filter:drop-shadow(0 0 35px rgba(220,80,50,0.8));z-index:4;animation:campPlanetFloat 3.5s ease-in-out infinite;">♂</div>
      ${[...Array(3)].map((_,k)=>{ return `<div style="position:absolute;top:18%;left:${22+k*28}%;z-index:5;font-size:28px;animation:campPlanetFloat ${(2.5+k*0.4).toFixed(1)}s ${(k*0.5).toFixed(1)}s ease-in-out infinite;filter:drop-shadow(0 0 12px rgba(100,200,255,0.6));">🏛️</div>`; }).join('')}
      <div style="position:absolute;bottom:25%;left:50%;transform:translateX(-50%);font-family:'Press Start 2P',monospace;font-size:6px;color:rgba(255,200,150,0.7);text-align:center;line-height:1.8;z-index:6;">50.000 COLONOS<br><span style="color:#ff6644;">DEPENDEM DE VOCÊ</span></div>
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 80" width="100%" height="70" preserveAspectRatio="none"><polygon points="0,80 0,40 80,22 180,50 290,12 400,38 510,10 620,32 700,42 700,80" fill="#280808"/></svg></div>`,

    // ── JÚPITER ───────────────────────────────────
    jupiter_intro_0: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#1a1005 0%,#0a0803 45%,#030208 100%)"></div>
      ${stars(120,'255,220,180')}
      <div style="position:absolute;top:18%;left:50%;transform:translateX(-50%);font-size:100px;filter:drop-shadow(0 0 50px rgba(200,150,80,0.8));z-index:4;animation:campPlanetFloat 5s ease-in-out infinite;">⊕</div>
      <div style="position:absolute;top:18%;left:50%;transform:translateX(-50%);font-size:100px;opacity:0.3;filter:blur(20px);z-index:3;animation:campPlanetFloat 5s ease-in-out infinite;">⊕</div>
      ${[...Array(8)].map((_,k)=>{ return `<div style="position:absolute;top:6%;left:${5+k*12}%;z-index:5;animation:tutUFODrop ${(2+k*0.2).toFixed(1)}s ${(k*0.25).toFixed(1)}s ease-in-out infinite;font-size:20px;">🛸</div>`; }).join('')}
      <div style="position:absolute;bottom:22%;right:12%;z-index:6;font-family:'Press Start 2P',monospace;font-size:6px;color:rgba(255,200,100,0.7);text-align:right;line-height:1.8;">MASSA:<br><span style="color:#ffaa44;font-size:9px;">1.300x TERRA</span></div>
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 60" width="100%" height="55" preserveAspectRatio="none"><polygon points="0,60 0,35 100,20 230,42 360,12 490,38 620,18 700,30 700,60" fill="#1a1005"/></svg></div>`,

    jupiter_intro_1: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#0a1520 0%,#030810 60%)"></div>
      ${stars(100,'180,220,255')}
      <div style="position:absolute;top:18%;left:50%;transform:translateX(-50%);font-size:90px;filter:drop-shadow(0 0 40px rgba(180,150,80,0.7));z-index:4;animation:campPlanetFloat 5s ease-in-out infinite;">⊕</div>
      ${[['🧊','top:35%;left:18%'],['🌋','top:40%;right:18%'],['🌊','top:50%;left:25%']].map(([em,pos])=>`<div style="position:absolute;${pos};z-index:5;font-size:36px;animation:campPlanetFloat 3s ease-in-out infinite;filter:drop-shadow(0 0 12px rgba(100,200,255,0.6));">${em}</div>`).join('')}
      <div style="position:absolute;bottom:22%;left:50%;transform:translateX(-50%);font-family:'Press Start 2P',monospace;font-size:6px;color:rgba(100,200,255,0.7);text-align:center;line-height:1.8;z-index:6;">EUROPA · GANIMEDES · IO<br><span style="color:#44aaff;">LUAS EM PERIGO</span></div>
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 60" width="100%" height="55" preserveAspectRatio="none"><polygon points="0,60 0,35 100,20 230,42 360,12 490,38 620,18 700,30 700,60" fill="#0a1520"/></svg></div>`,

    // ── SATURNO ───────────────────────────────────
    saturno_intro_0: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#0a1825 0%,#050a12 50%,#020408 100%)"></div>
      ${stars(150,'200,230,255')}
      <div style="position:absolute;top:22%;left:50%;transform:translateX(-50%);z-index:4;">
        <div style="font-size:80px;filter:drop-shadow(0 0 35px rgba(150,200,255,0.7));animation:campPlanetFloat 4s ease-in-out infinite;">♄</div>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:160px;height:25px;border:3px solid rgba(180,220,255,0.4);border-radius:50%;box-shadow:0 0 15px rgba(150,200,255,0.3);pointer-events:none;"></div>
      </div>
      ${[...Array(6)].map((_,k)=>{ const x=8+k*16; return `<div style="position:absolute;top:12%;left:${x}%;z-index:3;font-size:18px;animation:px-twinkle ${(2+k*0.3).toFixed(1)}s ${(k*0.2).toFixed(1)}s ease-in-out infinite;opacity:0.6;">🪨</div>`; }).join('')}
      <div style="position:absolute;bottom:22%;left:50%;transform:translateX(-50%);font-family:'Press Start 2P',monospace;font-size:6px;color:rgba(180,220,255,0.6);text-align:center;line-height:1.8;z-index:6;">NAVES CAMUFLADAS<br><span style="color:#88ccff;">NOS ANÉIS DE GELO</span></div>
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 60" width="100%" height="55" preserveAspectRatio="none"><polygon points="0,60 0,35 100,20 230,42 360,12 490,38 620,18 700,30 700,60" fill="#0a1825"/></svg></div>`,

    // ── URANO ─────────────────────────────────────
    urano_intro_0: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#061520 0%,#030810 60%)"></div>
      ${stars(130,'150,230,255')}
      <div style="position:absolute;top:20%;left:50%;transform:translateX(-50%);z-index:4;animation:campPlanetFloat 5s ease-in-out infinite;">
        <div style="font-size:80px;filter:drop-shadow(0 0 35px rgba(100,220,255,0.8));transform:rotate(98deg);">⛢</div>
      </div>
      <div style="position:absolute;inset:0;z-index:2;overflow:hidden;">
        ${[...Array(5)].map((_,k)=>`<div style="position:absolute;top:${20+k*15}%;left:-10%;right:-10%;height:2px;background:linear-gradient(90deg,transparent,rgba(100,200,255,0.15),transparent);animation:campPlanetFloat ${(3+k*0.5).toFixed(1)}s ${(k*0.3).toFixed(1)}s ease-in-out infinite;transform:rotate(${-15+k*8}deg);"></div>`).join('')}
      </div>
      <div style="position:absolute;bottom:22%;left:50%;transform:translateX(-50%);font-family:'Press Start 2P',monospace;font-size:6px;color:rgba(100,200,255,0.7);text-align:center;line-height:1.8;z-index:6;">EIXO INCLINADO 98°<br><span style="color:#44ccff;">TRAJETÓRIAS IMPOSSÍVEIS</span></div>
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 60" width="100%" height="55" preserveAspectRatio="none"><polygon points="0,60 0,35 100,20 230,42 360,12 490,38 620,18 700,30 700,60" fill="#061520"/></svg></div>`,

    // ── NETUNO ────────────────────────────────────
    netuno_intro_0: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#060a2a 0%,#030510 60%)"></div>
      ${stars(160,'120,150,255')}
      <div style="position:absolute;top:22%;left:50%;transform:translateX(-50%);font-size:80px;filter:drop-shadow(0 0 40px rgba(80,100,255,0.9));z-index:4;animation:campPlanetFloat 5s ease-in-out infinite;">♆</div>
      <div style="position:absolute;top:30%;left:5%;z-index:5;font-size:14px;font-family:'Press Start 2P',monospace;color:rgba(150,180,255,0.5);line-height:2;">🌑<br>🌑<br>🌑</div>
      <div style="position:absolute;bottom:25%;left:50%;transform:translateX(-50%);font-family:'Press Start 2P',monospace;font-size:6px;color:rgba(120,160,255,0.7);text-align:center;line-height:1.8;z-index:6;">QUARTEL-GENERAL<br><span style="color:#8888ff;">DO INIMIGO</span></div>
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 60" width="100%" height="55" preserveAspectRatio="none"><polygon points="0,60 0,35 100,20 230,42 360,12 490,38 620,18 700,30 700,60" fill="#060a2a"/></svg></div>`,

    // ── PLUTÃO ────────────────────────────────────
    plutao_intro_0: () => `
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#080510 0%,#020308 70%)"></div>
      ${stars(180,'200,180,255')}
      <div style="position:absolute;top:22%;left:50%;transform:translateX(-50%);font-size:65px;filter:drop-shadow(0 0 30px rgba(150,100,255,0.8));z-index:4;animation:campPlanetFloat 6s ease-in-out infinite;">✦</div>
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(80,50,150,0.2) 70%,rgba(50,30,100,0.4) 100%);pointer-events:none;z-index:2;"></div>
      <div style="position:absolute;bottom:25%;left:50%;transform:translateX(-50%);font-family:'Press Start 2P',monospace;font-size:6px;color:rgba(200,150,255,0.6);text-align:center;line-height:1.8;z-index:6;">FRONTEIRA DO<br><span style="color:#aa88ff;">SISTEMA SOLAR</span></div>
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 60" width="100%" height="55" preserveAspectRatio="none"><polygon points="0,60 0,35 100,20 230,42 360,12 490,38 620,18 700,30 700,60" fill="#080510"/></svg></div>`,

  };

  // Fallback scene generator for slides without specific definitions
  function defaultScene(ph, sl, mode) {
    const glowHex = ph.glowColor || 'rgba(100,200,255,0.6)';
    const bgFrom = ph.bg || 'radial-gradient(ellipse at 50% 50%,#0a0f20 0%,#030508 70%)';
    if(mode === 'outro') {
      // Victory scene for outro slides
      return `
        <div style="position:absolute;inset:0;background:${bgFrom}"></div>
        ${stars(130,'255,230,150')}
        <div style="position:absolute;top:28%;left:50%;transform:translateX(-50%);font-size:75px;filter:drop-shadow(0 0 40px ${glowHex});z-index:4;animation:campPlanetFloat 4s ease-in-out infinite;">${ph.emoji}</div>
        ${[...Array(7)].map((_,k)=>{ const x=8+k*13, sz=14+Math.random()*18, dur=(1.5+k*0.2).toFixed(1), dl=(k*0.3).toFixed(1); return `<div style="position:absolute;bottom:${25+Math.random()*20}%;left:${x}%;z-index:5;font-size:${sz}px;animation:explAnim ${dur}s ${dl}s ease-out infinite;">💥</div>`; }).join('')}
        <div style="position:absolute;top:14%;left:50%;transform:translateX(-50%);z-index:6;font-family:'Press Start 2P',monospace;font-size:8px;color:#ffd700;text-shadow:0 0 12px rgba(255,215,0,0.9);letter-spacing:2px;animation:px-twinkle 1.5s ease-in-out infinite;">✦ VITÓRIA! ✦</div>
        <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 60" width="100%" height="55" preserveAspectRatio="none"><polygon points="0,60 0,35 100,20 230,42 360,12 490,38 620,18 700,30 700,60" fill="rgba(0,0,0,0.5)"/></svg></div>
      `;
    }
    // Default intro scene
    return `
      <div style="position:absolute;inset:0;background:${bgFrom}"></div>
      ${stars(120)}
      <div style="position:absolute;top:22%;left:50%;transform:translateX(-50%);font-size:80px;filter:drop-shadow(0 0 35px ${glowHex});z-index:4;animation:campPlanetFloat 4s ease-in-out infinite;">${ph.emoji}</div>
      ${[...Array(4)].map((_,k)=>{ return `<div style="position:absolute;top:8%;left:${15+k*22}%;z-index:5;animation:tutUFODrop ${(2.2+k*0.3).toFixed(1)}s ${(k*0.4).toFixed(1)}s ease-in-out infinite;font-size:24px;filter:drop-shadow(0 0 8px rgba(255,50,100,0.7));">🛸</div>`; }).join('')}
      <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;"><svg viewBox="0 0 700 60" width="100%" height="55" preserveAspectRatio="none"><polygon points="0,60 0,35 100,20 230,42 360,12 490,38 620,18 700,30 700,60" fill="rgba(0,0,0,0.5)"/></svg></div>
    `;
  }

  const sceneFn = scenes[sceneKey];
  return sceneFn ? sceneFn() : defaultScene(ph, sl, mode);
}

function _campBuildStorySlides(ph, mode){
  const wrap=document.getElementById('campStorySlides');
  wrap.innerHTML='';
  _campStorySlides.forEach((sl,i)=>{
    const slide=document.createElement('div');
    slide.className='camp-story-slide';
    // Visual side - now with rich animated scenes
    const vis=document.createElement('div');
    vis.className='camp-story-visual';
    vis.style.background=ph.bg;
    vis.innerHTML = _buildStoryScene(ph, sl, mode, i);
    slide.appendChild(vis);
    // Content side
    const content=document.createElement('div');
    content.className='camp-story-content';
    content.innerHTML=`
      <div class="camp-story-slide-num">${sl.slideNum}</div>
      <div class="camp-story-slide-icon">${sl.icon}</div>
      <div class="camp-story-slide-title ${mode}">${sl.title.replace('\n','<br>')}</div>
      <div class="camp-story-slide-text" id="campStTxt${i}"></div>
    `;
    slide.appendChild(content);
    wrap.appendChild(slide);
  });
}

function _campBuildStoryDots(){
  const dots=document.getElementById('campStoryDots');
  dots.innerHTML='';
  _campStorySlides.forEach((_,i)=>{
    const d=document.createElement('div'); d.className='camp-story-dot';
    d.onclick=(()=>{ const idx=i; return ()=>_campStoryGoTo(idx); })();
    dots.appendChild(d);
  });
}

function _campStoryGoTo(idx){
  if(idx<0||idx>=_campStorySlides.length)return;
  _campStorySlide=idx;
  document.getElementById('campStorySlides').style.transform=`translateX(-${idx*100}%)`;
  document.querySelectorAll('.camp-story-dot').forEach((d,i)=>d.classList.toggle('active',i===idx));
  document.getElementById('campStoryPrev').disabled=idx===0;
  const nextBtn=document.getElementById('campStoryNext');
  const isLast=idx===_campStorySlides.length-1;
  if(isLast){
    nextBtn.textContent='⚔ VAMOS LÁ!';
    nextBtn.className='camp-story-nav-btn go';
    nextBtn.onclick=skipCampStory;
  } else {
    nextBtn.textContent='PRÓXIMO ►';
    nextBtn.className='camp-story-nav-btn';
    nextBtn.onclick=()=>campStoryNav(1);
  }
  _campStoryTypewrite(idx);
}

function campStoryNav(dir){ _campStoryGoTo(_campStorySlide+dir); }

function _campStoryTypewrite(idx){
  if(_campStoryTwTimer){ clearTimeout(_campStoryTwTimer); _campStoryTwTimer=null; }
  const rawHtml=_campStorySlides[idx].text.replace(/\n/g,'<br>').replace(/class="grnn"/g,'style="color:var(--green);font-weight:700"').replace(/class="redd"/g,'style="color:var(--red);font-weight:700"');
  const el=document.getElementById('campStTxt'+idx);
  if(!el)return;
  const stripped=rawHtml.replace(/<[^>]+>/g,'');
  const total=stripped.length;
  let revealed=0;
  const speed=Math.max(12,Math.floor(2600/total));
  function revealNext(){
    revealed++;
    let shown=0,out='',inTag=false;
    for(let ci=0;ci<rawHtml.length;ci++){
      const ch=rawHtml[ci];
      if(ch==='<'){inTag=true;out+=ch;continue;}
      if(ch==='>'){inTag=false;out+=ch;continue;}
      if(inTag){out+=ch;continue;}
      if(shown<revealed){out+=ch;shown++;}
      else break;
    }
    el.innerHTML=out+(revealed<total?'<span class="story-cursor"></span>':'');
    if(revealed<total) _campStoryTwTimer=setTimeout(revealNext,speed);
  }
  el.innerHTML=''; revealNext();
}

function skipCampStory(){
  if(_campStoryTwTimer){ clearTimeout(_campStoryTwTimer); _campStoryTwTimer=null; }
  document.getElementById('campStoryScreen').classList.remove('show');
  if(_campStoryCallback){ const cb=_campStoryCallback; _campStoryCallback=null; cb(); }
}

// --- CAMPAIGN FINAL CEREMONY ---
function showCampFinal(){
  const finalStory=`O Capitão Alex Lunar pousou pela última vez na superfície lunar — a mesma de onde tudo começou.

De Mercúrio a Plutão, oito mundos libertados. Cada batalha uma lição. Cada vitória, um presente para a humanidade.

O Conselho Interplanetário se reuniu em sessão extraordinária. Pela primeira vez na história, concederam a Medalha de Honra de Defensor de Todos os Mundos — uma distinção que nem os fundadores imaginaram que seria necessária.

"A matemática não é apenas uma ferramenta", disse Alex ao receber a medalha. "É a linguagem pela qual o universo nos fala. E se ouvimos com atenção o suficiente... podemos responder."

O sistema solar respirou.`;
  // Draw final stars
  const cvs=document.getElementById('campFinalStars');
  cvs.width=window.innerWidth; cvs.height=window.innerHeight;
  const ctx=cvs.getContext('2d');
  for(let i=0;i<300;i++){
    ctx.beginPath(); ctx.arc(Math.random()*cvs.width,Math.random()*cvs.height,Math.random()*2,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${Math.random()*0.8+0.1})`; ctx.fill();
  }
  document.getElementById('campFinalStory').textContent=finalStory;
  document.getElementById('campFinalScreen').classList.add('show');
  // Unlock medal skin
  const medalSkin=_getCampSkin('camp_plutao');
  if(!skinState.unlocked.includes('camp_plutao')){
    skinState.unlocked.push('camp_plutao');
    saveSkins();
  }
}
function closeCampFinal(){
  document.getElementById('campFinalScreen').classList.remove('show');
  document.getElementById('startScreen').classList.remove('hidden');
}

// --- CAMPAIGN MAP STARS ---
function initCampStars(){
  const cvs=document.getElementById('campStarsCanvas');
  const area=document.getElementById('campaignMapScreen');
  cvs.width=area.offsetWidth||window.innerWidth;
  cvs.height=area.offsetHeight||window.innerHeight;
  const ctx=cvs.getContext('2d');
  ctx.clearRect(0,0,cvs.width,cvs.height);
  for(let i=0;i<200;i++){
    const x=Math.random()*cvs.width,y=Math.random()*cvs.height,r=Math.random()*1.5;
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${Math.random()*0.7+0.2})`; ctx.fill();
  }
  // A few coloured nebulas
  [['rgba(168,85,247,0.05)',0.1,0.2,200],['rgba(0,150,255,0.06)',0.8,0.6,160],['rgba(255,100,50,0.04)',0.3,0.7,130]].forEach(([c,lx,ly,r])=>{
    const grd=ctx.createRadialGradient(cvs.width*lx,cvs.height*ly,0,cvs.width*lx,cvs.height*ly,r);
    grd.addColorStop(0,c); grd.addColorStop(1,'transparent');
    ctx.fillStyle=grd; ctx.fillRect(0,0,cvs.width,cvs.height);
  });
}

// Patch generateProblem for campaign numMax
const _origGenerateProblem=generateProblem;
generateProblem=function(){
  if(state._campNumMax){
    const activeOps=getActiveOPS();
    const op=activeOps[Math.floor(Math.random()*activeOps.length)];
    // Special ops work the same in campaign
    if(['%','P','σ','√','m'].includes(op)){
      const sp=_generateSpecialProblem(op);
      if(sp) return sp;
    }
    const max=state._campNumMax;
    let a,b,ans;
    switch(op){
      case '+':a=rand(1,max);b=rand(1,max);ans=a+b;break;
      case '-':a=rand(1,max);b=rand(1,a);ans=a-b;break;
      case '×':a=rand(1,12);b=rand(1,12);ans=a*b;break;
      case '÷':ans=rand(1,12);b=rand(1,12);a=ans*b;break;
      default:a=rand(1,max);b=rand(1,max);ans=a+b;
    }
    return{question:`${a} ${op} ${b} = ?`,answer:ans};
  }
  return _origGenerateProblem();
};

// Register campaign skins in main SKINS array (for collection viewing)
(function registerCampSkinsInCollection(){
  CAMP_SKINS.forEach(cs=>{
    // Check if already there
    if(!SKINS.find(s=>s.id===cs.id)){
      SKINS.push({
        id:cs.id, name:cs.icon+' '+cs.name, wave: 9999,
        desc:cs.desc, stars:'🌌', rarity:'CAMPANHA',
        suit:cs.suit, visor:cs.visor, accent:cs.accent, chest:cs.chest||cs.suit, glow:cs.glow
      });
    }
  });
  // Unlock already-earned ones
  campState.unlockedSkins.forEach(id=>{
    if(!skinState.unlocked.includes(id)) skinState.unlocked.push(id);
  });
})();


(function injectStoryUFOAnim(){
  var s = document.createElement('style');
  s.textContent = '@keyframes stUFOfall{0%{top:-70px;opacity:0}8%{opacity:1}65%{top:72%;opacity:1}80%{top:78%;opacity:0}100%{top:-70px;opacity:0}} @keyframes stAstroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}';
  document.head.appendChild(s);
})();

// ─────────────────────────────────────────────────────────────────────────────

