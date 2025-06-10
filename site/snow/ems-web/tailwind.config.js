/* eslint-disable no-undef */

const { transform } = require('lodash');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,html}'],
  darkMode: 'class', // 或者 'media' 或者 'class'
  theme: {
    extend: {
      colors: {
        'main-bg': {
          DEFAULT: '#FCFCFC',
          dark: '#0F1014',
        },
        'aside-bg': {
          DEFAULT: '#0C0E12',
          hover: '#1F212A',
          light: '#ffffff',
        },
        'main-text': {
          DEFAULT: '#4B5675',
          dark: '#9a9cae',
        },
        'main-blue': {
          1: '#e6f4ff',
          2: '#bae0ff',
          3: '#91caff',
          4: '#69b1ff',
          5: '#4096ff',
          6: '#1677ff',
          7: '#0958d9',
          8: '#003eb3',
          9: '#002c8c',
          10: '#001d66',
          DEFAULT: '#1677ff',
          disabled: '#4096ff',
          hover: '#4096ff',
        },
        'border-color': {
          DEFAULT: 'rgba(5, 5, 5, 0.06)',
        },
      },
      keyframes: {
        'bounce-loading': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-80%)' },
        },
        'bounce-loading-1': {
          '0%, 100%': { transform: 'translateY(-80%)' },
          '50%': { transform: 'translateY(0)' },
        },
        typing: {
          from: { width: 0 },
          to: { width: '100%' },
        },
        loading: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(180deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        'bounce-loading': 'bounce 3s linear infinite',
        loading: 'loading 1.5s linear infinite',
      },
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      xxl: '1580px',
    },
  },
  important: true,
  plugins: [],
  corePlugins: {
    preflight: false, // 添加这一行
  },
};
