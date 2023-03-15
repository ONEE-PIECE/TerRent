import React from "react";
import { View, Text } from "react-native";
import Reservation from "./owner";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Terrainreservations = ({ navigation, route }) => {
  return (
    <View>
      <Text>terrainreservations</Text>
      <Reservation />
    </View>
  );
};

export default Terrainreservations;
