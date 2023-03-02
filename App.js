
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import AppointmentScheduler from './client/screens/calander';
// import Reservation from './client/screens/owner';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>good luck chabiba</Text>
      <StatusBar style="auto" />
      <AppointmentScheduler />
      {/* <ChatComponent/> */}
      {/* <Reservation/> */}
    </View>
  );
}

