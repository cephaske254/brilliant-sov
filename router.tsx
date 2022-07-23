import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Home from "./screens/Home";
import Search from "./screens/Search";

export type SharedRoutes = {
  Home: undefined;
  Search: undefined;
};

export type SharedRoutesProps<T extends keyof SharedRoutes> =
  NativeStackNavigationProp<SharedRoutes, T>;

const Stack = createSharedElementStackNavigator<SharedRoutes>();

const SharedElementRouter = () => {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "transparent",
        },
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SharedElementRouter;
