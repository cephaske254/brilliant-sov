import {
  DefaultTheme,
  NavigationContainer,
  RouteProp
} from "@react-navigation/native";
import {
  createNativeStackNavigator, NativeStackNavigationProp
} from "@react-navigation/native-stack";

import Category from "./screens/Category";
import Home from "./screens/Home";
import Quote from "./screens/Quote";
import Search from "./screens/Search";
import { palette } from "./theme/palette";

export type MainRoutes = {
  Home: undefined;
  Search: undefined;
  Category: undefined;
  Quote: { category: string };
};

export type SharedNavigationProps<T extends keyof MainRoutes> =
  NativeStackNavigationProp<MainRoutes, T>;
  
export type MainRouteParams<T extends keyof MainRoutes> = RouteProp<
  MainRoutes,
  T
>;

// NativeStackNavigationProp

const Stack = createNativeStackNavigator<MainRoutes>();

const SharedElementRouter = () => {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: palette.primaryDark,
        },
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Quote" component={Quote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SharedElementRouter;
