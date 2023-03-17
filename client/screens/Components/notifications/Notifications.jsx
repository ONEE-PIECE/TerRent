import React from "react";
import PendingReservation from "../../pendingReservation";
import ConfirmedReservations from "../../confirmedReservations";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScrollView, View } from "react-native";

const Notifications = () => {
  return (
    <View>
      <ScrollView style={{ backgroundColor: "black", height: "100%" }}>
        <PendingReservation />
        <ConfirmedReservations />
      </ScrollView>
    </View>
  );
};

export default Notifications;
