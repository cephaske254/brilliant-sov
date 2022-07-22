import {
    createRestyleComponent,
    createVariant,
    VariantProps
} from "@shopify/restyle";
import { ComponentProps } from "react";
import Box from "./Box";
import { Theme } from "./theme";

const Card = createRestyleComponent<
  VariantProps<Theme, "cardVariants"> & ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: "cardVariants",defaults:{
    
} })], Box);

export default Card;
