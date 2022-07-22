const palette = {
  primaryLight: "",
  primaryMain: "#2c1765",
  primaryDark: "",

  black: "#0B0B0B",
  white: "#F0F2F3",
};

const colors = {
  mainBackground: palette.white,
  cardPrimaryBackground: palette.primaryMain,
};
type Colors = keyof typeof colors;

export { palette, colors, Colors };

