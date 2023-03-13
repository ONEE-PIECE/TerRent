import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../../../config";
import React, { useState } from "react";
import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignUpScreen = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const navigation = useNavigation();

  const handleSignUp = async () => {
    const userInfos = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then((res) => {
        addAccount(res._tokenResponse.localId);
        if (validUserName(username, email)) {
          navigation.navigate("Home");
          alert("Welcome");
        }
      })
      .catch((err) => {
        setTimeout(() => {
          alert("Invalid email or password");
        }, 2000);
      });
  };

  //userName must tbe unique
  const validUserName = (username, email) => {
    if (username.length < 3) {
      alert("Username must be at least 3 characters long");
      return false;
    } else if (username.length > 20) {
      alert("Username must be less than 20 characters long");
      return false;
    } else {
      return true;
    }
  };

  const addAccount = (fireId) => {
    axios
      .post("http://192.168.101.8:3000/api/player/playerSignUp", {
        FireId: fireId,
        FirstName: firstname,
        SecondName: lastname,
        UserName: username,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <Text style={{ color: "darkorange", top: -50, fontSize: 15, left: 20 }}>
          Register Here and join the fun
        </Text>
        <TextInput
          style={styles.input}
          value={firstname}
          placeholder={"First Name"}
          onChangeText={(text) => setfirstname(text)}
          autoCapitalize="words"
          placeholderTextColor="lightgrey"
        />
        <TextInput
          style={styles.input}
          value={lastname}
          placeholder={"Last Name"}
          onChangeText={(text) => setlastname(text)}
          autoCapitalize="words"
          placeholderTextColor="lightgrey"
        />
        <TextInput
          style={styles.input}
          value={email}
          placeholder={"E-mail"}
          onChangeText={(text) => setemail(text)}
          placeholderTextColor="lightgrey"
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder={"Password"}
          secureTextEntry
          onChangeText={(text) => {
            setpassword(text);
          }}
          placeholderTextColor="lightgrey"
        />
        <TextInput
          style={styles.input}
          value={username}
          placeholder={"Username"}
          onChangeText={(text) => {
            setusername(text);
          }}
          autoCapitalize="words"
          placeholderTextColor="lightgrey"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          title={"Sign Up"}
          onPress={() => {
            handleSignUp();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("playerlogin");
          }}
        >
          <Text style={{ color: "lightgrey", top: 120, fontSize: 10 }}>
            Already a Player ? Login Here .
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "darkorange",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginTop: 5,
    color: "darkorange",
    marginVertical: 20,
  },
  buttonContainer: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "transparent",
    width: "70%",
    padding: 15,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: "darkorange",
    alignItems: "center",
    color: "lightgrey",
    top: 30,
  },
  buttonText: {
    color: "white",

    fontSize: 15,
  },
  buttonOutlineText: {
    color: "darkorange",
    fontSize: 15,
  },
});

export default SignUpScreen;
