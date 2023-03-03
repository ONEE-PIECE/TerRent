import React from 'react';
import Map from "./MAP/Map"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 

const Stack=createNativeStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Map"
        component={Map}
        options={{title:'Map',headerShown:false}}
        >
     
      </Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;