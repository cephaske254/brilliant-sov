import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView
} from "react-native";
import SearchInput from "./SearchInput";
import Box from "./theme/Box";
import Text from "./theme/Text";

const AppHeader = () => {
  return (
    <SafeAreaView>
      <Box
        style={{
          borderBottomEndRadius: 22,
          borderBottomStartRadius: 22,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 25,
        }}
      >
        {/* Change the status bar foreground color */}
        <StatusBar style="dark" animated />
        <Text variant="h3" style={{ marginBottom: 15 }}>
          Categories
        </Text>
        <SearchInput />
      </Box>
    </SafeAreaView>
  );
};

export default AppHeader;
