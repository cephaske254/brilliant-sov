import { FlexStyle, ImageStyle, TextStyle, ViewStyle } from "react-native";

const buildVariant = <VariantNames extends string>(
  properties: Record<VariantNames, Styles>
) => properties;

const variants = {
  // card variants
  cardVariants: buildVariant({}),

  // container variants
  containerVariants: buildVariant<"defaults">({
    defaults: {
      flex: 1,
      backgroundColor: "mainBackground",
    },
  }),

  // text variants
  textVariants: buildVariant<"h1" | "h2">({
    h1: {
      fontSize: 65,
      lineHeight: 72,
      fontWeight: "700",
    },
    h2: {
      fontSize: 65,
      lineHeight: 72,
      fontWeight: "700",
    },
  }),
};

// Record<
//   "cardVariants" | "containerVariants" | "textVariants",
//   Record<
//     string,
//     (ViewStyle | TextStyle | ImageStyle | FlexStyle) &
//       Partial<Record<"backgroundColor", Colors>>
//   >
// >
type Styles = ViewStyle | TextStyle | ImageStyle | FlexStyle;

export default variants as typeof variants;
