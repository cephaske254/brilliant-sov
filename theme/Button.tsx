import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  composeRestyleFunctions,
  layout,
  LayoutProps,
  shadow,
  ShadowProps,
  spacing,
  SpacingProps,
  useRestyle,
  VariantProps,
} from "@shopify/restyle";
import React, { ReactElement } from "react";
import {
  LayoutChangeEvent,
  TouchableNativeFeedback,
  ViewStyle,
} from "react-native";
import Box from "./Box";
import Text from "./Text";
import { Theme } from "./theme";

type RestyleProps =
  | SpacingProps<Theme> &
      BorderProps<Theme> &
      LayoutProps<Theme> &
      ShadowProps<Theme> &
      BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  layout,
  shadow,
  backgroundColor,
] as any);

type Props = RestyleProps & {
  onPress: () => void;
  label: string | ReactElement;
  onLayout?: (e: LayoutChangeEvent) => void;
  style?: ViewStyle;
} & VariantProps<Theme, "buttonVariants">;

const Button = ({
  onLayout,
  variant,
  onPress,
  style,
  label,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <Box
        onLayout={onLayout}
        borderRadius="l"
        overflow="hidden"
        {...(props as any)}
        {...{
          style: [props.style, style],
        }}
      >
        {typeof label === "string" ? (
          <Text variant="buttonLabel">{label}</Text>
        ) : (
          label
        )}
      </Box>
    </TouchableNativeFeedback>
  );
};

export default Button;
