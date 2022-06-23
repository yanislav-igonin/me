import { Dispatch, useEffect, useState } from 'react';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export const useTheme = () => {
  const isBrowser = typeof window !== 'undefined';
  const [theme, setTheme] = useState(
    isBrowser ? localStorage.theme as Theme : Theme.Light
  );
  const previousTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(previousTheme);
    root.classList.add(theme);

    if (isBrowser) {
      localStorage.setItem('theme', theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return [theme, setTheme] as [Theme, Dispatch<Theme>];
}
