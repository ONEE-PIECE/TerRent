import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { Button } from "native-base";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentification } from "../../FbConfig/config.js";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { baseUrl } from "../../urlConfig/urlConfig.js";
const OwnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ownerData, setOwnerData] = useState([]);

  const navigation = useNavigation();
  
  _storeData = async (id) => {
    try {
      await AsyncStorage.setItem('Token',id);
    } catch (error) {
      console.log(error)
    }
  };


  


  //getting owner data by email to verify that the account is authorized to access or not 

const axiosGetOwner= async (Email)=>{

    axios= axios.get(`${baseUrl}owner/signInOwner/Authorization/${Email}`).then((res)=>{
     console.log(res.data)
  setOwnerData(res.data)})
  return axios
}


const signInOwner = async () => {
  try {
    // get data from axios
    const axiosResponse = await axios.get(`${baseUrl}owner/signInOwner/Authorization/${email}`);
    const data = axiosResponse.data;
    console.log(data[0].AccountConfirmation)
    setOwnerData(data);
   if(data[0].AccountConfirmation){
    const res = await signInWithEmailAndPassword(authentification, email, password);
    _storeData(res._tokenResponse.localId);
    navigation.navigate("HomeOwner");} else{
      alert('Your account is not authorized to login please wait for confirmation')
    }
    
    
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#999"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              signInOwner();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateAccount");
            }}
            style={styles.buttonOutLine}
          >
            <Text style={styles.buttonOutLineText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1b",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: "#33cc33",
    marginBottom: 20,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "#1b1b1b",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#33cc33",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonOutLine: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#33cc33",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutLineText: {
    color: "#33cc33",
    fontSize: 18,
    fontWeight: "bold",
  },
});


export default OwnerLogin;
