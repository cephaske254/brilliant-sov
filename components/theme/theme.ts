import { createTheme } from "@shopify/restyle";
import variants from "./variants";
const palette = {
  primaryLight: "",
  primaryMain: "#2c1765",
  primaryDark: "",

  black: "#0B0B0B",
  white: "#F0F2F3",
};


const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.primaryMain,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  ...variants,
});

export type Theme = typeof theme;
export default theme;
