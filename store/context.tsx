import React, { createContext, useState, useContext, ReactNode } from 'react';

interface StoreContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMode: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: string | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const defaultContextValue: StoreContextType = {
  darkMode: false,
  setDarkMode: () => {},
  toggleMode: () => {},
  isLoading: false,
  setIsLoading: () => {},
  currentUser: null,
  setCurrentUser: () => {},
};

const StoreContext = createContext<StoreContextType>(defaultContextValue);

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const toggleMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const value: StoreContextType = {
    darkMode,
    setDarkMode,
    toggleMode,
    isLoading,
    setIsLoading,
    currentUser,
    setCurrentUser,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

const useGlobalContext = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a StoreProvider');
  }
  return context;
};

export { useGlobalContext, StoreProvider };
