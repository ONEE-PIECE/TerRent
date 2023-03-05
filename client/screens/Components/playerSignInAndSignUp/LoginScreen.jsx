import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Button } from 'react-native'
import React, { useState } from 'react'
import { auth } from './config'
import { useNavigation } from '@react-navigation/native'
import 'react-native-gesture-handler';
import { FacebookAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { AccessToken } from 'react-native-fbsdk-next';
import { logInWithReadPermissionsAsync } from 'expo-facebook';


const LoginScreen = () => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigation = useNavigation()
  
//still not done 

  const logInWithFacebook = async () => {
    try {
      await logInWithReadPermissionsAsync("", {
        permissions: ['public_profile', 'email']
      })
        .then(res => console.log(res));
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        return;
      }
      const fbCredentials = FacebookAuthProvider.credential(data.access_token)
      const auth = getAuth()
      const res = await signInWithCredential(auth, fbCredentials)
      console.log(res);
    } catch (error) { console.error(error); }
  }



  const handleSignIn = async () => {
    try {
      const userInfos = await signInWithEmailAndPassword(auth, email, password)
      const user = userInfos.user
      alert("Welcome")
      navigation.navigate("HomeScreen")
    } catch (err) {
      console.log(err);
      alert("Invalid E-mail or Password!")
    }
  }


  // const image={uri:"https://thumbs.dreamstime.com/b/creative-collage-unrecognizable-models-running-jumping-advertising-sport-healthy-lifestyle-motion-activity-movement-concept-161953582.jpg"}

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.container}> */}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='E-mail'
          value={email}
          onChangeText={text => setemail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={text => setpassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignIn}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logInWithFacebook}
          style={styles.facebook}
        >
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUpScreen")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  facebook: {
    backgroundColor: "#3b5998",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 5,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center'
  },

  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  inputContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  button: {
    backgroundColor: 'orange',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    width: "100%"
  },
  buttonOutlineText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 20
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 7,
    borderColor: 'orange',
    borderWidth: 3
  }

})
export default LoginScreen
