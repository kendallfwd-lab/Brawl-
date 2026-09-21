import { createContext, useContext, useMemo, useState } from 'react';

const GameContext = createContext(null);

const readSession = (key, fallback) => {
  try {
    const value = sessionStorage.getItem(key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

export function GameProvider({ children }) {
  const [playerName, setPlayerNameState] = useState(() => readSession('neon-player', ''));
  const [selectedBrawlerId, setSelectedBrawlerState] = useState(() => readSession('neon-brawler', 'volt'));
  const [difficulty, setDifficultyState] = useState(() => readSession('neon-difficulty', 'normal'));

  const setPlayerName = (name) => {
    setPlayerNameState(name);
    sessionStorage.setItem('neon-player', name);
  };
  const setSelectedBrawlerId = (id) => {
    setSelectedBrawlerState(id);
    sessionStorage.setItem('neon-brawler', id);
  };
  const setDifficulty = (value) => {
    setDifficultyState(value);
    sessionStorage.setItem('neon-difficulty', value);
  };

  const value = useMemo(() => ({
    playerName,
    setPlayerName,
    selectedBrawlerId,
    setSelectedBrawlerId,
    difficulty,
    setDifficulty,
  }), [playerName, selectedBrawlerId, difficulty]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGameContext = () => {
  const value = useContext(GameContext);
  if (!value) throw new Error('useGameContext debe usarse dentro de GameProvider');
  return value;
};
