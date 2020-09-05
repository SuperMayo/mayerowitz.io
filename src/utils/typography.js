import Typography from "typography"
import gray from "gray-percentage"

const typography = new Typography({
  baseFontSize: "17px",
  baseLineHeight: 1.5,
  scaleRatio: 2.5,
  headerFontFamily: ["Work Sans", "Helvetica", "Arial", "sans-serif"],
  bodyFontFamily: ["Karla", "Helvetica Neue", "sans-serif"],
  googleFonts: [
    {
      name: "Karla",
      styles: ["400"],
    },
    {
      name: "Work Sans",
      styles: ["500", "700"],
    },
  ],
  headerWeight: 500,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ scale, rhythm }) => ({
    body: {
      textRendering: "optimizeLegibility",
    },
    ".menuItem": {
      color: "black",
    },
    ".menuItem.active": {
      color: "teal",
    },
    a: {
      color: "teal",
      textDecoration: "none",
      transition: "opacity 0.2s ease-in-out",
    },
    "a:hover,a:active": {
      color: "teal",
      opacity: 0.85,
      transition: "opacity 0.2s ease-in",
    },
    li: {
      listStyleType: "none",
      marginLeft: rhythm(1),
    },
    samp: {
      fontFamily: "'Courier New', Courier, monospace",
    },
    "h3,h4": {
      color: "rgba(0, 20, 20, 0.7)",
    },
    blockquote: {
      color: gray(20),
      backgroundColor: gray(98),
      paddingLeft: rhythm(11 / 16),
      marginLeft: 0,
      borderLeft: `${rhythm(5 / 16)} solid ${gray(80)}`,
    },
    "p + p": {
      marginTop: `${rhythm(1)}`,
    },
  }),
})

const rhythm = typography.rhythm

export default typography

export { rhythm }
