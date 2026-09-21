import seedData from '../../db.json';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const USE_JSON_SERVER = import.meta.env.DEV || Boolean(import.meta.env.VITE_API_URL);
const LOCAL_SCORES_KEY = 'neon-brawl-local-scores';

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function getLocalScores() {
  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_SCORES_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function saveLocalScore(score) {
  const record = {
    ...score,
    id: score.id || globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    date: score.date || new Date().toISOString(),
  };
  localStorage.setItem(LOCAL_SCORES_KEY, JSON.stringify([record, ...getLocalScores()].slice(0, 50)));
  return record;
}

export const getBrawlers = () => USE_JSON_SERVER ? request('/brawlers') : Promise.resolve(seedData.brawlers);
export const getMaps = () => USE_JSON_SERVER ? request('/maps') : Promise.resolve(seedData.maps);
export const getMap = (id) => USE_JSON_SERVER
  ? request(`/maps/${id}`)
  : Promise.resolve(seedData.maps.find((map) => String(map.id) === String(id)));
export const getScores = () => USE_JSON_SERVER
  ? request('/scores')
  : Promise.resolve([...getLocalScores(), ...seedData.scores]);
export const saveScore = (score) => USE_JSON_SERVER
  ? request('/scores', { method: 'POST', body: JSON.stringify(score) })
  : Promise.resolve(saveLocalScore(score));
