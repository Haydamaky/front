import {
  colorVariats500,
  colorVariats700,
  colorVariatsBorder500,
  positionCoors,
} from './src/app/(game)/game/_utils';
import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    ...Object.values(colorVariats500),
    ...Object.values(colorVariats700),
    ...Object.values(colorVariatsBorder500),
    ...positionCoors,
  ],
  theme: {
    extend: {
      height: {
        '7.5': '1.875rem',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      fontFamily: {
        custom: ['var(--font-titleFont)'],
        second: ['var(--font-genFont)'],
      },
      fontSize: {
        smallMob: '8px',
        standardMob: '10px',
        standard: '13px',
        lg: '16px',
      },
      colors: {
        primary: 'rgb(115, 113, 252)',
        secondary: 'rgb(165, 148, 249)',
        tertiary: 'rgb(205, 193, 255)',
        base: 'rgb(245, 239, 255)',
        helper: 'rgb(229, 217, 242)',
        playerCard: 'rgba(245, 239, 255, 0.2)',
        gameWhite: 'rgba(251, 251, 250, 1)',
        primaryGame: 'rgba(0, 33, 71, 1)',
      },
      backgroundImage: {
        playerGradient:
          'linear-gradient(171.61deg, rgba(0, 3, 40, 0.3) 9.18%, rgba(0, 69, 142, 0.3) 93.58%)',
      },
      boxShadow: {
        combined: '0px 4px 4px 0px #00000040 inset, 0px 2px 1px 0px #0000004D',
      },
    },
  },
  darkMode: ['class', 'class'],
  plugins: [nextui(), require('tailwindcss-animate')],
};
export default config;
