/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ayoya-gold': '#C9A227',
        'ayoya-dark-gold': '#8B7355',
        'ayoya-cream': '#FDF8F0',
        'ayoya-brown': '#3D2914',
      },
    },
  },
  plugins: [],
}
