/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FFFFFF",
          secondary: "#474747",
          accent: "#2C5364",
          neutral: "#0F2027",
          "base-100": "#203A43",
          info: "#06b6d4",
          success: "#84cc16",
          warning: "#eab308",
          error: "#991b1b",
        },
      },
    ],
  },
};
