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
        textTertiary: "#6c757d",

        backgroundPrimary: "#f7f7f7",
        backgroundLight: "#fff",
        backgroundDark: "#f3f4f605",
        backgroundGray: "#e6e9ee",
        backgroundLightGray: "#F3F4F6",
        backgroundAltGray: "#e2e8f0",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-page": "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      },
      maxWidth: {
        container: "1200px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        shimmer: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};
