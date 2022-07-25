import alpha from "color-alpha";

const grey = {
  "": "#FFFFFF",
  "100": "#F9FAFB",
  "200": "#F4F6F8",
  "300": "#DFE3E8",
  "400": "#C4CDD5",
  "500": "#919EAB",
  "600": "#637381",
  "700": "#454F5B",
  "800": "#212B36",
  "900": "#161C24",
  "500_8": alpha("#919EAB", 0.08),
  "500_12": alpha("#919EAB", 0.12),
  "500_16": alpha("#919EAB", 0.16),
  "500_24": alpha("#919EAB", 0.24),
  "500_32": alpha("#919EAB", 0.32),
  "500_48": alpha("#919EAB", 0.48),
  "500_56": alpha("#919EAB", 0.56),
  "500_80": alpha("#919EAB", 0.8),
};

const palette = {
  // 312C40
  primaryLighter: "#A98BE5",
  primaryLight: "#9D6DFF",
  primaryMain: "#7A3DFC",
  primaryDark: "#181920",

  secondaryDark: "#6A6BB8",
  secondaryMain: "#2469FD",
  secondaryLight: "#BF5EFF",

  black: "#0B0B0B",
  white: "#F3F6FA",
  paper: "#E8E8E8",
  grey,
};

const colors = {
  mainBackground: palette.primaryDark,
  cardPrimaryBackground: palette.primaryLight,
  transparent: "transparent",

  // primary
  "primary.main": palette.primaryMain,
  "primary.light": palette.primaryLight,
  "primary.dark": palette.primaryDark,

  // secondary
  "secondary.main": palette.secondaryMain,
  "secondary.light": palette.secondaryLight,
  "secondary.dark": palette.secondaryDark,

  white: palette.white,
  paper: palette.paper,

  // map all the grey values
  ...Object.entries(grey).reduce((a, [key, value]) => {
    a[`grey.${key}` as keyof GreyMapping] = value;
    return a;
  }, {} as GreyMapping),
};

type GreyMapping = Record<
  | "grey.0"
  | "grey.100"
  | "grey.200"
  | "grey.300"
  | "grey.400"
  | "grey.500"
  | "grey.600"
  | "grey.700"
  | "grey.800"
  | "grey.900"
  | "grey.5008"
  | "grey.50012"
  | "grey.50016"
  | "grey.50024"
  | "grey.50032"
  | "grey.50048"
  | "grey.50056"
  | "grey.50080",
  string
>;
type Colors = keyof typeof colors;

export { palette, colors, Colors };
