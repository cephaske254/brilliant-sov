import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  composeRestyleFunctions,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  useRestyle
} from "@shopify/restyle";
import { LayoutChangeEvent, TouchableOpacity } from "react-native";

import { ReactElement } from "react";
import Box from "./Box";
import Text from "./Text";
import { Theme } from "./theme";

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  layout,
  backgroundColor,
] as any);

type Props = RestyleProps & {
  onPress: () => void;
  label: string | ReactElement;
  onLayout?: (e: LayoutChangeEvent) => void;
};

const Button = ({ onLayout, onPress, label, ...rest }: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <TouchableOpacity onPress={onPress}>
      <Box onLayout={onLayout} {...(props as any)}>
        {typeof label === "string" ? (
          <Text variant="buttonLabel">{label}</Text>
        ) : (
          label
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default Button;
