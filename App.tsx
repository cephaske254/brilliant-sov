import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import Scaffold from "./components/theme/Scaffold";
import theme from "./components/theme/theme";
import SharedElementRouter from "./router";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Scaffold>
        {/* Set the background of the status bar to match the app background */}
        <StatusBar animated translucent />
        <SharedElementRouter />
      </Scaffold>
    </ThemeProvider>
  );
}
