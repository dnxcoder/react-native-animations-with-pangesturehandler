// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../pages/Home";
import AnimateCircleSize from "../../pages/AnimateCircleSize";
import SwipeDownModal from "../../pages/SwipeDownModal";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AnimateCircleSize" component={AnimateCircleSize} />
        <Stack.Screen name="SwipeDownModal" component={SwipeDownModal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
