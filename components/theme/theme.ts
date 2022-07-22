import { createTheme } from "@shopify/restyle";
import { colors } from "./palette";
import variants from "./variants";

const theme = createTheme({
  colors,
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
