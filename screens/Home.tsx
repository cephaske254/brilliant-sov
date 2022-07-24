import { useNavigation } from "@react-navigation/native";
import { capitalCase } from "change-case";
import { Dimensions, TouchableNativeFeedback } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import AppHeader from "../components/AppHeader";
import useTheme from "../hooks/useTheme";
import { SharedNavigationProps } from "../router";
import { selectCategories } from "../store/selectors/categories";
import Box from "../theme/Box";
import Card from "../theme/Card";
import Text from "../theme/Text";

const Home = () => {
  const { categories } = useSelector(selectCategories);
  // theme
  const { borderRadii, spacing, colors } = useTheme();
  const cardSpacing: keyof typeof borderRadii = "s";
  // navigation
  const { navigate } = useNavigation<SharedNavigationProps<"Home">>();

  const { width } = Dimensions.get("window");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "transparent" }}>
      <AppHeader
        safeAreaStyle={{
          borderBottomEndRadius: 0,
          borderBottomStartRadius: 0,
          backgroundColor: "transparent",
        }}
        title="Categories"
      >
        <Box
          flexDirection="row"
          flexWrap="wrap"
          width="100%"
          paddingLeft={"m"}
          backgroundColor="paper"
          borderTopEndRadius="l"
          borderTopStartRadius="l"
          paddingTop="l"
        >
          {categories.map((category, index) => {
            const isEven = (index + 0) % 2 === 0;
            return (
              <Box
                key={category}
                style={{
                  ...(isEven && { paddingRight: spacing[cardSpacing] }),
                  ...(!isEven && { paddingLeft: spacing[cardSpacing] }),
                }}
                width={width / 2 - spacing[cardSpacing] * 2}
                paddingBottom="m"
              >
                <TouchableNativeFeedback
                  onPress={() =>
                    navigate("Quote", {
                      category,
                    })
                  }
                >
                  <Card
                    variant="rounded"
                    paddingTop="xl"
                    paddingBottom="xl"
                    style={{
                      backgroundColor: colors["white"],
                      shadowColor: colors["secondary.main"],
                      shadowOffset: { height: 2, width: 2 },
                      shadowOpacity: 0.12,
                      shadowRadius: 6,
                    }}
                  >
                    <Text
                      color="primary.dark"
                      fontSize={17}
                      letterSpacing={-0.6}
                      fontFamily="Poppins-Medium"
                    >
                      {capitalCase(category)}
                    </Text>
                  </Card>
                </TouchableNativeFeedback>
              </Box>
            );
          })}
        </Box>
      </AppHeader>
    </ScrollView>
  );
};

export default Home;
