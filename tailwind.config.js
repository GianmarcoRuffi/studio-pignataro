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

        textPrimary: "#373737",
        textSecondary: "#000",
        textTertiary: "#6c757d;",

        backgroundPrimary: "#f7f7f7",
        backgroundLight: "#fff",
        backgroundDark: "#f3f4f605",
        backgroundGray: "#e6e9ee",
        backgroundAltGray: "#e2e8f0",
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
