import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import React, { useState } from "react";
import { auth } from "./config";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";
import {
  FacebookAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AccessToken } from "react-native-fbsdk-next";
import { logInWithReadPermissionsAsync } from "expo-facebook";

const LoginScreen = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigation = useNavigation();

  //still not done

  const logInWithFacebook = async () => {
    try {
      await logInWithReadPermissionsAsync("", {
        permissions: ["public_profile", "email"],
      }).then((res) => console.log(res));
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        return;
      }
      const fbCredentials = FacebookAuthProvider.credential(data.access_token);
      const auth = getAuth();
      const res = await signInWithCredential(auth, fbCredentials);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async () => {
    try {
      const userInfos = await signInWithEmailAndPassword(auth, email, password);
      const user = userInfos.user;
      alert("Welcome");
      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
      alert("Invalid E-mail or Password!");
    }
  };

  // const image={uri:"https://thumbs.dreamstime.com/b/creative-collage-unrecognizable-models-running-jumping-advertising-sport-healthy-lifestyle-motion-activity-movement-concept-161953582.jpg"}

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.container}> */}

      <View style={styles.inputContainer}>
        <Text style={{ color: "darkorange", fontSize: 15, top: -90, left: 65 }}>
          Please Login as A Player
        </Text>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => setemail(text)}
          style={styles.input}
          placeholderTextColor="lightgrey"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setpassword(text)}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="lightgrey"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={logInWithFacebook}
          style={styles.facebook}
        >
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("registerplayer");
          }}
          style={styles.buttonOutLine}
        >
          <Text style={styles.buttonOutLineText}>
            Don't have an Account ? Register Here .
          </Text>
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "85%",
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginBottom: 20,
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    color: "darkorange",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "darkorange",
    borderWidth: 0.5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    bottom: -10,
  },
  buttonText: {
    color: "darkorange",
    fontSize: 15,
  },
  buttonOutLine: {
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    bottom: -70,
  },
  buttonOutLineText: {
    color: "lightgrey",
    fontSize: 10,
  },
});
export default LoginScreen;
