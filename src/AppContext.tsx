import React, { createContext, useState, ReactNode } from 'react';
import { Product } from './types';

// Define the shape of the context state
interface AppContextType {
  personalList: Product[];
  setPersonalList: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

// Create the context with a default value
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [personalList, setPersonalList] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <AppContext.Provider
      value={{ personalList, setPersonalList, cart, setCart }}
    >
      {children}
    </AppContext.Provider>
  );
};
