/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { DefaultTheme, ThemeProvider as StyledComponentsThemeProvider, css } from 'styled-components';
import { Colors } from './styled';

export * from './components';

const MEDIA_WIDTHS = {
  upToExtra2Small: 320,
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
};

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    accumulator[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${MEDIA_WIDTHS[size]}px) {
        ${css(a, b, c)}
      }
    `;
    return accumulator;
  },
  {},
) as any;

const white = '#FFFFFF';
const black = '#000000';

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,
    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#C3C5CB' : '#565A69',
    text3: darkMode ? '#6C7284' : '#888D9B',
    text4: darkMode ? '#565A69' : '#C3C5CB',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',
    // backgrounds / greys
    bg1: darkMode ? '#202231' : '#FFFFFF',
    bg2: darkMode ? 'rgb(22, 21, 34)' : '#F7F8FA',
    bg3: darkMode ? '#2a3a50' : '#EDEEF2',
    bg4: darkMode ? '#3a506f' : '#CED0D9',
    bg5: darkMode ? '#6C7284' : '#888D9B',
    // specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',
    // primary colors
    primary1: darkMode ? '#0094ec' : '#0e0e23',
    primary2: darkMode ? '#0097fb' : '#FF8CC3',
    primary3: darkMode ? '#00aff5' : '#FF99C9',
    primary4: darkMode ? '#376bad70' : '#F6DDE8',
    primary5: darkMode ? '#153d6f70' : '#ebebeb',
    // color text
    primaryText1: darkMode ? '#6da8ff' : '#0e0e23',
    // secondary colors
    secondary1: darkMode ? '#0094ec' : '#ff007a',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#ebebeb',
    // other
    red1: '#FD4040',
    red2: '#F82D3A',
    red3: '#D60000',
    green1: '#27AE60',
    yellow1: '#FFE270',
    yellow2: '#F3841E',
    blue1: '#0094ec',
    borderRadius: '10px',
  };
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),
    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },
    shadow1: darkMode ? '#000' : '#2F80ED',
    mediaWidth: mediaWidthTemplates,
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export default function ThemeProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const darkMode = true;
  const themeObject = useMemo(() => theme(darkMode), [darkMode]);
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
}
