import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 고급스러운 프라이빗 톤
        ink: {
          50: "#f7f6f3",
          100: "#eeece6",
          200: "#d9d5c9",
          300: "#bab4a2",
          400: "#938c78",
          500: "#756e5d",
          600: "#5e5849",
          700: "#4a463b",
          800: "#2f2c25",
          900: "#1c1a15",
          950: "#0d0c09",
        },
        bronze: {
          50: "#faf8f3",
          100: "#f3efe3",
          200: "#e4dcc3",
          300: "#d0c199",
          400: "#b89e6e",
          500: "#a38756",
          600: "#8b7143",
          700: "#6f5a37",
          800: "#5a4930",
          900: "#4a3d29",
        },
        // 기존 gold는 어드민용으로 유지
        gold: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', '"Nanum Myeongjo"', "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "extra-wide": "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
