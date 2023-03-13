import Map from "./client/MAP/Map.jsx";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Allterrains from "./client/screens/Components/Allterrains/Allterrains.jsx";

import OneTerrain from "./client/screens/Components/Terraindetails/OneTerrain.jsx";

import { Avatar } from "react-native-paper";

import LoginScreen from "./client/screens/Components/playerSignInAndSignUp/LoginScreen.jsx";

import SignUpScreen from "./client/screens/Components/playerSignInAndSignUp/SignUpScreen.jsx";

import AppointmentScheduler from "./client/screens/calander.jsx";
import Reservation from "./client/screens/owner.jsx";
import Home from "./client/screens/Components/Homepage/Home.jsx";

import HandleOwnerTerrains from "./client/screens/ownerTerrains.jsx";
import Confirmation from "./client/MAP/Confirmation.jsx";
import Mapplayer from "./client/MAP/Mapplayer .jsx";

import OwnerLogin from "./client/screens/OwnerAuth/OwnerLogin";
import OwnerCreateAccount from "./client/screens/OwnerAuth/OwnerCreateAccount";

import AddEventForm from "./client/screens/addEvents.jsx";
import LandingScreen from "./client/screens/Components/landing/landingpage.jsx";
import Homeowner from "./client/screens/Components/Homeowner/Homeowner.jsx";
import Terrainreservations from "./client/screens/terrainreservations.jsx";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Landingscreen"
          component={LandingScreen}
          options={{
            statusBarColor: "black",

            headerShown: false,

            title: "",

            initialRouteName: "Landingscreen",
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="ownerlogin"
          component={OwnerLogin}
          options={{
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "orange",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="homeowner"
          component={Homeowner}
          options={{
            statusBarColor: "#F49D1A",
            headerStyle: {
              backgroundColor: "#F49D1A",
            },
            headerTitleStyle: {
              color: "black",
            },
            title: "Your Terrains",

            navigationBarColor: "black",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="createowneraccount"
          component={OwnerCreateAccount}
          options={{
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerShown: false,
            headerTitleStyle: {
              color: "orange",
            },
            title: "Register Here",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="playerlogin"
          component={LoginScreen}
          options={{
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "orange",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="registerplayer"
          component={SignUpScreen}
          options={{
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerShown: false,
            headerTitleStyle: {
              color: "orange",
            },
            title: "Register Here",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "orange",
            },
            title: "",
            headerRight: () => (
              <View
                style={{
                  top: 0,
                  borderWidth: 3,
                  borderRadius: 20,

                  borderColor: "orange",

                  borderStyle: "solid",
                }}
              >
                <Avatar.Image
                  source={{
                    uri: "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg?fit=640,427",
                  }}
                  size={30}
                />
              </View>
            ),
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Allterrains"
          component={Allterrains}
          options={{
            title: "",
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "orange",
            },
            headerTintColor: "orange",
            headerRight: () => (
              <View
                style={{
                  top: 0,
                  borderWidth: 3,
                  borderRadius: 20,

                  borderColor: "orange",

                  borderStyle: "solid",
                }}
              >
                <Avatar.Image
                  source={{
                    uri: "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg?fit=640,427",
                  }}
                  size={30}
                />
              </View>
            ),
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="oneterrain"
          component={OneTerrain}
          options={{
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "orange",
            },
            headerTintColor: "orange",
            title: "Oneterrain",
            headerRight: () => (
              <View
                style={{
                  top: 0,
                  borderWidth: 3,
                  borderRadius: 20,

                  borderColor: "orange",

                  borderStyle: "solid",
                }}
              >
                <Avatar.Image
                  source={{
                    uri: "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg?fit=640,427",
                  }}
                  size={30}
                />
              </View>
            ),
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Reservation"
          component={Reservation}
          options={{ title: "Reservation" }}
        ></Stack.Screen>
        <Stack.Screen
          name="AppointmentScheduler"
          component={AppointmentScheduler}
          options={{ title: "AppointmentScheduler" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Map"
          component={Map}
          options={{ title: "Map", headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Confirmation"
          component={Confirmation}
          options={{ title: "Confirmation", headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Mapplayer"
          component={Mapplayer}
          options={{
            title: "Mapplayer",
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "orange",
            },
            headerTintColor: "orange",
            title: "Get your directions !",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="HandleOwnerTerrains"
          component={HandleOwnerTerrains}
          options={{
            title: "Your Terrains",
            statusBarColor: "#F49D1A",
            headerStyle: {
              backgroundColor: "#F49D1A",
            },
            headerTitleStyle: {
              color: "black",
            },
            headerTintColor: "black",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="AddEventForm"
          component={AddEventForm}
          options={{ title: "AddEventForm" }}
        ></Stack.Screen>
        <Stack.Screen
          name="reservations"
          component={Reservation}
          options={{
            title: "This Terrain Reservations",
            statusBarColor: "#F49D1A",
            headerStyle: {
              backgroundColor: "#F49D1A",
            },
            headerTitleStyle: {
              color: "black",
            },
            headerTintColor: "black",
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
