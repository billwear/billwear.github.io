/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,md,mdx,js,ts}"],
  theme: {
    extend: {
      colors: {
        cream:  "#EADFCC",
        mocha:  "#5B4636",
        amber:  "#D4A373",
        gold:   "#F2B750",
        sienna: "#A1552E"
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ["Source Sans 3", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
