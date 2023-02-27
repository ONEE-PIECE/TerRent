
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppointmentScheduler from './client/screens/calander';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>good luck chabiba</Text>
      <StatusBar style="auto" />
      <AppointmentScheduler />
    </View>
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

