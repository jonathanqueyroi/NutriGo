module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          primary: "#40916C",
          secondary: "#74C69D",
          accent: "#1B4332",
          dark: "#212529",
          light: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
