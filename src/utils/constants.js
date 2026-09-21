export const ARENA_WIDTH = 960;
export const ARENA_HEIGHT = 600;
export const MATCH_SECONDS = 120;
export const MAX_DEATHS = 3;
export const DEBUG_GAME = false;

export const DIFFICULTY = {
  easy: { label: 'Fácil', botSpeed: 0.82, botDamage: 0.8, accuracy: 0.56, fireRate: 1.22 },
  normal: { label: 'Normal', botSpeed: 1, botDamage: 1, accuracy: 0.72, fireRate: 1 },
  hard: { label: 'Difícil', botSpeed: 1.12, botDamage: 1.12, accuracy: 0.86, fireRate: 0.82 },
};

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
export const uid = (prefix = 'id') => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
