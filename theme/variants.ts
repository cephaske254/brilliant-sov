import { FlexStyle, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { Colors } from "./palette";

export type FontNames = {
  "Poppins-Medium": true;
  "Poppins-Regular": true;
};

const buildVariant = <VariantNames extends string>(
  properties: Record<VariantNames, Styles>
) => properties;

const variants = {
  // card variants
  cardVariants: buildVariant<"rounded">({
    rounded: {
      borderRadius: "m",
      backgroundColor: "cardPrimaryBackground",
      paddingVertical: "l",
      paddingHorizontal: "m",
    },
  }),

  // container variants
  containerVariants: buildVariant<"defaults">({
    defaults: {
      flex: 1,
      backgroundColor: "mainBackground",
    },
  }),

  // text variants
  textVariants: buildVariant<
    "h1" | "h2" | "h3" | "buttonLabel" | "defaults" | "title1" | "body2"
  >({
    defaults: {
      fontSize: 20,
      lineHeight: 20,
      fontFamily: "Poppins-Regular",
    },
    h1: {
      fontSize: 65,
      lineHeight: 72,
      fontFamily: "Poppins-Medium",
    },
    h2: {
      fontSize: 50,
      lineHeight: 56,
      fontFamily: "Poppins-Medium",
    },
    h3: {
      fontSize: 40,
      lineHeight: 45,
      fontFamily: "Poppins-Medium",
    },
    title1: {
      fontSize: 32,
      lineHeight: 35,
      fontFamily: "Poppins-Medium",
    },
    body2: {
      fontSize: 18,
      lineHeight: 20,
      fontFamily: "Poppins-Regular",
    },
    buttonLabel: {
      fontSize: 16,
      lineHeight: 16,
      letterSpacing: 1,
      fontFamily: "Poppins-Medium",
    },
  }),

  // button variants
  buttonVariants: buildVariant<"text">({
    text: {},
  }),
};

type Styles = (ViewStyle | TextStyle | ImageStyle | FlexStyle) &
  Partial<{
    fontFamily: keyof FontNames;
    borderRadius: string;
    backgroundColor: Colors;
  }>;

export default variants as typeof variants;
