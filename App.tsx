import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { PureComponent } from "react";
import { EmitterSubscription, Keyboard, Pressable } from "react-native";
import SharedElementRouter from "./router";
import Scaffold from "./theme/Scaffold";
import theme from "./theme/theme";

export default class App extends PureComponent<any, never> {
  constructor(props) {
    super(props);
    // function bindings
    this.handleBlur = this.handleBlur.bind(this);
  }

  // keyboard events
  keyboardWillShow: EmitterSubscription;
  keyboardDidHide: EmitterSubscription;
  keyboardOpen: boolean = false;

  componentDidMount(): void {
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

  render() {
    return (
      <Pressable onPress={this.handleBlur} style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <Scaffold>
            {/* Set the background of the status bar to match the app background */}
            <StatusBar animated translucent />
            <SharedElementRouter />
          </Scaffold>
        </ThemeProvider>
      </Pressable>
    );
  }
}
