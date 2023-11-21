/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Ubuntu", "sans-serif"],
    },
    spacing: {
      0.2: "2px",
      0.4: "4px",
      0.8: "8px",
      1.2: "12px",
      1.6: "16px",
      2.4: "24px",
      3.2: "32px",
      4.8: "48px",
      6.4: "64px",
      8: "80px",
      9.6: "96px",
      12.8: "128px",
    },
    fontSize: {
      1: "10px",
      1.2: "12px",
      1.4: "14px",
      1.6: "16px",
      1.8: "18px",
      2: "20px",
      2.4: "24px",
      3: "30px",
      3.6: "36px",
      4.4: "44px",
      5.2: "52px",
      6.2: "62px",
      7.4: "74px",
      8.6: "86px",
      9.8: "98px",
    },
    colors: {
      marineBlue: "hsl(213, 96%, 18%)",
      purplishBlue: "hsl(243, 100%, 62%)",
      pastelBlue: "hsl(228, 100%, 84%)",
      lightBlue: "hsl(206, 94%, 87%)",
      strawberryRed: "hsl(354, 84%, 57%)",
      coolGray: "hsl(231, 11%, 63%)",
      lightGray: "hsl(229, 24%, 87%)",
      magnolia: "hsl(217, 100%, 97%)",
      alabaster: "hsl(231, 100%, 99%)",
      white: "hsl(0, 0%, 100%)",
    },
  },
  plugins: [],
}
