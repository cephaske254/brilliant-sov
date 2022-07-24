import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import colorAlpha from "color-alpha";
import { useState } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
  TouchableNativeFeedback,
  ViewStyle
} from "react-native";
import Animated, { AnimatedStyleProp } from "react-native-reanimated";
import { SharedNavigationProps } from "../router";
import Box from "../theme/Box";
import { palette } from "../theme/palette";
import theme from "../theme/theme";

const SearchInput = ({
  hideIcon = false,
  onContainerLayout,
  onBlur,
  onFocus,
  iconAnimation,
}: {
  hideIcon?: boolean;
  onContainerLayout?: (a: LayoutChangeEvent) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  iconAnimation?: AnimatedStyleProp<ViewStyle>;
}) => {
  const { navigate, getId } = useNavigation<SharedNavigationProps<"Search">>();

  const [{ loading, value }, setState] = useState({
    loading: false,
    errored: false,
    value: "",
  });

  const handleSearch = (
    _:
      | NativeSyntheticEvent<TextInputSubmitEditingEventData>
      | GestureResponderEvent
  ) => {
    setState((state) => ({ ...state, loading: true, errored: false }));

    const promise = new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    promise
      .then(() => {
        setState((state) => ({ ...state, loading: false, errored: false }));
      })
      .catch(() => {
        setState((state) => ({ ...state, loading: false, errored: true }));
      })
      .finally(() => {
        if (getId() !== "Search") navigate("Search");
      });
  };

  return (
    <Box
      paddingHorizontal="m"
      flexDirection="row"
      style={{
        ...theme.textVariants.defaults,
        borderColor: colorAlpha(palette.primaryMain, 0.07),
        borderWidth: 2,
        backgroundColor: palette.primaryLight,
        shadowColor: palette.primaryDark,
        shadowOffset: { height: 12, width: 4 },
        shadowOpacity: 0.1,
        borderRadius: 6,
        alignItems: "center",
        height: SEARCH_BUTTON_SIZE,
        flexGrow: 1,
      }}
      onLayout={onContainerLayout}
    >
      <TextInput
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChangeText={(value) => setState((b) => ({ ...b, value }))}
        onSubmitEditing={(e) => handleSearch(e)}
        placeholder="Search..."
        allowFontScaling
        placeholderTextColor={palette.paper}
        style={{
          paddingVertical: 10,
          paddingLeft: 20,
          flexGrow: 1,
          fontSize: 16,
          letterSpacing: 0.6,
          flex: 1,
          color: palette.white,
          overflow: "hidden",
        }}
      />
      {loading && !hideIcon ? (
        <ActivityIndicator
          size={Platform.OS === "android" ? 25 : 35}
          color={palette.grey["500"]}
        />
      ) : (
        !hideIcon && (
          <Animated.View style={[iconAnimation]}>
            <TouchableNativeFeedback onPress={(e) => handleSearch(e)}>
              <Box
                style={{
                  borderLeftColor: palette.grey["500_32"],
                  borderLeftWidth: StyleSheet.hairlineWidth,
                  alignItems: "center",
                  justifyContent: "center",
                  width: SEARCH_BUTTON_SIZE,
                  height: SEARCH_BUTTON_SIZE,
                  borderRadius: 9,
                }}
              >
                <Ionicons name="search" size={20} color={palette.white} />
              </Box>
            </TouchableNativeFeedback>
          </Animated.View>
        )
      )}
    </Box>
  );
};

const SEARCH_BUTTON_SIZE = 50;
export default SearchInput;
