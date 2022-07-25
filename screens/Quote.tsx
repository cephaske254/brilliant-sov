import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { Fragment, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  LayoutRectangle,
  StyleSheet,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Loading from "../components/empty-states/Loading";
import NotFound from "../components/empty-states/NotFound";
import useTheme from "../hooks/useTheme";
import { MainRouteParams } from "../router";
import { useDispatch } from "../store";
import { selectQuoteByCategoryOrSearchQuery } from "../store/selectors/quotes";
import { reduxGetQuote } from "../store/thunks/quotes";
import Box from "../theme/Box";
import Text from "../theme/Text";
import { Theme } from "../theme/theme";

const defaultImage =
  "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max";

const Quote = () => {
  const { width, height } = Dimensions.get("screen");
  const { params } = useRoute<MainRouteParams<"Quote">>();

  const { goBack } = useNavigation();

  const { colors, alpha } = useTheme();
  // store & state
  const { loading, quote } = useSelector(
    selectQuoteByCategoryOrSearchQuery(params)
  );
  const dispatch = useDispatch();

  // local state
  const [{ imageErrored }, setState] = useState({ imageErrored: false });

  // Animations
  // - quote container dimensions
  const dimensions = useSharedValue<LayoutRectangle>({
    height: 0,
    width: 0,
    x: -ICON_HEIGHT,
    y: -ICON_HEIGHT,
  });

  useEffect(() => {
    if (!quote) dispatch(reduxGetQuote(params));
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: colors["primary.dark"] }}>
      <Loading loading={loading} />

      {/* if loading has stopped and there is no quote */}
      {!loading && !quote ? (
        <NotFound />
      ) : (
        <Fragment>
          {/* Animated Quote icons */}
          <QuoteIcons layout={dimensions} colors={colors} />
          <SafeAreaView
            style={{
              zIndex: 1,
              position: "absolute",
              left: 10,
            }}
          >
            <Box
              style={{
                borderRadius: 17,
                shadowColor: colors["primary.dark"],
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 5,
                backgroundColor: alpha(colors["grey.100"], 0.4),
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ borderRadius: 17, overflow: "hidden" }}
                onPress={goBack}
              >
                <BlurView intensity={11} tint="light">
                  <Box
                    height={35}
                    width={35}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <MaterialIcons
                      name="chevron-left"
                      size={25}
                      color={colors["primary.dark"]}
                    />
                  </Box>
                </BlurView>
              </TouchableOpacity>
            </Box>
          </SafeAreaView>
          <Image
            fadeDuration={300}
            source={{
              uri: imageErrored ? defaultImage : quote?.icon_url,
              width: 400,
              cache: "force-cache",
            }}
            style={{ flex: 1, width, height }}
            onError={() => setState((a) => ({ ...a, imageErrored: true }))}
          />

          {!loading && (
            <BlurView
              intensity={40}
              tint="default"
              style={[
                StyleSheet.absoluteFillObject,
                {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                },
              ]}
            >
              <BlurView
                intensity={60}
                tint="dark"
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  paddingVertical: ICON_HEIGHT,
                }}
                onLayout={({ nativeEvent: { layout } }) => {
                  dimensions.value = layout;
                }}
              >
                <Box
                  paddingVertical="l"
                  // borderColor="cardPrimaryBackground"
                  // borderWidth={1}
                  paddingHorizontal="m"
                  borderRadius="l"
                >
                  <Text
                    color="white"
                    fontSize={30}
                    lineHeight={32}
                    textAlign="center"
                  >
                    {quote?.value}
                  </Text>
                </Box>
              </BlurView>
            </BlurView>
          )}
        </Fragment>
      )}
    </View>
  );
};

const QuoteIcons = ({
  layout,
  colors,
}: {
  layout: SharedValue<LayoutRectangle>;
  colors: Theme["colors"];
}) => {
  // animate quote containers to their positions
  const topQuoteIconStyles = useAnimatedStyle(() => ({
    position: "absolute",
    top: withTiming(layout.value.y, { duration: 250 }),
    left: withSpring(layout.value.x, { velocity: 10, damping: 5 }),
    transform: [
      {
        scaleX: -1,
      },
    ],
    zIndex: 2,
  }));
  const bottomQuoteIconStyles = useAnimatedStyle(() => ({
    position: "absolute",
    bottom: withTiming(layout.value.y, { duration: 250 }),
    right: withSpring(layout.value.x, {
      velocity: 10,
      damping: 4.5,
      stiffness: 120,
    }),
    zIndex: 2,
  }));

  return (
    <Fragment>
      {["top", "bottom"].map((position) => {
        return (
          <Animated.View
            key={position}
            style={[
              position === "top" ? topQuoteIconStyles : bottomQuoteIconStyles,
              ,
              {
                height: ICON_HEIGHT,
                width: ICON_HEIGHT,
              },
            ]}
          >
            <MaterialIcons
              name="format-quote"
              color={colors["grey.200"]}
              size={ICON_HEIGHT - 10}
            />
          </Animated.View>
        );
      })}
    </Fragment>
  );
};
const ICON_HEIGHT = 60;

export default Quote;
