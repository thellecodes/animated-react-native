import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import type { Routes } from "./src/Routes";

import LiquidSwipe from "./projects/liquidswipe/LiquidSwipe/LiquidSwipe";
import { LoadAssets } from "./components";
import PhilzCoffee from "./projects/PhilzCoffee/PhilzCoffee";
import Chrome from "./projects/Chrome/Chrome";
import JellyScroll from "./projects/JellyScroll/JellyScroll";
import ColorSelection from "./projects/Reflectly/ColorSelection";

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SFPro/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SFPro/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SFPro/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SFPro/SF-Pro-Display-Medium.otf"),
  "GothamRounded-Medium": require("./assets/fonts/GothamRounded/GothamRounded-Medium.otf"),
  "GothamRounded-Bold": require("./assets/fonts/GothamRounded/GothamRounded-Bold.otf"),
  "GothamRounded-Light": require("./assets/fonts/GothamRounded/GothamRounded-Light.otf"),
};

const assets: number[] = [];
const Stack = createStackNavigator<Routes>();
const AppNavigator = () => (
  <Stack.Navigator>
    {/* <Stack.Screen
      name="Chrome"
      component={Chrome}
      options={{
        title: "Chrome Drag n Drop",
      }}
    /> */}

    {/* <Stack.Screen
      name="PhilzCoffee"
      component={PhilzCoffee}
      options={{
        title: "Philiz Coffee",
      }}
    /> */}

    {/* <Stack.Screen
      name="JellyScroll"
      component={JellyScroll}
      options={{
        title: "JellyScroll",
      }}
    /> */}

    <Stack.Screen
      name="ColorSelection"
      component={ColorSelection}
      options={{
        title: "ColorSelection",
      }}
    />

    {/* <Stack.Screen
      name="LiquidSwipe"
      component={LiquidSwipe}
      options={{
        title: "Thelle Codes",
      }}
    /> */}
  </Stack.Navigator>
);

const App = () => {
  return (
    <LoadAssets assets={assets} fonts={fonts}>
      <AppNavigator />
    </LoadAssets>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
