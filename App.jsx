
import Map from "./MAP/Map"
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  React from "react";
import Allterrains from "./client/screens/Components/Allterrains/Allterrains.jsx";
import Carrousel from "./client/screens/Components/Allterrains/Carrousel.jsx";
import OneTerrain from "./client/screens/Components/Terraindetails/OneTerrain.jsx";

import { Button } from "react-native";
import { Avatar } from "react-native-paper";
import { StyleSheet } from "react-native";
import LoginScreen from "./client/screens/Components/playerSignInAndSignUp/LoginScreen.jsx";

import SignUpScreen from "./client/screens/Components/playerSignInAndSignUp/SignUpScreen.jsx";
import HomeSceen from "./client/screens/Components/playerSignInAndSignUp/HomeSceen.jsx";

import AppointmentScheduler from './client/screens/calander.jsx'
import Reservation from './client/screens/owner.jsx';
import Home from "./client/screens/Components/Homepage/Home.jsx";
import AddTerrainForm from "./client/screens/addTerrain.jsx";
import HandleOwnerTerrains from "./client/screens/ownerTerrains.jsx";
import Confirmation from "./MAP/Confirmation";
import Mapplayer from "./MAP/Mapplayer ";


const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator  >
        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerRight: () => (
              <Avatar.Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                }}
                size={40}
                style={{ top: -5 }}
              />
            ),
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Allterrains"
          component={Allterrains}
          options={{
            title: "Allterrains",
            headerRight: () => (
              <Avatar.Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                }}
                size={40}
                style={{ top: -5 }}
              />
            ),
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="oneterrain"
          component={OneTerrain}
          options={{
            title: "Oneterrain",
            headerRight: () => (
              <Avatar.Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                }}
                size={40}
                style={{ top: -5 }}
              />
            ),
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="carousel"
          component={Carrousel}
          options={{ title: "carousel" }}

        ></Stack.Screen>
         {/* <AppointmentScheduler />
         {/* <ChatComponent/>  */}
         {/* <Reservation/>   */}
        {/* <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: "Login",
            headerShown: "LoginScreen",
          }}
        />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> 
        <Stack.Screen
          name="HomeScreen"
          component={HomeSceen}
          options={{
            title: "Home",
            headerShown: "Home",
          }}
        /> 
        <Stack.Screen
          name="Reservation"
          component={Reservation}
          options={{ title: "Reservation" }}
        ></Stack.Screen>  */}
        {/* <Stack.Screen
          name="Reservation"
          component={Reservation}
          options={{ title: "Reservation" }}
        ></Stack.Screen> */}
        {/* <Stack.Screen
          name="AppointmentScheduler"
          component={AppointmentScheduler}
          options={{ title: "AppointmentScheduler" }}
        ></Stack.Screen> */}
            <Stack.Screen 
        name="Map"
        component={Map}
        options={{title:'Map',headerShown:false}}
        ></Stack.Screen>

          <Stack.Screen 
        name="Confirmation"
        component={Confirmation}
        options={{title:'Confirmation',headerShown:false}}
        ></Stack.Screen>   

         {/* <Stack.Screen 
        name="Mapplayer"
        component={Mapplayer}
        options={{title:'Mapplayer',headerShown:false}}
        ></Stack.Screen> */}

        {/* <Stack.Screen 
        name="HandleOwnerTerrains"
        component={HandleOwnerTerrains}
        options={{title:'HandleOwnerTerrains',headerShown:false}}
        ></Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
      }


     

 

export default App;