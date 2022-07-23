import { StatusBar } from "expo-status-bar";
import { ComponentProps } from "react";
import { SafeAreaView, TextStyle, ViewStyle } from "react-native";
import Box from "../theme/Box";
import Text from "../theme/Text";
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
  return (
    <SafeAreaView>
      <Box
        paddingHorizontal={"l"}
        style={{
          borderBottomEndRadius: 22,
          borderBottomStartRadius: 22,
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          paddingTop: 25,
          ...containerStyles,
        }}
      >
        {/* Change the status bar foreground color */}
        <StatusBar style="dark" animated {...statusBarProps} />
        {!!title && (
          <Text variant="h3" style={{ marginBottom: 15, ...titleStyle }}>
            {title}
          </Text>
        )}
        <SearchInput />
      </Box>
    </SafeAreaView>
  );
};

export default AppHeader;
