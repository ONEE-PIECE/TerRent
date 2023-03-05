import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { auth } from './config'
import React, { useState } from "react";
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';


const SignUpScreen = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [username, setusername] = useState('')
  const navigation = useNavigation()


  const handleSignUp = async () => {
      const userInfos = await createUserWithEmailAndPassword(auth, email, password).then(res=>{
        addAccount(res._tokenResponse.localId)
        navigation.navigate("HomeScreen")
        alert(`Welcome`)
      }).catch(err=>{ setTimeout(() => {
        alert("Invalid email or password")
      }, 2000);})
  }

  //userName must tbe unique
  const validUserName =(username,email)=>{
    if(username.length < 3){
      alert("Username must be at least 3 characters long")
      return false
    }
    else if(username.length > 20){
      alert("Username must be less than 20 characters long")
      return false
    }
    else{
      return true
    }
  }

  const addAccount = (fireId) => {
    axios.post("http://192.168.103.9:3000/player/playerSignUp", {
      FireId:fireId,
      FirstName: firstname,
      SecondName: lastname,
      UserName: username
    }).then(res => { console.log(res)
      })
    .catch(err => { console.error(err) });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
      <View
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={firstname}
          placeholder={"First Name"}
          onChangeText={(text) => setfirstname(text)}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          value={lastname}
          placeholder={"Last Name"}
          onChangeText={(text) => setlastname(text)}
          autoCapitalize="words"
        />
        <TextInput
         
          style={styles.input}
          value={email}
          placeholder={"E-mail"}
          onChangeText={(text) => setemail(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder={"Password"}
          secureTextEntry
          onChangeText={(text) => {setpassword(text)}          }
        />
        <TextInput
          style={styles.input}
          value={username}
          placeholder={"Username"}
          onChangeText={(text) => {setusername(text)}}
          autoCapitalize="words"
        />
      </View >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          title={"Sign Up"}
          onPress={() => { handleSignUp(),validUserName(username,email)
          }}
          style={styles.button}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
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
    width: '60%'
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
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  buttonOutlineText: {
    color: 'white',
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

export default SignUpScreen


