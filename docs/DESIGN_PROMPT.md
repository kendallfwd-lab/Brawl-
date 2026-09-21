# PROMPT MAESTRO DE DISEÑO — NEON BRAWL

## REDISEÑO VISUAL COMPLETO SIN ROMPER FUNCIONALIDAD

Quiero que realices un **REDISEÑO VISUAL COMPLETO** del proyecto existente llamado **NEON BRAWL**.

## IMPORTANTE

El proyecto **YA EXISTE** y ya tiene lógica funcional.

NO debes reconstruirlo desde cero.  
NO debes eliminar funcionalidades existentes.  
NO debes reemplazar innecesariamente la arquitectura React.  
NO debes convertirlo en una maqueta estática.

El juego debe seguir siendo completamente jugable.

Tu trabajo consiste en transformar visualmente la aplicación para que deje de parecer una práctica sencilla de React y se perciba como un videojuego arcade/brawler moderno, colorido, pulido y comercial.

Las imágenes incluidas en `docs/design-references/` son el **TARGET VISUAL PRINCIPAL**:

- `home-reference.png`
- `brawlers-reference.png`
- `gameplay-reference.png`

Úsalas como referencia directa para composición, proporciones, personajes, color, iluminación, volumen, diseño de HUD, botones, mapas, obstáculos, profundidad, efectos y sensación general de videojuego.

No copies personajes, logos, mapas ni assets protegidos de otros videojuegos. La identidad debe seguir siendo original y pertenecer a **NEON BRAWL**.

---

# 1. OBJETIVO PRINCIPAL

Quiero que el proyecto alcance simultáneamente:

**GAMEPLAY FUNCIONAL + DISEÑO VISUAL DE ALTA CALIDAD + IDENTIDAD ORIGINAL + BUEN GAME FEEL + RESPONSIVE + CERO REGRESIONES CRÍTICAS**.

No considero terminado el trabajo si:

- funciona pero parece un prototipo;
- parece bonito pero rompe mecánicas;
- solamente se cambiaron colores;
- solamente se añadieron sombras;
- se dejaron personajes geométricos básicos;
- el mapa continúa siendo una cuadrícula con rectángulos;
- el HUD continúa pareciendo un dashboard.

El resultado debe sentirse como un videojuego.

---

# 2. REGLA CRÍTICA: CONSERVAR FUNCIONALIDAD

Debes preservar completamente:

- movimiento;
- WASD;
- flechas;
- apuntado con mouse;
- disparos;
- munición;
- recarga;
- bots;
- IA;
- vida;
- respawn;
- colisiones;
- cajas destructibles;
- power-ups;
- Super;
- timer;
- score;
- kills;
- deaths;
- pausa;
- resultados;
- rutas;
- selección de personajes;
- selección de mapas;
- JSON Server;
- GET;
- POST;
- leaderboard;
- n8n;
- estados loading;
- estados error.

Si una modificación visual rompe cualquiera de estas funciones, la modificación es incorrecta. Corrige la presentación visual sin sacrificar lógica.

---

# 3. REFERENCIAS VISUALES

Las imágenes proporcionadas no son inspiración vaga. Son referencias visuales del objetivo.

Compara continuamente el proyecto real contra ellas y analiza especialmente:

- tamaño de los personajes;
- estilo cartoon;
- saturación;
- composición;
- formas redondeadas;
- botones;
- sombras;
- tarjetas;
- volumen;
- arena;
- bushes;
- cajas;
- muros;
- HUD;
- proyectiles;
- iluminación;
- fondos;
- tipografía.

No intentes hacer una copia exacta. Reinterpreta esa calidad visual con la identidad propia de NEON BRAWL.

---

# 4. DIRECCIÓN ARTÍSTICA

La nueva estética debe ser:

- CARTOON
- ARCADE
- SCI-FI
- COLORIDA
- JUGUETONA
- COMPETITIVA
- ENERGÉTICA
- 3D-LOOK

Evitar:

