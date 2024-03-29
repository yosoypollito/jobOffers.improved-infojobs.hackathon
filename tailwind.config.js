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
        'primary':'#167DB7',
        'primary-l4':'#E8F2F8',
        'primary-l5':'#f3f9fb',
        'gray-l3':'#e6e6e6',
        'gray-l2':'#cccccc',
        'gray-l1':'#b8b8b8',
        'gray':'#999999',
        'success':'#00a550',
        'success-l4':'#e6f6ee',
        'accent':'#ff6340',
        'accent-l4':'#fcedeb',
        'alert':'#f1c40f',
        'alert-l4':'#fef9e7',
        'ij-page-bg':'#F5F5F5',
        'ij-card-bg-hover':'#f3f9fb',
        'ij-container-bg':'#ffffff',
        'ij-container-border':'#E6E6E6',
      },
      boxShadow:{
        'focus':'0 0 3px rgba(0,0,0,.20)',
      },
      screens:{
        'lg':'1100px'
      }
    },
  },
  plugins: [],
}
