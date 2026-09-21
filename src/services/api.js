const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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

export const getBrawlers = () => request('/brawlers');
export const getMaps = () => request('/maps');
export const getMap = (id) => request(`/maps/${id}`);
export const getScores = () => request('/scores');
export const saveScore = (score) => request('/scores', { method: 'POST', body: JSON.stringify(score) });
