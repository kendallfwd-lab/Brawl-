export async function sendMatchToN8n(payload) {
  const url = import.meta.env.VITE_N8N_WEBHOOK_URL || '/n8n/webhook/neon-brawl-score';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);
  try {
    const response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`n8n HTTP ${response.status}`);
    const data = await response.json();
    return { online: true, ...data };
  } catch (error) {
    return { online: false, message: 'No fue posible obtener el rango online.', error: error.message };
  } finally {
    clearTimeout(timeout);
  }
}
