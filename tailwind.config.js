/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jaini: ["Jaini", "cursive"],
        nunito: ["Nunito Sans", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      keyframes: {
        swing: {
          "0%, 100%": { transform: "rotate(-15deg)" },
          "50%": { transform: "rotate(15deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        swing: "swing 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "swing-float":
          "swing 2s ease-in-out infinite, float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
