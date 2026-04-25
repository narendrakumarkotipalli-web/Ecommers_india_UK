import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '../types/product';

type Theme = 'light' | 'dark';
type Accent = 'rose' | 'sage' | 'sky';

interface ThemeContextType {
  theme: Theme;
  accent: Accent;
  currency: Currency;
  toggleTheme: () => void;
  setAccent: (accent: Accent) => void;
  setCurrency: (currency: Currency) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [accent, setAccent] = useState<Accent>('rose');
  const [currency, setCurrency] = useState<Currency>('INR');

  useEffect(() => {
    // Auto-detect location (Mock)
    const detectLocation = async () => {
      try {
        // In a real app, you'd use a geolocation API or IP-based service
        // Mock: 50% chance for UK, 50% for India
        const isUK = Math.random() > 0.5;
        setCurrency(isUK ? 'GBP' : 'INR');
      } catch (error) {
        console.error("Failed to detect location", error);
      }
    };
    detectLocation();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accent', accent);
  }, [theme, accent]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, accent, currency, toggleTheme, setAccent, setCurrency }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
