import { useEffect, useState } from 'react';
import { useTheme, Theme } from '../utils';

const lightModePath = <path
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth={2}
  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
/>;
const darkModePath = <path
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth={2}
  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
/>;
const lightColor = 'text-white';
const darkColor = 'text-black';

export const DarkModeButton = () => {
  const [theme, setTheme] = useTheme();
  const [color, setColor] = useState(darkColor);
  const [path, setPath] = useState(lightModePath);

  const isDarkNow = theme === Theme.Dark;
  const nextTheme = isDarkNow ? Theme.Light : Theme.Dark;

  useEffect(() => {
    const nextPath = isDarkNow ? darkModePath : lightModePath;
    setPath(nextPath);
    const nextColor = isDarkNow ? lightColor : darkColor;
    setColor(nextColor);
  }, [isDarkNow]);

  return <svg
    onClick={() => setTheme(nextTheme)}
    xmlns="http://www.w3.org/2000/svg"
    className={`cursor-pointer h-10 w-10 ${color} hover:text-rose-500`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {path}
  </svg>;
};
