/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adicione o caminho para os arquivos que usam Tailwind
    './public/index.html', // Se você usa Tailwind no HTML
  ],
  theme: {
    extend: {
      colors: {
        roxo_escuro: '#738aff',
        roxo_medio: '#738aff',
        roxo_claro: '#ced6ff',
        verde_escuro: '#00bf63',
        verde_medio: '#11c36d',
        verde_claro: '#7cccc1',
        verde_limao: '#d8ffa7',
      },
      fontFamily: {
        sans: ['Fira Sans', 'sans-serif'],
        baloo: ['Baloo 2', 'sans-serif'],
      },
    },
  },
  plugins: [],
};