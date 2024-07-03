/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "850px",
      // => @media (min-width: 768px) { ... }

      slg: "950px",

      lg: "1050px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "site-blue": "#415161",
        "site-orange": "#ff5151",
        "site-orange-hover": "#ff5151",
        "navlink-hover": "#999",
      },
      backgroundImage: {
        "deal-bg": "url('/images/home/deal/bg-img.jpg')",
      },
      fontFamily: {
        poppins: '["Poppins", sans-serif]',
      },
    },
  },
  plugins: [],
};
