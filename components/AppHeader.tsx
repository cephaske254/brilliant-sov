import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { ComponentProps, useMemo, useRef } from "react";
import { SafeAreaView, TextStyle, ViewStyle } from "react-native";

import {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import Box from "../theme/Box";
import Button from "../theme/Button";
import { palette } from "../theme/palette";
import Text from "../theme/Text";
import { Theme } from "../theme/theme";
import SearchInput from "./SearchInput";

const AppHeader = ({
  title,
  titleStyle = {},
  statusBarProps = {},
  containerStyles = {},
}: {
  title?: string;
  titleStyle?: TextStyle;
  statusBarProps?: ComponentProps<typeof StatusBar>;
  containerStyles?: ViewStyle;
}) => {
  //theme
  const { colors } = useTheme<Theme>();

  const layout = useRef<
    Record<"container" | "back", { width: number; height: number }>
  >({
    container: {
      width: 0,
      height: 0,
    },
    back: {
      height: 0,
      width: 0,
    },
  });

  // animation
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const { name } = useRoute();
  const { goBack, canGoBack } = useNavigation();
  const isHome = name === "Home";

  const toggle = (open: boolean) => {
    const duration = open ? 150 : 100;
    if (open)
      offset.value = withTiming(layout.current.container.width, {
        duration,
      });
    else offset.value = withTiming(0, { duration });
  };

  const Title = useMemo(() => {
    return (
      title && (
        <Text
          variant="h3"
          color="white"
          style={{
            letterSpacing: 1,
            ...titleStyle,
            fontSize: 20,
          }}
        >
          {title}
        </Text>
      )
    );
  }, [title, titleStyle]);

  return (
    <SafeAreaView>
      <Box
        paddingHorizontal={"l"}
        paddingBottom="xl"
        style={{
          borderBottomEndRadius: 22,
          borderBottomStartRadius: 22,
          display: "flex",
          flexDirection: "column",
          paddingTop: 25,
          ...containerStyles,
        }}
      >
        {/* Change the status bar foreground color */}
        <StatusBar style="light" animated {...statusBarProps} />

        {!isHome && (
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="l"
          >
            <Button
              onPress={() => goBack()}
              borderColor="primary"
              borderWidth={1}
              padding="xs"
              borderRadius="s"
              width={BACK_BUTTON_SIZE}
              height={BACK_BUTTON_SIZE}
              alignItems="center"
              justifyContent="center"
              onLayout={({
                nativeEvent: {
                  layout: { height, width },
                },
              }) => {
                layout.current.back.height = height;
                layout.current.back.width = width;
              }}
              label={
                <Box flexDirection="row" alignItems="center">
                  <Ionicons name="chevron-back" color={palette.grey[400]} />
                </Box>
              }
            />
            {Title}
            <Box width={BACK_BUTTON_SIZE} />
          </Box>
        )}
        <SearchInput
          onFocus={() => toggle(true)}
          onBlur={() => toggle(false)}
          onContainerLayout={(e) => {
            layout.current.container.width = e.nativeEvent.layout.width;
            layout.current.container.height = e.nativeEvent.layout.height;
          }}
          iconAnimation={animatedStyles}
        />
      </Box>
    </SafeAreaView>
  );
};

const BACK_BUTTON_SIZE = 30;

export default AppHeader;
