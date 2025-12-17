/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          bg: "#FFFFFF",
          text: "#555555",
          border: "#808080",
        },
        calendar: {
          sat: "#5858EC",
          sun: "#EC5858",
        },
        temp: {
          max: "#EC7658",
          min: "#5876EC",
        },
      },
      fontFamily: {
        sans: ['"Yu Gothic"', '"YuGothic"', '"Noto Sans JP"', "sans-serif"],
      },
      fontSize: {
        sm: "16px",
        base: "20px",
        lg: "24px",
        title: "32px",
      },
      spacing: {
        2: "8px",
        4: "16px",
        8: "32px",
        // PC用の固定高さ定義 (md以上のブレークポイントで使用)
        "row-date": "92px",
        "row-icon": "144px",
        "row-item": "92px",
      },
    },
  },
  plugins: [],
};
