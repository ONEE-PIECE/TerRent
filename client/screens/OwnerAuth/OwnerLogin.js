import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentification } from "../../../FbConfig/config";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'
const OwnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ownerData, setOwnerData] = useState([]);

  const navigation = useNavigation();
  
  
_storeData = async () => {
  try {
    await AsyncStorage.setItem('marwen',"12345"
    );
  } catch (error) {
console.log(error)    }
};
  
  useEffect(() => {
_storeData()
  }, []);

  const signInOwner = () => {
    signInWithEmailAndPassword(authentification, email, password)
      .then((res) => {
        console.log("hello world", res._tokenResponse.localId);
      })
      .then((res) => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
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
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
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

export default OwnerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutLine: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutLineText: {
    backgroundColor: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
});
