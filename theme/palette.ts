import alpha from "color-alpha/index";

const grey = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

const palette = {
  primaryLight: "#262a3d",
  primaryMain: "#211834",
  primaryDark: "#0a0c10",

  secondaryDark: "#733898",
  secondaryMain: "#bf5efe",
  secondaryLight: "#d99efe",

  black: "#0B0B0B",
  white: "#d9dade",
  grey,
};

const colors = {
  mainBackground: palette.primaryDark,
  cardPrimaryBackground: palette.primaryMain,
  primary: palette.primaryMain,

  white: palette.white,
};
type Colors = keyof typeof colors;

export { palette, colors, Colors };

