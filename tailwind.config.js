/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      "heading1-bold": [
        "72px",
        {
          fontWeight: "700",
        },
      ],
      "heading2-bold": [
        "55px",
        {
          fontWeight: "700",
        },
      ],
      "heading3-bolder": [
        "36px",
        {
          fontWeight: "800",
        },
      ],
      "heading3-normal": [
        "36px",
        {
          fontWeight: "400",
        },
      ],
      "heading3-bold": [
        "36px",
        {
          fontWeight: "700",
        },
      ],
      "heading4-bold": [
        "30px",
        {
          fontWeight: "700",
        },
      ],
      "body-bold": [
        "24px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "base-bold": [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "400",
        },
      ],
    },
    extend: {
      colors: {
        "primary": "#7E22CE",
        "amber": "#F8A01D",
        "blue": "#6366F1",
        "slate-gray" : "#3C3C3C",
        "secondary-500": "#FFB620",
        "logout-btn": "#FF5A5A",
        "navbar-menu": "rgba(16, 16, 18, 0.6)",
        "dark-1": "#000000",
        "dark-2": "#121417",
        "dark-3": "#101012",
        "dark-4": "#1F1F22",
        "light-1": "#FFFFFF",
        "light-2": "#EFEFEF",
        "light-3": "#7878A3",
        "light-4": "#5C5C7B",
        "gray-1": "#697C89",
        glassmorphism: "rgba(16, 16, 18, 0.60)",
      },
      boxShadow: {},
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
