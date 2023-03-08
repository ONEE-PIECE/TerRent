import React from "react";
import { ImageBackground, ScrollView, View, Text } from "react-native";

import { Button } from "react-native-paper";
import Carrouseel from "./carrouseel";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const LandingScreen = ({ navigation: { navigate } }) => {
  return (
    <View style={{ backgroundColor: "black" }}>
      <Button
        onPress={() => {
          navigate("ownerlogin");
        }}
        style={{ top: 38, left: -100, zIndex: 1 }}
      >
        <Text
          style={{
            color: "darkorange",
          }}
        >
          Start as an Owner
        </Text>
      </Button>
      <Button
        onPress={() => {
          navigate("playerlogin");
        }}
        style={{
          left: 100,

          paddingLeft: 0,
        }}
      >
        <Text style={{ color: "darkorange" }}>Start as a Player</Text>
      </Button>
      <Carrouseel />
    </View>
  );
};

export default LandingScreen;
