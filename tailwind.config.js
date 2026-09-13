/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: '#0b0f19',
          panel: 'rgba(17, 24, 39, 0.7)',
        }
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
        glow: '0 0 20px -5px rgba(99, 102, 241, 0.4)',
      },
    },
  },
  plugins: [],
}
