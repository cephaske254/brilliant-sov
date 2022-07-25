import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import colorAlpha from "color-alpha";
import { RefObject, useState } from "react";
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
  ViewStyle,
} from "react-native";
import Animated, { AnimatedStyleProp } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { MainRouteParams, SharedNavigationProps } from "../router";
import { useDispatch } from "../store";
import { selectSearchResults } from "../store/selectors/search";
import { reduxSearchQuotes } from "../store/thunks/quotes";
import Box from "../theme/Box";
import { palette } from "../theme/palette";
import theme from "../theme/theme";

const SearchInput = ({
  hideIcon = false,
  onContainerLayout,
  onBlur,
  onFocus,
  iconAnimation,
  searchInputRef,
}: {
  hideIcon?: boolean;
  onContainerLayout?: (a: LayoutChangeEvent) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  iconAnimation?: AnimatedStyleProp<ViewStyle>;
  searchInputRef?: RefObject<TextInput> | undefined;
}) => {
  const { navigate } = useNavigation<SharedNavigationProps<"Search">>();
  const { name } = useRoute<MainRouteParams<"Search">>();
  const dispatch = useDispatch();

  const { loading, query } = useSelector(selectSearchResults);
  const [{ value }, setState] = useState({ value: query });

  const handleSearch = (
    _:
      | NativeSyntheticEvent<TextInputSubmitEditingEventData>
      | GestureResponderEvent
  ) => {
    if (!value || value?.trim() === query?.trim()) goToSearch();
    else
      dispatch(reduxSearchQuotes(value)).then(() => {
        goToSearch();
      });
  };

  const goToSearch = () => {
    if (name !== "Search") navigate("Search");
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
        ref={searchInputRef}
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