- minimalismo excesivo;
- dashboard corporativo;
- rectángulos planos;
- UI empresarial;
- fondos negros vacíos;
- componentes genéricos;
- botones HTML básicos;
- personajes hechos únicamente con círculos;
- mapas excesivamente geométricos.

Utilizar:

- outlines gruesos;
- gradientes;
- sombras fuertes;
- highlights;
- glow;
- volumen;
- depth;
- partículas;
- formas redondeadas;
- colores saturados;
- tipografía arcade.

---

# 5. DESIGN SYSTEM

Crear variables globales CSS y reutilizarlas.

```css
:root {
  --bg-deep: #07142f;
  --bg-blue: #0c1f46;
  --cyan: #38e8ff;
  --blue: #1fc7ff;
  --purple: #793cff;
  --purple-deep: #5127aa;
  --pink: #ed3dff;
  --yellow: #ffd52a;
  --orange: #ff922e;
  --red: #ff465e;
  --green: #45ed72;
  --white: #ffffff;
  --text-soft: #cbd5ef;
  --panel-dark: rgba(8, 18, 49, 0.94);
  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-lg: 30px;
  --shadow-card: 0 12px 30px rgba(0,0,0,.35);
  --shadow-button: 0 8px 0 rgba(0,0,0,.3);
}
```

Puedes ajustar ligeramente los tonos si mejora la composición, pero mantén consistencia global.

---

# 6. TIPOGRAFÍA

Utiliza una fuente display gruesa para logo, títulos, nombres, botones, score y timer.

Puedes utilizar fuentes libres similares a:

- Lilita One
- Titan One
- Bungee
- Luckiest Guy
- Bowlby One SC

Para texto normal:

- Nunito
- Inter
- Rubik

Los títulos deben tener `font-weight` alto, outline, text-shadow, contraste y buena separación.

---

# 7. LOGO

Rediseñar **NEON BRAWL**.

No mostrarlo únicamente como texto plano.

Composición:

**NEON**  
**BRAWL**

NEON: cyan / azul.  
BRAWL: amarillo / naranja.

Agregar:

- outline azul oscuro;
- sombra profunda;
- volumen;
- pequeños elementos gráficos;
- rayo/corona/emblema original.

Crear versión grande, navbar y loading.

---

# 8. HOME PAGE

Transformar completamente Home para acercarse a `home-reference.png`.

## Composición desktop

### Lado izquierdo

- logo grande;
- subtítulo: `ARENA · ACCIÓN · SIN LÍMITES`;
- descripción: `Entra a la arena, domina tus habilidades y supera a los bots en partidas rápidas llenas de energía.`;
- formulario de jugador;
- label `TU NOMBRE`;
- input grande;
- selector de dificultad: `FÁCIL`, `NORMAL`, `DIFÍCIL`;
- botón principal muy grande: `⚔ ENTRAR A LA ARENA →`.

El botón debe usar gradiente amarillo/naranja/magenta, outline, sombra, hover y pressed state.

### Lado derecho

Personaje VOLT grande, ocupando aproximadamente 40–50% del hero.

Agregar elementos flotantes:

- `⚡ SUPER READY`
- `+250 ELIMINATION`
- `VOLT`
- `ATACANTE`

Agregar glows, círculos orbitales, partículas y formas decorativas.

### Fondo

Arena/ciudad futurista desenfocada con profundidad:

`background → midground → character → UI foreground`.

---

# 9. NAVBAR

Rediseñar navbar.

Logo pequeño izquierda.

Opciones:

- BRAWLERS
- RANKING
- CÓMO JUGAR

Agregar iconos. Usar botones estilo pill/card arcade. Estado activo: cyan + glow + outline.

---

# 10. SELECCIÓN DE BRAWLERS

Inspirarse directamente en `brawlers-reference.png`.

Título: `ELIGE TU BRAWLER`.

Subtítulo: `Cada combatiente tiene estadísticas, ritmo y una Súper diferente.`

