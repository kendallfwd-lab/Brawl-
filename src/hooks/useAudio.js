import { useCallback, useRef } from 'react';

const tones = {
  shoot: [520, 0.045, 'square', 0.035],
  hit: [180, 0.06, 'sawtooth', 0.035],
  kill: [760, 0.11, 'triangle', 0.05],
  power: [920, 0.12, 'sine', 0.045],
  super: [280, 0.22, 'sawtooth', 0.055],
};

export default function useAudio() {
  const contextRef = useRef(null);
  const play = useCallback((name) => {
    try {
      if (localStorage.getItem('neon-sfx') === 'off') return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!contextRef.current) contextRef.current = new AudioCtx();
      const ctx = contextRef.current;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const [frequency, duration, type, volume] = tones[name] || tones.hit;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(90, frequency * 0.65), ctx.currentTime + duration);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + duration);
    } catch {
      // El audio nunca debe romper el gameplay.
    }
  }, []);
  return { play };
}
