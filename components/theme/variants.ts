import { FlexStyle, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { Colors } from "./palette";

const variants: Record<
  "cardVariants" | "containerVariants",
  Record<
    string,
    (ViewStyle | TextStyle | ImageStyle | FlexStyle) & {
      backgroundColor: Colors;
    }
  >
> = {
  cardVariants: {},
  containerVariants: {
    defaults: {
      flex: 1,
      backgroundColor: "mainBackground",
    },
  },
};
export default variants;