Mostrar tres tarjetas grandes:

- VOLT
- NYX
- TANK-X

No deben parecer cards SaaS. Deben parecer fichas de videojuego.

## VOLT

Color principal: cyan / azul.  
Rol: `⚡ ATACANTE`.

Stats:

- ❤️ HP 3200
- 💥 DMG 650
- » SPD 260
- ☠ SUPER EMP BLAST

Personaje grande, casco futurista, visor luminoso, arma energética y pose dinámica.

Card seleccionada:

- outline cyan;
- glow;
- scale ligero;
- badge `SELECCIONADO`.

## NYX

Color: magenta / morado.  
Rol: ASESINA.

Visual más rápido, estilizado, dinámico y con armamento ligero.

## TANK-X

Color: amarillo / naranja.  
Rol: TANQUE.

Visual grande, robusto, pesado, con armadura exagerada y brazos voluminosos.

Cada tarjeta debe incorporar personaje, nombre, rol, descripción, stats, Super, background propio, glow, outline, hover y selected state.

Botón inferior: `ELEGIR ARENA →`, amarillo/naranja. Botón volver: azul profundo.

---

# 11. PERSONAJES

Los personajes actuales son demasiado geométricos.

Mejorar significativamente su diseño.

NO quiero `círculo + varios polígonos sencillos` como representación final.

Crear assets originales mediante SVG detallados, PNG/WebP locales o composición CSS/SVG suficientemente elaborada.

Guardar en:

```text
src/assets/characters/
  volt/
  nyx/
  tank-x/
```

Estilo chibi/cartoon sci-fi:

- cabezas relativamente grandes;
- cuerpos compactos;
- armas grandes;
- pies/manos visibles;
- outlines gruesos;
- sombras internas;
- highlights;
- color coding;
- siluetas reconocibles.

---

# 12. SELECCIÓN DE ARENAS

Título: `ELIGE LA ARENA`.

Mostrar tres tarjetas con preview visual real del mapa.

## Arena Neón

- suelo morado;
- bushes verdes;
- cajas naranjas;
- paredes violeta/azul;
- ambiente futurista.

## Cyber Factory

- metal;
- cyan;
- azules oscuros;
- contenedores;
- luces industriales.

## Crystal Canyon

- violeta;
- rocas;
- cristales;
- vegetación alien;
- brillos.

Cards con hover, shadow, depth, highlight e imagen grande.

Botón: `JUGAR →`.

---

# 13. GAMEPLAY

Esta es la pantalla más importante y debe ser la prioridad visual número uno.

Usa `gameplay-reference.png` como target.

Mantener todo el motor actual. NO reescribir lógica solamente por estética.

Transformar:

- arena;
- obstáculos;
- personajes;
- proyectiles;
- HUD;
- FX.

---

# 14. ARENA Y SUELO

La arena no debe sentirse como `grid + rectángulos`.

Debe sentirse como un mapa de videojuego.

Crear:

- suelo;
- rocas;
- piedras;
- vegetación;
- debris;
- decoración;
- luces;
- sombras;
- bordes;
- detalles.

Reducir muchísimo el grid visible y usar patrones sutiles.

Arena Neon debe usar morado/azul violeta y tener tiles sutiles, grietas, piedras, manchas, detalles tecnológicos y variaciones tonales.

---

# 15. BUSHES

Rediseñarlos completamente.

No utilizar simple rectángulo verde.

Construir grupos de hojas/blobs con:

- verde oscuro base;
- verde brillante;
- highlight superior;
- shadow inferior.

Deben conservar exactamente su comportamiento actual de colisión/ocultación.

---

# 16. CAJAS

Crear cajas cartoon volumétricas naranjas con:

- outline;
- top face;
- front face;
- shadow;
- highlight;
- gran símbolo X;
- estado dañado;
- animación al recibir impacto.

Mantener hitbox actual.

---

# 17. PAREDES Y BARRILES

