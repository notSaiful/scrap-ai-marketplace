/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"SF Pro Display"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro"',
          'system-ui',
          'sans-serif',
        ],
        display: [
          '"SF Pro Display"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro"',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          '"SF Mono"',
          'ui-monospace',
          'Menlo',
          'Monaco',
          'monospace',
        ],
      },
      colors: {
        apple: {
          blue: '#0071e3',
          'blue-hover': '#0077ed',
          dark: '#1d1d1f',
          subtext: '#86868b',
          gray: '#f5f5f7',
          card: '#ffffff',
          border: 'rgba(0, 0, 0, 0.08)',
          green: '#34c759',
        },
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#36abf7',
          500: '#0071e3',
          600: '#0071e3',
          700: '#005bb5',
          800: '#00478f',
          900: '#0b3f6f',
          950: '#072849',
        },
      },
    },
  },
  plugins: [],
}
