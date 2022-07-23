import {
    createRestyleComponent,
    createVariant,
    VariantProps
} from "@shopify/restyle";
import { ComponentProps } from "react";
import { View } from "react-native";
import { Theme } from "./theme";

const Scaffold = createRestyleComponent<
  VariantProps<Theme, "containerVariants"> & ComponentProps<typeof View>,
  Theme
>([createVariant({ themeKey: "containerVariants" })], View);

export default Scaffold;
