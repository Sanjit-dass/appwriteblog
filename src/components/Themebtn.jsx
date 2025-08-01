import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

function ThemeToggleButton() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-gray-300 dark:bg-gray-600 rounded-full p-1 flex items-center transition-colors "
    >
      <div
        className={`absolute bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-6' : ''
        }`}
      >
        <div className="flex items-center justify-center h-full">
          {theme === 'dark' ? (
            <Moon className="w-4 h-4 text-yellow-300" />
          ) : (
            <Sun className="w-4 h-4 text-yellow-500" />
          )}
        </div>
      </div>
    </button>
  );
}

export default ThemeToggleButton;