Paredes: bloques sólidos azul/violeta/gris azulado con cara superior, cara frontal, outline y shadow. Deben parecer elevados.

Barriles: azul/naranja, forma cilíndrica, top circle, rim, highlight y shadow.

---

# 18. SPRITE VISUAL VS HITBOX

Separar visual y física.

Ejemplo:

```js
visualSize: 72,
hitboxRadius: 21
```

Los personajes pueden verse grandes sin alterar física. NO aumentar hitbox porque el sprite sea mayor.

---

# 19. JUGADOR Y BOTS

Jugador:

- sprite cartoon;
- sombra;
- círculo verde inferior;
- nombre;
- barra HP;
- arma;
- orientación clara;
- bob/squash al moverse;
- recoil y muzzle flash al disparar;
- hit flash, shake y damage number al recibir daño.

Bots:

- estilo coherente;
- colores distintos;
- círculo rojo inferior;
- nombre;
- HP.

No mostrar PATROL/CHASE/ATTACK/FLEE en experiencia normal. Eso queda solo en DEBUG.

---

# 20. PROJECTILES

Hacerlos grandes, claros y luminosos.

- VOLT: cyan / eléctrico.
- NYX: magenta.
- TANK-X: amarillo/naranja.

Agregar glow, trail, pequeñas partículas e impact flash.

---

# 21. HUD

Rediseñar completamente el HUD como videojuego móvil/arcade.

## Arriba izquierda

- avatar circular;
- nombre;
- HP numérico;
- barra verde.

## Arriba centro

Panel timer:

```text
ARENA
01:58
SCORE 0
```

## Arriba derecha

- KILLS
- DEATHS
- kill feed debajo.

## Abajo izquierda

Joystick visual decorativo y MUNICIÓN con cartuchos visuales.

Ejemplo:

```text
▰ ▰ ▰
▰ ▰ □
```

## Abajo derecha

Botón circular SUPER grande con porcentaje, nombre y habilidad.

Ejemplo:

```text
78%
SUPER
GROUND SHOCK
```

Al 100%: amarillo intenso, glow, pulse, partículas y `SUPER READY`.

---

# 22. KILL FEED Y DAMAGE NUMBERS

Kill feed estilo arcade:

`🔥 Bot Pulse eliminó a Bot Hex`.

Card pequeña, fondo oscuro translúcido, outline morado/cyan y animación slide-in / hold / fade-out.

Damage numbers:

`-650`

Agregar scale, float y fade. Usar blanco, amarillo o rojo según tipo.

---

# 23. GAME FEEL

Agregar obligatoriamente:

- muzzle flash;
- projectile trail;
- hit flash;
- damage number;
- character recoil;
- small screen shake;
- elimination burst;
- power-up glow;
- super pulse;
- particle effects.

Mantener rendimiento y eliminar automáticamente los efectos cuando terminan.

---

# 24. POWER-UPS

Rediseñar:

- HEAL: corazón/cruz verde;
- SPEED: rayo cyan;
- SHIELD: escudo azul;
- DAMAGE: explosión naranja/roja.

Agregar ring inferior, glow, float animation y particles.

---

# 25. COUNTDOWN Y SUPER

Countdown:

```text
3
2
1
BRAWL!
```

Enorme, centrado, con scale, impact y fade. `BRAWL!` amarillo/naranja.

Cuando Super llega a 100%, la UI debe reaccionar claramente con glow, pulse, partículas y `SUPER READY`.

Al activarse: onda expansiva, flash, screen shake suave y partículas.

---

# 26. PAUSA

Fondo gameplay blur/darken.

Modal:

- PARTIDA PAUSADA
- CONTINUAR
- REINICIAR
- SALIR

Estética arcade y botones grandes.

---

# 27. RESULTADOS

Transformar completamente la pantalla.

## Victoria

- fondo azul/cyan;
- glow;
- confetti;
- personaje grande;
- pose;
- score animado.

## Derrota

- morado/rojo;
- más dramático;
- mantener calidad visual.

Mostrar:

