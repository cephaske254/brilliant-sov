import { ThemeProvider } from "@shopify/restyle";
import { loadAsync } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { PureComponent } from "react";
import { EmitterSubscription, Keyboard, Pressable } from "react-native";
import SharedElementRouter from "./router";
import store from "./store";
import { reduxGetCategories } from "./store/thunks/globals";
import { palette } from "./theme/palette";
import theme from "./theme/theme";
import { FontNames } from "./theme/variants";

export default class App extends PureComponent<any, { initialized: boolean }> {
  constructor(props) {
    super(props);
    // function bindings
    this.handleBlur = this.handleBlur.bind(this);
    this.initialize = this.initialize.bind(this);
    this.state = {
      initialized: false,
    };
  }

  // keyboard events
  keyboardWillShow: EmitterSubscription;
  keyboardDidHide: EmitterSubscription;
  keyboardOpen: boolean = false;

  componentDidMount(): void {
    // initialize
    this.initialize();

    // listen to keyboard changes and
    this.keyboardWillShow = Keyboard.addListener(
      "keyboardWillShow",
      () => (this.keyboardOpen = true)
    );

    this.keyboardDidHide = Keyboard.addListener(
      "keyboardDidHide",
      () => (this.keyboardOpen = false)
    );
  }
  componentWillUnmount(): void {
    // remove the subscribed keyboard events
    this.keyboardWillShow?.remove();
    this.keyboardDidHide?.remove();
  }

  private handleBlur() {
    if (this.keyboardOpen === true) Keyboard.dismiss();
  }

  private async initialize() {
    if (this.state.initialized) return;
    // get categories and initialize fonts
    await Promise.all([loadAsync(fonts), store.dispatch(reduxGetCategories())]);
    this.setState((a) => ({ ...a, initialized: true }));
  }

  render() {
    return (
      <LinearGradient
        colors={[palette.primaryMain, palette.primaryDark].reverse()}
        locations={[0.1, 0.7]}
        start={{
          y: 0.3,
          x: -0.2,
        }}
        // end={{
        //   x: 0.1,
        //   y: 1,
        // }}
        style={{ borderRadius: 20, flex: 1 }}
      >
        {this.state.initialized && (
          <Pressable
            onPress={this.handleBlur}
            style={{ flex: 1, backgroundColor: "transparent" }}
          >
            <ThemeProvider theme={theme}>
              {/* Set the background of the status bar to match the app background */}
              <StatusBar animated translucent />
              <SharedElementRouter />
            </ThemeProvider>
          </Pressable>
        )}
      </LinearGradient>
    );
  }
}

const fonts: Record<keyof FontNames, string> = {
  "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
};
