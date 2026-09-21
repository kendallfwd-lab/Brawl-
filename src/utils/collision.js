export function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export function circleRectOverlap(circle, rect) {
  const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.w));
  const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.h));
  const dx = circle.x - closestX;
  const dy = circle.y - closestY;
  return dx * dx + dy * dy < circle.r * circle.r;
}

export function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function isBlocked(entity, obstacles) {
  return obstacles.some((obstacle) => obstacle.solid !== false && rectsOverlap(entity, obstacle));
}

export function moveWithCollisions(entity, dx, dy, obstacles, bounds) {
  const next = { ...entity };
  const candidateX = { ...next, x: Math.max(0, Math.min(bounds.w - next.w, next.x + dx)) };
  if (!isBlocked(candidateX, obstacles)) next.x = candidateX.x;
  const candidateY = { ...next, y: Math.max(0, Math.min(bounds.h - next.h, next.y + dy)) };
  if (!isBlocked(candidateY, obstacles)) next.y = candidateY.y;
  return next;
}
