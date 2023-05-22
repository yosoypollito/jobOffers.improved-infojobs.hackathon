/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'ij-page-bg':'#F5F5F5',
        'ij-card-bg-hover':'#f3f9fb',
        'ij-container-bg':'#ffffff',
        'ij-containter-border':'#E6E6E6',
      }
    },
  },
  plugins: [],
}
