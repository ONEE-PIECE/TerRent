
import Map from "./MAP/Map"
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  React from "react";
import Allterrains from "./client/screens/Components/Allterrains/Allterrains.jsx";
import Carrousel from "./client/screens/Components/Allterrains/Carrousel.jsx";
import OneTerrain from "./client/screens/Components/Terraindetails/OneTerrain.jsx";
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
        ></Stack.Screen> */}
{/*        
        <Stack.Screen
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