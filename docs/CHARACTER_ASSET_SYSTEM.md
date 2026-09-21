# NEON BRAWL — Character Asset System

Esta versión separa la representación visual de cada combatiente de su hitbox y lógica del motor.

## Brawlers

Cada personaje jugable utiliza tres SVG locales editables:

- `public/assets/characters/<id>/gameplay.svg` — sprite usado dentro de la arena.
- `public/assets/characters/<id>/avatar.svg` — retrato circular para HUD y ranking.
- `public/assets/characters/<id>/portrait.svg` — ilustración grande para selección y resultados.

Personajes:

- `volt`
- `nyx`
- `tankx`

## Bots

Cada bot ahora tiene identidad propia y dejó de reutilizar un único `enemy.svg`:

- `bot-pulse/gameplay.svg` + `avatar.svg`
- `bot-nova/gameplay.svg` + `avatar.svg`
- `bot-hex/gameplay.svg` + `avatar.svg`

`src/utils/characterAssets.js` centraliza la resolución de rutas de assets.

## Componentes actualizados

- `BrawlerCard.jsx` usa `portrait.svg`.
- `Player.jsx` usa `gameplay.svg` sin modificar la hitbox física.
- `Enemy.jsx` resuelve un sprite distinto según el nombre del bot.
- `HUD.jsx` usa `avatar.svg`.
- `ResultsPage.jsx` usa `portrait.svg`.
- `LeaderboardPage.jsx` usa `avatar.svg`.
- `GameArena.jsx` usa avatares en el kill feed.

## Efectos

Se añadió una capa `fighter-visual` independiente del contenedor físico, además de:

- glow cyan para Volt;
- estela magenta para Nyx;
- aura naranja para Tank-X;
- armas visualmente diferenciadas por bot;
- `superFx` temporal para EMP, Shadow Dash y Ground Shock.

La lógica de movimiento, daño, score, IA y colisiones permanece separada de estos assets.
