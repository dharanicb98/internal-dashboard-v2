/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  
  theme: {
    extend: {
      
      keyframes: {
       
        popup: {
          "0%": {
            transform: "translateY(-100%) scale(0)",
            opacity: "0",
          },
          "80%": {
            transform: "translateY(8%) scale(1.1)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(0%) scale(1)",
          },
        },
      },
      animation: {
        popup: "popup 0.5s ease-out",
      },
    },
  },
  plugins: [],
};


