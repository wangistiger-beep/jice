/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#ffeb3b',
        danger: '#ff3b3b',
        cyan: '#00e5ff',
        green: '#69ff47',
      },
      fontFamily: {
        mono: ['Space Mono', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px #000000',
        'brutal-lg': '8px 8px 0px 0px #000000',
        'brutal-sm': '2px 2px 0px 0px #000000',
        'brutal-red': '4px 4px 0px 0px #ff3b3b',
        'brutal-yellow': '4px 4px 0px 0px #ffeb3b',
      },
    },
  },
  plugins: [],
}
