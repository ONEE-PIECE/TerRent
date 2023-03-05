import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OwnerHome from './client/screens/OwnerAuth/OwnerHome';
import OwnerLogin from './client/screens/OwnerAuth/OwnerLogin';
import OwnerCreateAccount from './client/screens/OwnerAuth/OwnerCreateAccount';
import { NativeBaseProvider } from 'native-base';
const Stack = createNativeStackNavigator();


export default function App() {


  return (<NativeBaseProvider>
    <NavigationContainer>
    <Stack.Navigator 
    initialRouteName='Login'
    screenOptions={{
      headerTintColor:'black',
      headerTitleAlign:'center'

    }}
    >
      
    <Stack.Screen name="Login" component={OwnerLogin} />
    <Stack.Screen name="CreateAccount" component={OwnerCreateAccount} />
    <Stack.Screen name="Home" component={OwnerHome} />
    </Stack.Navigator>
  </NavigationContainer>
  </NativeBaseProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

