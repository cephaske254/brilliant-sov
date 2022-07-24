import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRoute } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { Fragment, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  LayoutRectangle,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import Loading from "../components/empty-states/Loading";
import NotFound from "../components/empty-states/NotFound";
import { MainRouteParams } from "../router";
import { useDispatch } from "../store";
import { selectQuoteByCategory } from "../store/selectors/quotes";
import { reduxGetQuote } from "../store/thunks/quotes";
import Box from "../theme/Box";
import { palette } from "../theme/palette";
import Text from "../theme/Text";

const defaultImage =
  "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max";

const Quote = () => {
  const { width, height } = Dimensions.get("screen");
  const { params } = useRoute<MainRouteParams<"Quote">>();
  // store & state
  const { loading, quote } = useSelector(selectQuoteByCategory(params));
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
    <View style={{ flex: 1, backgroundColor: palette.primaryDark }}>
      <Loading loading={loading} />

      {/* if loading has stopped and there is no quote */}
      {!loading && !quote ? (
        <NotFound />
      ) : (
        <Fragment>
          {/* Animated Quote icons */}
          <QuoteIcons layout={dimensions} />
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

const QuoteIcons = ({ layout }: { layout: SharedValue<LayoutRectangle> }) => {
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
              color={palette.grey["200"]}
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
