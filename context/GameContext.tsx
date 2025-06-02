import React, { createContext, useState, useContext } from 'react';

interface GameContextType {
  completedLevels: number[];
  completeLevel: (level: number) => void;
  resetGame: () => void;
  backgroundMusic: boolean;
  toggleBackgroundMusic: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [backgroundMusic, setBackgroundMusic] = useState<boolean>(true);

  const completeLevel = (level: number) => {
    if (!completedLevels.includes(level)) {
      setCompletedLevels([...completedLevels, level]);
    }
  };

  const resetGame = () => {
    setCompletedLevels([]);
  };

  const toggleBackgroundMusic = () => {
    setBackgroundMusic(!backgroundMusic);
  };

  return (
    <GameContext.Provider 
      value={{ 
        completedLevels, 
        completeLevel, 
        resetGame, 
        backgroundMusic, 
        toggleBackgroundMusic 
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameContextProvider');
  }
  return context;
}