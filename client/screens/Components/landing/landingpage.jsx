import React from "react";
import { ImageBackground, ScrollView, View, Text } from "react-native";

import { Button } from "react-native-paper";
import Carrouseel from "./carrouseel";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const LandingScreen = ({ navigation: { navigate } }) => {
  return (
    <View>
      <View style={{ backgroundColor: "black" }}>
        <Button
          onPress={() => {
            navigate("ownerlogin");
          }}
          style={{
            position: "absolute",
            left: 30,
            zIndex: 1,
            top: 10,
            borderColor: "#C147E9",
            borderWidth: 1,
            backgroundColor: "#C147E9",
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
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
            position: "absolute",
            right: 30,
            zIndex: 1,
            top: 10,
            borderColor: "darkorange",
            borderWidth: 1,
            backgroundColor: "darkorange",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "black" }}>Start as a Player</Text>
        </Button>
        <Carrouseel />
      </View>
    </View>
  );
};

export default LandingScreen;
