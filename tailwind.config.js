/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#373737",
        secondary: "#2d3748",
        accent: "#4a5568",

        backgroundLight: "#fff",
        backgroundDark: "#f3f4f605",
        backgroundGray: "#f3f4f6",

        textLight: "#f5f5f5",
        textDark: "#1a202c",

        borderLight: "#e2e8f0",
        borderDark: "#4a5568",

        linkColor: "#3182ce",
        linkHoverColor: "#2b6cb0",
        linkHoverAltColor: "#000000",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
