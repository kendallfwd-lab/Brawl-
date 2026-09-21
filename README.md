# NEON BRAWL

Videojuego arcade 2D construido con React + Vite. El jugador elige un brawler, entra en una arena dinámica y combate contra bots usando movimiento WASD, apuntado con mouse, proyectiles, power-ups y una habilidad Super.

## Arranque rápido

> Vite 7 requiere Node moderno. Recomendado: Node 22.

```bash
npm install
npm run dev
```

`npm run dev` levanta **dos procesos automáticamente**:

- React/Vite: http://localhost:5173
- JSON Server: http://localhost:3001

No necesitas abrir un segundo terminal para JSON Server.

## Controles

- `WASD` o flechas: movimiento
- Mouse: apuntar
- Click izquierdo: disparar
- `SPACE`: Super cuando llega a 100%
- `ESC`: pausa real

## Rutas

- `/` Inicio
- `/brawlers` selección de personaje
- `/maps` selección de arena
- `/game/:mapId` ruta dinámica de partida
- `/leaderboard` puntuaciones
- `/instructions` instrucciones
- `/results` resultados

## Requisitos del quiz cubiertos

- Componentes reutilizables: `GameArena`, `Player`, `Enemy`, `HUD`, `HealthBar`, `Projectile`, `PowerUp`, `BrawlerCard`, etc.
- Props: usadas entre componentes de gameplay y UI.
- Listas con `key` estable: bots, proyectiles, obstáculos, power-ups, leaderboard.
- `useState`: UI, timer, estados de carga/error y snapshots del juego.
- `useEffect`: peticiones, timers, listeners y game loop.
- Hook adicional: `useRef`, `useCallback`, `useMemo` y `useContext` con justificación real.
- React Router con más de 3 rutas y ruta dinámica `/game/:mapId`.
- GET: brawlers, mapas y scores.
- POST: resultado final a `/scores`.
- Loading y Error UI.
- n8n: webhook + Code + IF + Set + Merge + Respond.

## Gameplay implementado

- Cuenta regresiva 3-2-1.
- Movimiento diagonal normalizado y colisiones con obstáculos.
- Apuntado con mouse.
- Munición y recarga por brawler.
- Proyectiles con alcance y colisión.
- Bots con estados `CHASE`, `ATTACK` y `RETREAT`.
- 3 niveles de dificultad que cambian IA, precisión, velocidad y daño.
- Vida, muerte, 3 vidas e invulnerabilidad de respawn.
- Power-ups: Medkit, Speed, Shield, Damage y Neon Core.
- Super diferente para Volt, Nyx y Tank-X.
- Cajas destructibles.
- Kill feed, damage numbers, HUD, score y estadísticas.
- Pausa que congela game loop y timer.
- Resultados y leaderboard persistidos con JSON Server.

## API local

Base URL: `http://localhost:3001`

Endpoints principales:

```text
GET  /brawlers
GET  /maps
GET  /maps/:id
GET  /scores
POST /scores
```

Los datos iniciales están en `db.json`.

## Integración n8n

1. Inicia n8n (`npx n8n` si lo tienes instalado).
2. Importa `n8n/neon-brawl-workflow.json`.
3. Activa el workflow.
4. Copia `.env.example` a `.env`.
5. Deja o actualiza:

```env
VITE_N8N_WEBHOOK_URL=/n8n/webhook/neon-brawl-score
```

Durante `npm run dev`, Vite redirige `/n8n/*` a `http://localhost:5678`, evitando CORS en desarrollo.

El frontend envía al terminar una partida un payload con jugador, brawler, score, kills, deaths, daño, precisión y mapa. n8n valida y devuelve un rango (`ROOKIE`, `FIGHTER`, `BRAWLER`, `NEON ELITE`, `ARENA LEGEND`).

**Importante:** si n8n está apagado, el juego NO se rompe. El score sigue guardándose en JSON Server y la pantalla muestra que el rango online no estuvo disponible.

El archivo `n8n/workflow-diagram.svg` es una vista previa documental. Para la entrega del profesor importa el JSON y toma una captura real del editor de n8n, tal como exige la rúbrica.

## Estructura

```text
src/
├─ components/
├─ context/
├─ hooks/
├─ pages/
├─ routes/
├─ services/
├─ styles/
└─ utils/
public/assets/characters/
n8n/
db.json
```

## Build

```bash
npm run build
```

## Commits sugeridos para Git

Para que el historial evidencie progreso, cuando lo subas a tu repositorio haz commits pequeños (no un único commit del ZIP):

```text
chore: crear proyecto base con React y Vite
feat: agregar rutas y navegación
feat: crear selección de brawlers y mapas
feat: implementar movimiento y colisiones
feat: agregar apuntado disparos y munición
feat: implementar bots y combate
feat: agregar powerups y supers
feat: conectar JSON Server
feat: agregar resultados y leaderboard
feat: integrar workflow n8n
docs: completar README
```

## Nota académica

Este proyecto está pensado para que puedas explicarlo: la lógica principal del juego usa React, DOM/CSS y `requestAnimationFrame`; no usa Phaser, Unity ni Three.js.

## Rediseño visual

El proyecto incluye un prompt maestro de rediseño visual en:

`docs/DESIGN_PROMPT.md`

Las referencias visuales incluidas están en:

`docs/design-references/`

- `home-reference.png`
- `brawlers-reference.png`
- `gameplay-reference.png`

El prompt está diseñado para mejorar profundamente la presentación visual sin reemplazar ni romper el gameplay existente.

## Sistema visual de personajes

La versión actual incluye un sistema completo de assets SVG editables para Volt, Nyx, Tank-X, Bot Pulse, Bot Nova y Bot Hex. Cada brawler jugable tiene variantes `gameplay`, `avatar` y `portrait`, mientras que cada bot tiene sprite y avatar propios. Consulta `docs/CHARACTER_ASSET_SYSTEM.md` para la estructura y los componentes que consumen estos archivos.
