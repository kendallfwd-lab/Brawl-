# NEON BRAWL — Visual Redesign Implemented

Este proyecto ya incorpora el rediseño visual basado en las referencias de `docs/design-references/`.

## Cambios aplicados

- Home reconstruida con lenguaje visual arcade/brawler y arte del mockup original.
- Logo NEON BRAWL reutilizable.
- Navbar arcade con botones, iconos y estados activos.
- Tarjetas de Volt, Nyx y Tank-X rediseñadas.
- Arte cartoon recortado de las referencias para las tarjetas.
- Sprites transparentes cartoon para Volt, Nyx y Tank-X usados por el juego.
- Bot enemigo cartoon derivado de la referencia de gameplay.
- Selección de mapas con previews ilustrados mediante CSS.
- Arena a pantalla completa, piso violeta y decoración estilo arcade.
- Bushes hechos por grupos de hojas con volumen.
- Cajas y paredes con caras, highlights y sombras.
- Proyectiles con glow y trails.
- HUD completamente rediseñado: avatar, HP, timer, K/D, joystick visual, munición y Super.
- Countdown, pausa, kill feed y números de daño rediseñados.
- Resultados con personaje, rango, estadísticas y botones arcade.
- Leaderboard con podio visual.
- Pantalla Cómo Jugar convertida a tarjetas arcade.

## Regla funcional

La lógica de movimiento, colisiones, bots, disparos, Super, power-ups, timer, rutas, JSON Server y n8n no fue sustituida por imágenes estáticas. El arte visual está separado de las hitboxes.

## Verificación realizada

- 32 archivos JS/JSX: sintaxis validada con TypeScript transpile API.
- Imports relativos: verificados.
- db.json: JSON válido.
- workflow n8n: JSON válido.
- Assets de brawlers referenciados desde db.json: existentes.
- CSS: balance de llaves verificado.

`npm install` no pudo completarse en el entorno de generación debido a timeout de acceso al registro npm. Ejecutar en el equipo local:

```bash
npm install
npm run dev
```

Después revisar 1920x1080 y 1366x768 según `QA_CHECKLIST.md`.