- nombre;
- brawler;
- eliminaciones;
- muertes;
- puntos;
- precisión;
- daño;
- power-ups;
- rango;
- MVP si corresponde.

Botones:

- JUGAR DE NUEVO
- CAMBIAR BRAWLER
- RANKING
- MENÚ

---

# 28. LEADERBOARD

No dejarlo como tabla sencilla.

Crear TOP 3 con podio:

🥇 🥈 🥉

Mostrar avatar, nombre, score y kills.

Después, resto del ranking. Jugador actual resaltado con outline, glow y badge.

---

# 29. CÓMO JUGAR

Crear tarjetas visuales:

- WASD — MOVERTE
- MOUSE — APUNTAR
- CLICK — DISPARAR
- SPACE — SUPER
- ESC — PAUSA

Agregar iconos. No usar únicamente texto.

---

# 30. LOADING Y ERROR STATES

Loading:

- logo NEON BRAWL;
- `PREPARANDO ARENA...`;
- barra animada;
- tip aleatorio;
- pequeña animación de personaje.

Error:

```text
CONEXIÓN PERDIDA
No pudimos conectar con los servidores de la arena.
[ REINTENTAR ]
[ VOLVER AL MENÚ ]
```

Mantener estética del juego.

---

# 31. BOTONES Y PROFUNDIDAD

Todos los botones principales deben verse físicos.

Usar gradient, border, outline, shadow, hover y pressed state.

Ejemplo conceptual:

```css
background: linear-gradient(...);
box-shadow:
  0 8px 0 var(--button-shadow),
  0 14px 30px rgba(...);
```

Hover: `scale(1.03)`.

Pressed: `translateY(5px)` y reducir sombra.

Utilizar además inset shadows, outlines, pseudo-elements, highlights y ambient glow.

---

# 32. CAPAS

Definir un sistema coherente:

```text
0   background
5   terrain
10  decoration
15  obstacles
20  bushes / power-ups
30  characters
35  projectiles
40  particles
100 HUD
150 notifications
200 modal
```

No crear z-index aleatorios.

---

# 33. ANIMACIONES

Crear o actualizar `animations.css` con:

- float
- pulse
- glow
- popIn
- damageFloat
- hitFlash
- elimination
- superReady
- buttonBounce
- screenShake
- slideIn

Duraciones generales: 150ms–800ms. Decoraciones ambientales pueden durar más.

---

# 34. ASSETS

Guardar todo localmente.

Estructura sugerida:

```text
src/assets/
  characters/
    volt/
    nyx/
    tank-x/
  maps/
  ui/
  icons/
  fx/
```

No depender de URLs externas ni links temporales.

---

# 35. PLACEHOLDERS

Durante desarrollo se permiten, pero antes de terminar eliminar visualmente:

- PLAYER
- BOT
- IMAGE HERE
- PLACEHOLDER
- TODO

---

# 36. RESPONSIVE

Optimizar específicamente:

- 1920×1080
- 1366×768

En gameplay no debe existir scroll.

```css
html,
body,
#root {
  width: 100%;
  height: 100%;
}
```

Durante arena: `overflow: hidden`.

Debe mantenerse visible timer, HP, kills, deaths, ammo, Super y gameplay.

---

# 37. ORDEN DE IMPLEMENTACIÓN

Trabaja en este orden exacto:

1. Design System.
2. Assets de personajes.
3. Arena/obstáculos.
4. Gameplay HUD.
5. Gameplay FX.
6. Home.
7. Selección Brawlers.
8. Selección Arenas.
9. Results.
10. Leaderboard.
11. Instructions.
12. Loading/Error/Pause.
13. Responsive.
14. Visual QA.

Este orden es importante porque el GAMEPLAY debe recibir la mayor atención visual.

---

# 38. VALIDACIÓN DESPUÉS DE CADA ETAPA

Después de cada cambio ejecutar el proyecto y comprobar:

