import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import Scaffold from "./components/theme/Scaffold";
import theme from "./components/theme/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Scaffold>
        {/* Set the background of the status bar to match the app background */}
        <StatusBar  />
        <Text>Helloo</Text>
      </Scaffold>
    </ThemeProvider>
  );
}

 
