import { ThemeProvider } from "@shopify/restyle";
import { Asset } from "expo-asset";
import { loadAsync } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { PureComponent } from "react";
import {
  Dimensions,
  EmitterSubscription,
  Keyboard,
  Pressable,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import assets from "./assets";
import MainRouter from "./router";
import store from "./store";
import { reduxGetCategories } from "./store/thunks/categories";
import { palette } from "./theme/palette";
import theme from "./theme/theme";
import { FontNames } from "./theme/variants";

export default class App extends PureComponent<any, { initialized: boolean }> {
  constructor(props: any) {
    super(props);
    // function bindings
    this.handleBlur = this.handleBlur.bind(this);
    this.initialize = this.initialize.bind(this);
    this.state = {
      initialized: false,
    };
  }

  // keyboard events
  keyboardWillShow: EmitterSubscription | null = null;
  keyboardDidHide: EmitterSubscription | null = null;
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

  private async getAssets(): Promise<void> {
    await Promise.all(Object.values(assets).map((a) => Asset.loadAsync(a)));

    return Promise.resolve();
  }

  private async initialize() {
    if (this.state.initialized) return;
    // Dont hide the splash screen
    SplashScreen.preventAutoHideAsync();

    // get categories and initialize fonts & assets
    await Promise.all([
      loadAsync(fonts),
      store.dispatch(reduxGetCategories()),
      this.getAssets(),
    ]);

    // set state and dismiss the splash screen
    this.setState(
      (a) => ({ ...a, initialized: true }),
      () => SplashScreen.hideAsync()
    );
  }

  render() {
    const { height } = Dimensions.get("screen");
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <View style={{ height, backgroundColor: palette.paper }}>
            {this.state.initialized && (
              <Pressable
                disabled={!this.keyboardOpen}
                onPress={this.handleBlur}
                style={{ flex: 1 }}
              >
                <ThemeProvider theme={theme}>
                  {/* Set the background of the status bar to match the app background */}
                  <StatusBar
                    style="light"
                    animated
                    backgroundColor={palette.primaryMain}
                  />
                  <MainRouter />
                </ThemeProvider>
              </Pressable>
            )}
          </View>
        </SafeAreaProvider>
      </Provider>
    );
  }
}

const fonts: Record<keyof FontNames, string> = {
  "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
};
