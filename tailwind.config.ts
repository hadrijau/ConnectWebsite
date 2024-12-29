import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textUnderlineOffset: {
        24: "24px",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1440px" },
      // => @media (max-width: 1279px) { ... }

      "2lg": { max: "1300px" },

      lg: { max: "1140px" },
      // => @media (max-width: 1023px) { ... }

      "3md": { max: "1023px" },

      "2md": { max: "900px" },
      // => @media (max-width: 900Px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "600px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "500px" },

      "2xs": { max: "430px" },
    },
  },
  plugins: [],
};
export default config;
