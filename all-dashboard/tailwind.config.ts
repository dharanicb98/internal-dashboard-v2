import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import Colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-property":
          "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(<path-to-image>), lightgray 50% / cover no-repeat, url(<path-to-image>), lightgray 50% / cover no-repeat, url(<path-to-image>), lightgray 50% / cover no-repeat, linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), lightgray 50% / cover no-repeat",
      },
      boxShadow: {
        "4xl": "0px 0px 30px 0px rgba(0, 0, 0, 0.20)",
        "3xl": "0px 4px 20px 0px rgba(0, 0, 0, 0.15)",
        // "2xl":"0px 4px 15px 0px rgba(0, 0, 0, 0.25)",
        // xl:"0px 4px 15px 0px rgba(0, 0, 0, 0.15)",
        base: "0px 0px 10px 0px rgba(0, 0, 0, 0.10)",
      },
    },
    colors: {
      primary: {
        DEFAULT: "#CD264F",
      },
      green: {
        DEFAULT: "#2BA017",
        200: "#049801",
      },
      grey: {
        100: "rgba(217, 217, 217, 0.50)",
        200: "#FAFAFA",
        300: "#F8F8F8",
        400: "#B6B6B6",
        500: "#9A9A9A",
        600: "#5A5252",
        700: "#00000099",
        900: "#000000e6",
        950: "#ECECEC",
        light: "#6B6B6B",
        DEFAULT: "#D9D9D9",
        dark: "#5C5C5C",
      },
      black: Colors.black,
      // warning: {
      //   DEFAULT: "#FFF8F2",
      // },
      white: Colors.white,
      smoke: {
        DEFAULT: "#F4F4F4",
      },
      blue: {
        light: "#E2F5FB",
        dark: "#0B2238",
      },
      yellow: {
        light: "#FFFCE4",
      },
      orange: {
        light: "#FFF8F2",
        DEFAULT: "#FFF1E5",
      },
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "1xl": "22px",
      "2xl": "24px",
      "3xl": "32px",
      "6xl": "60px",
    },
    screens: {
      "2xl": { max: "1535px" },
      "1xl": { max: "1370px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      "md-1": { max: "905px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      xs: { max: "425px" },
      xxs: { max: "0px" },

      // Min widths
      "2xl-m": { min: "1535px" },
      "xl-m": { min: "1279px" },
      "lg-m": { min: "1023px" },
      "md-m-1":{min:"905px"},
      "md-m": { min: "768px" },
      "sm-m": { min: "640px" },
      "xs-m": { min: "425px" },
      "tb-m": { min: "900px" },

      "sm-b": { min: "640px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      "md-b": { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      "lg-b": { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      "xl-b": { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl-b": { min: "1536px" },
      // => @media (min-width: 1536px
    },
    backgroundSize: {
      'cover': 'cover',
      radio: "2em 2em",
    },
    keyframes: {
      fadeIn: {
        "0%": { 'opacity': 0},
        "100%": { "opacity": 1 },
      },
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      }
    },
    animation: {
      'fade-in': 'fadeIn 1.5s ease-out',
       spin: 'spin 1s linear infinite',
    }
    
  },

  plugins: [
    require("flowbite/plugin"),
    require("daisyui"),
    plugin(function ({ addVariant }) {
      addVariant("child", "& > *");
    }),
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#CD264F",
        },
      },
    ],
    prefix: "dui-", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  },
};
export default config;
