/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        colors: {
          'beige': '#fff9f0',
        },
        spacing: {
          "0": "0px",
          "quarter": "0.375rem",
          "half": "0.75rem",
          "one": "1.5rem",
          "two": "3rem",
          "three": "4.5rem",
          "four": "6rem",
          "five": "7.5rem",
          "six": "9rem",
          "eight": "12rem",
          "twelve": "18rem",
          "sixteen": "24rem"
        }
      },
      fontFamily: {
        sans: ["'Source Sans 3'", 'sans-serif'],
        mono: ["Anonymous Pro", "monospace"],
        serif: ["Source Serif Pro", "Arial", "serif"],
      },
      fontSize: {
        "4xl": [
          "3.815rem",
          "4.5rem"
        ],
        "3xl": [
          "3.052rem",
          "4.5rem"
        ],
        "2xl": [
          "2.441rem",
          "3rem"
        ],
        "xl": [
          "1.953rem",
          "3rem"
        ],
        "lg": [
          "1.563rem",
          "3rem"
        ],
        "md": [
          "1.25rem",
          "2rem"
        ],
        "base": [
          "1rem",
          "1.5rem"
        ],
        "sm": [
          "0.8rem",
          "1.5rem"
        ],
        "xs": [
          "0.64rem",
          "1.5rem"
        ]
      },
    },
    plugins: []
  };