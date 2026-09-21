import { useEffect, useRef } from 'react';

export default function useKeyboard(enabled = true) {
  const keys = useRef(new Set());
  useEffect(() => {
    if (!enabled) return undefined;
    const down = (event) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) event.preventDefault();
      keys.current.add(event.code);
    };
    const up = (event) => keys.current.delete(event.code);
    const clear = () => keys.current.clear();
    window.addEventListener('keydown', down, { passive: false });
    window.addEventListener('keyup', up);
    window.addEventListener('blur', clear);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', clear);
      clear();
    };
  }, [enabled]);
  return keys;
}
