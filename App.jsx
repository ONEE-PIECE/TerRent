import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Home from "./client/screens/Components/Homepage/Home.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Allterrains from "./client/screens/Components/Allterrains/Allterrains.jsx";
import Carrousel from "./client/screens/Components/Allterrains/Carrousel.jsx";
import OneTerrain from "./client/screens/Components/Terraindetails/OneTerrain.jsx";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Allterrains"
          component={Allterrains}
          options={{ title: "Allterrains" }}
        ></Stack.Screen>
        <Stack.Screen
          name="oneterrain"
          component={OneTerrain}
          options={{ title: "Oneterrain" }}
        ></Stack.Screen>
        {/* <Stack.Screen
          name="carousel"
          component={Carrousel}
          options={{ title: "carousel" }}
        ></Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;