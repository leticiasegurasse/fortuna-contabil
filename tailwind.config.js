/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fdfbf7',
          100: '#faf7ed',
          200: '#f5eed8',
          300: '#eee2c0',
          400: '#e5d3a3',
          500: '#C5A46D', /* Dourado (Primária – destaque) */
          600: '#b8945a',
          700: '#a8834a',
          800: '#8f6f3d',
          900: '#755c33',
        },
        secondary: {
          50: '#f5f5f5',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#2E2E2E', /* Cinza Escuro (Secundária – texto) */
          600: '#1f1f1f',
          700: '#171717',
          800: '#0f0f0f',
          900: '#080808',
        },
        accent: {
          50: '#f2f7f4',
          100: '#e6efea',
          200: '#bfd9cc',
          300: '#99c3ae',
          400: '#4d9a7a',
          500: '#3A6B52', /* Verde Elegante (Complementar – financeiro) */
          600: '#2f5a44',
          700: '#254936',
          800: '#1b3828',
          900: '#11271a',
        },
        neutral: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#c8c8c8',
          400: '#a0a0a0',
          500: '#6E6E6E', /* Cinza Médio (Neutro – apoio) */
          600: '#5a5a5a',
          700: '#464646',
          800: '#323232',
          900: '#1e1e1e',
        },
        background: {
          50: '#fefefd',
          100: '#fdfcfb',
          200: '#faf9f5',
          300: '#f6f4ed',
          400: '#f1eee4',
          500: '#F8F6F1', /* Branco Off-white (Fundo leve) */
          600: '#e8e6e1',
          700: '#d8d6d1',
          800: '#c8c6c1',
          900: '#b8b6b1',
        }
      }
    },
  },
  plugins: [],
}