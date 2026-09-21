# NEON BRAWL — Checklist de aceptación

Usa esta lista antes de entregar el repositorio al profesor.

## Arranque
- [ ] `npm install` finaliza.
- [ ] `npm run dev` inicia WEB (5173) y API (3001).
- [ ] `/brawlers`, `/maps` y `/scores` responden desde JSON Server.

## Flujo completo
- [ ] Escribir nombre en Home y seleccionar dificultad.
- [ ] Elegir Volt, Nyx o Tank-X.
- [ ] Elegir mapa y comprobar `/game/:mapId`.
- [ ] Cuenta 3-2-1 y comienza la partida.
- [ ] WASD/flechas mueven y las paredes bloquean.
- [ ] Mouse apunta; click dispara; munición se recarga.
- [ ] Bots persiguen, disparan, reciben daño, mueren y reaparecen.
- [ ] El jugador pierde vida, respawnea y tiene invulnerabilidad temporal.
- [ ] Power-ups modifican vida/velocidad/escudo/daño; Neon Core suma score y Super.
- [ ] SPACE usa la Super al 100%.
- [ ] ESC pausa timer y game loop.
- [ ] Game Over abre resultados.
- [ ] `POST /scores` guarda una sola vez.
- [ ] Leaderboard muestra el nuevo score ordenado.
- [ ] Jugar de nuevo inicia limpio.

## Errores controlados
- [ ] Con JSON Server apagado se muestra ErrorState, no pantalla blanca.
- [ ] Con n8n apagado el score sigue guardándose y el resultado sigue visible.

## n8n
- [ ] Importar `n8n/neon-brawl-workflow.json`.
- [ ] Activar el workflow.
- [ ] Probar POST al webhook.
- [ ] Confirmar respuesta con `success`, `rank`, `achievement` y `bonusXp`.
- [ ] Tomar captura REAL del editor n8n para la entrega.

## Build
- [ ] `npm run build` termina sin errores.
- [ ] Consola del navegador sin errores críticos.
