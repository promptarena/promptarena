// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useMemo,
// } from 'react';

// // Create a Theme Context
// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(
//     localStorage.getItem('theme') ||
//       (window.matchMedia('(prefers-color-scheme: dark)').matches
//         ? 'dark'
//         : 'light')
//   );

//   useEffect(() => {
//     // Add or remove the 'dark' class on the root HTML element
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//     // Save theme to local storage
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
//   };

//   const providerValue = useMemo(
//     () => ({ theme, toggleTheme }),
//     [theme, toggleTheme]
//   );

//   return (
//     <ThemeContext.Provider value={providerValue}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// // Custom hook to use the ThemeContext
// export const useTheme = () => useContext(ThemeContext);

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

// Create a Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Set default theme as 'dark'
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Add or remove the 'dark' class on the root HTML element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save theme to local storage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const providerValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
