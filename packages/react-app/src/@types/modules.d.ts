import { ThemeSwitcherProvider as IThemeSwitcherProvider } from 'react-css-theme-switcher';

declare module 'react-css-theme-switcher' {
  interface ThemeSwitcherContext {
    currentTheme?: 'dark' | 'light';
    themes: Record<any, string>;
    switcher: ({ theme }: { theme: string }) => void;
    status: Status;
  }
  export declare function useThemeSwitcher(): ThemeSwitcherContext;
  export declare function ThemeSwitcherProvider(): IThemeSwitcherProvider;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
