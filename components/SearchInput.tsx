import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TouchableNativeFeedback,
  ViewStyle
} from "react-native";
import Animated, { AnimatedStyleProp } from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import { SharedRoutesProps } from "../router";
import Box from "../theme/Box";
import { palette } from "../theme/palette";
import theme from "../theme/theme";

const SearchInput = ({
  hideIcon = false,
  onContainerLayout = null,
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
  const { navigate, getId } = useNavigation<SharedRoutesProps<"Search">>();

  const [{ loading, value }, setState] = useState({
    loading: false,
    errored: false,
    value: "",
  });

  const handleSearch = (e: any) => {
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
    <SharedElement id="search-input">
      <Box
        paddingHorizontal="m"
        flexDirection="row"
        style={{
          ...theme.textVariants.defaults,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: palette.grey[50032],
          borderRadius: 25,
          alignItems: "center",
          height: 50,
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
          placeholderTextColor={palette.white}
          style={{
            paddingVertical: 10,
            paddingLeft: 20,
            flexGrow: 1,
            fontSize: 16,
            letterSpacing: 0.6,
            flex: 1,
            color: "#f4f4f4",
          }}
        />
        {loading && !hideIcon ? (
          <ActivityIndicator size={35} />
        ) : (
          !hideIcon && (
            <Animated.View style={[iconAnimation]}>
              <TouchableNativeFeedback onPress={(e) => handleSearch(e)}>
                <Box
                  style={{
                    borderLeftColor: palette.grey[50032],
                    borderLeftWidth: StyleSheet.hairlineWidth,
                    alignItems: "center",
                    justifyContent: "center",
                    width: 35,
                  }}
                >
                  <Ionicons name="search" size={20} color={palette.grey[500]} />
                </Box>
              </TouchableNativeFeedback>
            </Animated.View>
          )
        )}
      </Box>
    </SharedElement>
  );
};

export default SearchInput;
