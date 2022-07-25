import { useCallback, useEffect } from "react";
import { ActivityIndicator, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { palette } from "../../theme/palette";

const Loading = ({
  loading,
  styles,
}: {
  loading: boolean;
  styles?: ViewStyle;
}) => {
  const opacity = useSharedValue(loading ? 1 : 0);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    zIndex: opacity.value === 0 ? -1 : 1,
  }));

  // set fade in or fadeout
  const watchLoadingStatus = useCallback(() => {
    if (loading) opacity.value = withTiming(1, { duration: 200 });
    else opacity.value = withTiming(0, { duration: 500 });
  }, [loading]);

  useEffect(() => {
    watchLoadingStatus();
  }, [watchLoadingStatus]);

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          backgroundColor: palette.primaryDark,
        },
        animatedStyles,
        styles,
      ]}
    >
      <ActivityIndicator color={palette.white} />
    </Animated.View>
  );
};

export default Loading;
