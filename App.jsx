import Map from "./client/MAP/Map.jsx";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Allterrains from "./client/screens/Components/Allterrains/Allterrains.jsx";

import OneTerrain from "./client/screens/Components/Terraindetails/OneTerrain.jsx";

import { Avatar } from "react-native-paper";
import EventsList from "./client/screens/Events.jsx";
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
import Post from "./client/screens/Components/Terraindetails/Post.jsx";
import AddEventForm from "./client/screens/addEvents.jsx";
import LandingScreen from "./client/screens/Components/landing/landingpage.jsx";
import Homeowner from "./client/screens/Components/Homeowner/Homeowner.jsx";
import Terrainreservations from "./client/screens/terrainreservations.jsx";
import Playerprofile from "./client/screens/Components/Profiles/PlayerProfile.jsx";
import Notifications from "./client/screens/Components/notifications/Notifications.jsx";
import PlayerSettings from "./client/screens/Components/Profiles/PlayerSettings.jsx";
import { LogBox } from "react-native";

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();
const App = ({ navigation, route }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Post" component={Post}></Stack.Screen> */}

        <Stack.Screen
          name="Landingscreen"
          component={LandingScreen}
          options={{
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            title: "",

            initialRouteName: "Landingscreen",
            navigationBarColor: "black",
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
              color: "darkorange",
            },
            title: "",
            navigationBarColor: "black",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="homeowner"
          component={Homeowner}
          options={{
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "darkorange",
            },
            title: "",
            headerShown: false,
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
              color: "darkorange",
            },
            title: "Register Here",
            navigationBarColor: "black",
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
              color: "darkorange",
            },
            title: "",
            navigationBarColor: "black",
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
              color: "darkorange",
            },
            title: "Register Here",
            navigationBarColor: "black",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="HandleOwnerTerrains"
          component={HandleOwnerTerrains}
          options={{
            title: "Your Terrains",
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "darkorange",
            },
            headerTintColor: "black",
            navigationBarColor: "black",
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
              color: "darkorange",
            },
            title: "",
            navigationBarColor: "black",
            headerRight: () => (
              <View
                style={{
                  top: 0,
                  borderWidth: 3,
                  borderRadius: 20,

                  borderColor: "darkorange",

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
            title: "All Terrains",
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },

            headerTitleStyle: {
              color: "darkorange",
            },
            headerTintColor: "darkorange",
            navigationBarColor: "black",
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
              color: "darkorange",
            },
            headerTintColor: "darkorange",
            title: "Terrain Details",
          }}
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
              color: "darkorange",
            },
            headerTintColor: "darkorange",
            title: "Get your directions !",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="AddEventForm"
          component={AddEventForm}
          options={{
            title: "Add an Event",
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "darkorange",
            },
            headerShown: true,
            headerTintColor: "darkorange",
            navigationBarColor: "black",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="EventsList"
          component={EventsList}
          options={{
            title: "This Terrain Reservations",
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "darkorange",
            },
            headerShown: false,
            headerTintColor: "darkorange",
            navigationBarColor: "black",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="reservations"
          component={Reservation}
          options={{
            title: "This Terrain Reservations",
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "darkorange",
            },
            headerShown: false,
            headerTintColor: "darkorange",
            navigationBarColor: "black",
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="notifications"
          component={Notifications}
          options={{
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleStyle: {
              color: "darkorange",
            },
            title: "Your Notifications",
            navigationBarColor: "black",
            headerTintColor: "darkorange",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="profileplayer"
          component={Playerprofile}
          options={{
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },

            headerTitleStyle: {
              color: "darkorange",
            },
            title: "Your Profile",
            navigationBarColor: "black",
            headerTintColor: "darkorange",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="playersettings"
          component={PlayerSettings}
          options={{
            statusBarColor: "black",
            headerStyle: {
              backgroundColor: "black",
            },

            headerTitleStyle: {
              color: "darkorange",
            },
            title: "Change Your Info",
            navigationBarColor: "black",
            headerTintColor: "darkorange",
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
