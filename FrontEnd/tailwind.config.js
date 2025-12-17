/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados del tema Synthwave
        'neon-pink': '#ff2e9d',
        'neon-cyan': '#00ffcc',
        'purple-primary': '#6c63ff',
        'purple-dark': '#9d00ff',
        'bg-dark': '#0a0a0a',
        'bg-card': '#1a1a1a',
        'bg-input': '#2a2a2a',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        sharetech: ['Share Tech Mono', 'monospace'],
      },
      boxShadow: {
        'neon-pink': '0 0 10px #ff2e9d, 0 0 20px #ff2e9d, 0 0 40px #ff2e9d',
        'neon-cyan': '0 0 10px #00ffcc, 0 0 20px #00ffcc, 0 0 40px #00ffcc',
        'neon-purple': '0 0 15px #6c63ff, 0 0 30px #6c63ff',
      },
    },
  },
  plugins: [],
}