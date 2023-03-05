import React from 'react'
import { Text ,TouchableOpacity,View,StyleSheet} from 'react-native'
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'


function HomeSceen() {
  const auth = getAuth();
  const navigation = useNavigation()

  return (
    <View >
      <Text> Welcome </Text>

      <TouchableOpacity
          onPress={() => {
            signOut(auth).then(() => {
          }).catch((error) => {
            console.error(error);
           })
          navigation.navigate("LoginScreen")}}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Log Out</Text>
        </TouchableOpacity>
    </View>

    )
}
const styles = StyleSheet.create({
  buttonOutlineText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 20
  },
buttonOutline: {
  backgroundColor: 'whitesmoke',
  marginTop: 7,
  borderColor: 'blue',
  borderWidth: 3
}
})
export default HomeSceen