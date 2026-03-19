# 🚀 SpaceMath: Defesa Lunar

> Defenda a Base Lunar resolvendo operações matemáticas antes que os invasores cheguem!

![SpaceMath Banner](https://img.shields.io/badge/SpaceMath-Defesa%20Lunar-00e5ff?style=for-the-badge&logo=rocket&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 📖 Sobre o Jogo

**SpaceMath: Defesa Lunar** é um jogo educacional de matemática ambientado no espaço. Você é o **Capitão Alex Lunar**, guardião da Base Lunar Central. Naves alienígenas invadem em ondas — cada uma protegida por um escudo matemático. Resolva a operação correta e destrua a nave com seu laser antes que ela alcance a base!

O jogo é desenvolvido em **HTML, CSS e JavaScript puro**, sem dependências externas, e roda diretamente no navegador.

---

## 🎮 Como Jogar

1. Escolha a **dificuldade** (Fácil, Médio ou Difícil)
2. Naves alienígenas aparecem na tela exibindo uma **operação matemática**
3. Digite a resposta no teclado numérico e pressione **ENVIAR**
4. O laser destrói todas as naves com aquela resposta
5. Sobreviva às ondas e acumule pontos!

### ⌨️ Controles

| Tecla | Ação |
|---|---|
| `0–9` | Digitar número |
| `Enter` | Enviar resposta |
| `Backspace` | Apagar último dígito |
| `P` ou `Esc` | Pausar / Continuar |

---

## 🌟 Modos de Jogo

### ▶ Modo Livre
Jogue sem fim com a dificuldade escolhida. As ondas ficam progressivamente mais rápidas e difíceis.

### 🌌 Campanha — Alex Lunar
Percorra o **Sistema Solar** em 8 planetas com desafios únicos, trilhas sonoras e histórias por planeta. Cada planeta desbloqueado traz uma **skin exclusiva de campanha**.

| Planeta | Skin Exclusiva |
|---|---|
| ☿ Mercúrio | Mercurial |
| ♀ Vênus | Vênus |
| ♂ Marte | Marciano |
| ⊕ Júpiter | Joviano |
| ♄ Saturno | Saturnino |
| ⛢ Urano | Urânio |
| ♆ Netuno | Netuniano |
| ✦ Plutão | Defensor Final |

### 🌀 Multiverso — Matemática Avançada
5 dimensões paralelas com operações especiais do **6º ano**:

| Dimensão | Operação |
|---|---|
| 💯 Dimensão % | Porcentagem |
| 🎲 Dimensão P | Probabilidade |
| 📊 Dimensão σ | Estatística (média) |
| 🔲 Dimensão √ | Raiz Quadrada |
| 📏 Dimensão 📏 | Grandezas e Medidas |

---

## 🎯 Dificuldades

| Dificuldade | Números | Vidas | Velocidade | Spawn |
|---|---|---|---|---|
| 🟢 Fácil | 1–10 | 5 | Lenta | 4s |
| 🔵 Médio | 1–20 | 3 | Média | 3s |
| 🔴 Difícil | 1–50 | 2 | Rápida | 2.2s |

---

## 🚀 Skins de Astronauta

Desbloqueie **10 skins gratuitas** conforme avança nas ondas:

| Skin | Desbloqueio | Raridade |
|---|---|---|
| Clássico | Inicial | ⭐ Inicial |
| Futurista | Onda 5 | ⭐⭐ Raro |
| Alien | Onda 10 | ⭐⭐ Raro |
| Robótico | Onda 15 | ⭐⭐⭐ Épico |
| Aurora | Onda 20 | ⭐⭐⭐ Épico |
| Solar | Onda 25 | ⭐⭐⭐ Épico |
| Abissal | Onda 30 | ⭐⭐⭐⭐ Lendário |
| Nebulosa | Onda 35 | ⭐⭐⭐⭐ Lendário |
| Veterano | Onda 40 | ⭐⭐⭐⭐ Lendário |
| Lendário | Onda 45 | ⭐⭐⭐⭐⭐ Mítico |

### 👑 Skins PRO — Habilidades Especiais

Desbloqueie completando **tarefas no jogo**:

| Skin | Habilidade | Tarefa |
|---|---|---|
| ❤️‍🔥 Guardião | +1 vida a cada 5 ondas | Sobreviver 10 ondas · Fácil |
| ⏱️ Crononauta | Naves ficam lentas no início de cada onda | Sobreviver 5 ondas · Médio |
| ⚡ Acelerado | Ondas mais curtas (mais pontos) | Sobreviver 3 ondas · Difícil |

---

## 🏗️ Estrutura do Projeto

```
SpaceMath/
├── index.html          # Estrutura HTML do jogo
├── styles.css          # Todo o CSS e animações
├── README.md           # Este arquivo
└── js/
    ├── constants.js    # Estado global, dificuldades, constantes
    ├── ui.js           # Tutorial, pause, créditos, teclado
    ├── background.js   # Temas de planetas, canvas de estrelas
    ├── game.js         # Loop principal, UFOs, resposta, HUD
    ├── skins.js        # Sistema de skins e astronauta SVG
    ├── options.js      # Opções de operadores matemáticos
    ├── abilities.js    # Habilidades PRO e patches de funções
    ├── story.js        # Tela de prólogo/história
    ├── campaign.js     # Modo Campanha (Alex Lunar)
    ├── multiverse.js   # Modo Multiverso
    └── audio.js        # Engine de áudio (Web Audio API)
```

---

## ▶️ Como Executar

Por usar múltiplos arquivos JS, o projeto precisa ser servido por um servidor HTTP local — **não** abrindo o `index.html` direto no navegador.

### Opção 1 — Python
```bash
cd SpaceMath
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

### Opção 2 — Node.js
```bash
npx serve .
```

### Opção 3 — VS Code
Instale a extensão **Live Server** e clique em `Go Live` no canto inferior direito.

---

## 🛠️ Tecnologias

- **HTML5** — estrutura e canvas
- **CSS3** — animações, temas de planetas, pixel art
- **JavaScript Vanilla** — toda a lógica do jogo
- **Web Audio API** — engine de som e música procedural
- **LocalStorage** — salva progresso, skins e recordes

---

## 📚 Alinhamento Educacional (BNCC)

O jogo cobre habilidades matemáticas do **4º ao 6º ano**:

- `EF04MA03` — Operações fundamentais (adição, subtração, multiplicação, divisão)
- `EF05MA10` — Porcentagem
- `EF06MA27` — Probabilidade
- `EF06MA33` — Média aritmética
- `EF06MA11` — Raiz quadrada
- `EF05MA19` — Grandezas e medidas

---

*Defenda a Lua. Salve a Terra. Use a matemática.* 🌕
