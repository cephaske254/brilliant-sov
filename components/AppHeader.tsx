import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextProps } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { ComponentProps, ReactElement, useMemo, useRef } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";
import Box from "../theme/Box";
import Button from "../theme/Button";
import { colors, palette } from "../theme/palette";
import Text from "../theme/Text";
import { Theme } from "../theme/theme";
import SearchInput from "./SearchInput";

const AppHeader = ({
  title,
  titleStyle = {},
  statusBarProps = {},
  containerStyles = {},
  safeAreaStyle = {},
  gradientProps = {},
  children,
}: {
  title?: string;
  titleStyle?: TextStyle;
  statusBarProps?: ComponentProps<typeof StatusBar>;
  containerStyles?: ViewStyle;
  safeAreaStyle?: ViewStyle;
  children?: ReactElement;
  gradientProps?: Partial<ComponentProps<typeof LinearGradient>>;
}) => {
  //theme

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

  const { name } = useRoute();
  const { goBack } = useNavigation();
  const isHome = name === "Home";



  const Title = useMemo(() => {
    return ({ style, ...props }: TextProps<Theme> & { style?: TextStyle }) => {
      if (!title) return null;
      return (
        <Text
          variant="h3"
          color="white"
          style={{
            letterSpacing: 1,
            fontSize: 20,
            ...style,
          }}
          {...props}
        >
          {title}
        </Text>
      );
    };
  }, [title, titleStyle]);

  return (
    <LinearGradient
      colors={[colors["primary.main"], colors["primary.light"]]}
      locations={[0.5, 1]}
      start={{ x: 0, y: 0.65 }}
      end={{ x: 1, y: 0.45 }}
      {...gradientProps}
    >
      <SafeAreaView
        edges={["top"]}
        style={{
          // backgroundColor: palette.primaryMain,
          borderBottomEndRadius: 22,
          borderBottomStartRadius: 22,
          ...safeAreaStyle,
        }}
      >
        <Box
          paddingHorizontal={"l"}
          paddingBottom="xl"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: 25,
            ...containerStyles,
          }}
        >
          {/* Change the status bar foreground color */}
          <StatusBar
            style="light"
            {...statusBarProps}
            backgroundColor={palette.primaryMain}
          />
          {!isHome && (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                onPress={() => goBack()}
                borderColor="transparent"
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
                    <Ionicons
                      name="chevron-back"
                      color={palette.grey["400"]}
                      size={BACK_BUTTON_SIZE / 2}
                    />
                  </Box>
                }
              />
              {!isHome && <Title />}
              <Box width={BACK_BUTTON_SIZE} />
            </Box>
          )}
          <SearchInput
            onContainerLayout={(e) => {
              layout.current.container.width = e.nativeEvent.layout.width;
              layout.current.container.height = e.nativeEvent.layout.height;
            }}
          />

          {isHome && <Title style={{ fontSize: 30, marginTop: 10 }} />}
        </Box>
      </SafeAreaView>
      {children}
    </LinearGradient>
  );
};

const BACK_BUTTON_SIZE = 40;

export default AppHeader;