- consola;
- movement;
- shooting;
- bots;
- collisions;
- Super;
- timer;
- pause;
- navigation.

No continuar acumulando errores.

---

# 39. NO REGRESSION

Después de rediseñar gameplay: probar una partida completa.

Después de modificar personajes: probar colisiones.

Después de modificar obstáculos: probar movimiento.

Después de modificar HUD: probar score/timer.

Después de modificar Results: probar POST.

No solucionar estética rompiendo funcionalidad.

---

# 40. VISUAL QA

Capturar screenshots de:

- Home
- Brawlers
- Arena Selection
- Gameplay
- Results
- Leaderboard

En 1920×1080 y 1366×768.

Compararlas con las imágenes de `docs/design-references/`.

Preguntarse:

- ¿se siente colorido?
- ¿se siente cartoon?
- ¿hay profundidad?
- ¿los personajes tienen presencia?
- ¿los botones parecen videojuego?
- ¿el HUD parece un HUD real?
- ¿el mapa parece una arena?
- ¿los obstáculos tienen volumen?
- ¿el resultado se acerca al nivel visual de las referencias?

Si la respuesta es NO, seguir iterando.

---

# 41. CRITERIOS DE ACEPTACIÓN VISUALES

## Home

Pasa solamente si:

- logo tiene presencia;
- Volt ocupa gran parte del hero;
- fondo tiene profundidad;
- botón principal parece arcade;
- formulario está integrado visualmente;
- la captura parece una pantalla de videojuego.

## Brawlers

Pasa solamente si:

- los tres personajes tienen diseños claramente distintos;
- cards tienen colores propios;
- seleccionado es evidente;
- stats son legibles;
- personajes dominan visualmente la pantalla.

## Gameplay

Pasa solamente si:

- arena no parece una cuadrícula;
- bushes parecen vegetación;
- cajas tienen volumen;
- paredes parecen elevadas;
- personajes parecen cartoon;
- bots se distinguen;
- proyectiles tienen efectos;
- HUD parece videojuego;
- Super tiene presencia;
- gameplay sigue funcionando.

## Results

Pasa solamente si:

- parece una verdadera pantalla de victoria/derrota;
- personaje tiene protagonismo;
- stats tienen jerarquía;
- rango es visible;
- botones se ven arcade.

---

# 42. PRUEBA FINAL

Ejecutar una partida completa:

```text
HOME
→ BRAWLERS
→ ARENA
→ GAMEPLAY
→ RESULTS
→ LEADERBOARD
→ PLAY AGAIN
```

Comprobar funcionamiento, estética, responsive y consola.

Realizar una segunda partida y verificar que:

- no se duplican bots;
- no se duplican listeners;
- no se duplica timer;
- no se duplica score;
- no existen errores visuales.

---

# 43. BUILD FINAL

Ejecutar:

```bash
npm run build
```

Debe finalizar sin errores.

No afirmar que todo funciona si no fue probado.

---

# 44. REGLA FINAL DE CALIDAD

NO quiero un simple cambio de CSS.

Quiero una transformación visual completa.

La diferencia entre BEFORE y AFTER debe ser evidente inmediatamente.

## BEFORE

Prototipo React oscuro, geométrico y sencillo.

## AFTER

Videojuego cartoon arcade moderno.

El resultado debe tener:

- PERSONAJES CON PRESENCIA
- MAPAS CON DETALLE
- OBSTÁCULOS CON VOLUMEN
- HUD DE VIDEOJUEGO
- COLORES SATURADOS
- BUENA TIPOGRAFÍA
- PARTÍCULAS
- GAME FEEL
- ANIMACIONES
- PROFUNDIDAD
- RESPONSIVE
- FUNCIONALIDAD INTACTA

Las imágenes incluidas en `docs/design-references/` representan el objetivo visual.

No termines mientras el juego siga pareciendo un prototipo académico.

Quiero que NEON BRAWL visualmente se sienta como un videojuego completo, manteniendo al mismo tiempo toda la funcionalidad que ya existe.
