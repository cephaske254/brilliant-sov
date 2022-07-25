import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import assets from "../../assets";
import Box from "../../theme/Box";
import Button from "../../theme/Button";
import { colors } from "../../theme/palette";
import Text from "../../theme/Text";

const ResultNotFound = ({ onRetry }: { onRetry: () => any }) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Image source={assets["not-found-image"]} />

      <Box
        width="100%"
        paddingHorizontal="xl"
        marginTop="l"
        alignItems="center"
      >
        <Text variant="title1" color="paper" textAlign="center">
          Result Not Found
        </Text>
        <Text variant="body2" color="grey.300" textAlign="center" marginTop="m">
          Please try again with other keywords or maybe use generic term
        </Text>

        <Button
          onPress={() => onRetry()}
          shadowColor="secondary.light"
          shadowOffset={{ height: 0, width: 10 }}
          backgroundColor="primary.main"
          shadowOpacity={0.8}
          shadowRadius={10}
          overflow="visible"
          label={
            <LinearGradient
              colors={[colors["secondary.light"], colors["primary.main"]]}
              start={{ x: 0, y: 0.6 }}
              end={{ x: 1, y: 0.4 }}
              style={{
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
                borderColor: colors["secondary.light"],
                borderWidth: 2,
                borderRadius: 12,
                flexDirection: "row",
                zIndex: 23,
              }}
            >
              <Ionicons name="search" color={colors["grey.200"]} size={20} />
              <Text variant="buttonLabel" color="grey.200">
                Search Again
              </Text>
            </LinearGradient>
          }
          marginTop={"l"}
        />
      </Box>
    </Box>
  );
};

export default ResultNotFound;
