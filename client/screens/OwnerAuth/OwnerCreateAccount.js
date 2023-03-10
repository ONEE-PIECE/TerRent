import {
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { authentification } from "../../FbConfig/config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { storage } from "../../FbConfig/config.js";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Stack,
  Icon,
  Input,
  Pressable,
  Center,
  NativeBaseProvider,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const OwnerCreateAccount = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [patentImage, setPatentImage] = useState("");
  const [ProfileImage, setProfileImage] = useState("");
  const [FireId, setFireId] = useState("");
  const [show, setShow] = useState(false);

  // Upload an image to Firebase Cloud Storage
  const uploadImage = async (uri, path) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    try {
      const snapshot = await storage.ref().child(path).put(blob);
      console.log("Image uploaded successfully!", snapshot);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const axiosPost = (FireId) => {
    console.log(FireId);
    let body = {
      Fireid: FireId,
      FullName: fullName,
      PhoneNumber: phoneNumber,
      patentImage: patentImage,
      ProfileImage: ProfileImage,
    };
    axios
      .post("http://192.168.101.8:3000/owner/signUpOwner", body)
      .then((response) => console.log("account created successfully"))
      .catch((err) => console.log(err));
  };

  //! IMAGE UPLOADER

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };
  const pickPatentImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    console.log("result patentimage", result);
    if (!result.cancelled) {
      setPatentImage(result.uri);
    }
  };

  const Register = () => {
    createUserWithEmailAndPassword(authentification, email, password)
      .then((res) => {
        // uploadImage(patentImage,'my-image.jpg')
        axiosPost(res._tokenResponse.localId);
        navigation.navigate("Login");
      })
      .catch((e) => console.log(e));
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} style={styles.container}>
        <Stack space={3} w="75%" maxW="300px" mx="auto">
          <Text
            style={{ color: "darkorange", top: -40, fontSize: 15, left: 20 }}
          >
            Register Here and join the fun{" "}
          </Text>
          <TextInput
            size="sm"
            placeholder="Full Name"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
            }}
            style={styles.input}
            placeholderTextColor="lightgrey"
          />
          <TextInput
            size="sm"
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
            }}
            style={styles.input}
            placeholderTextColor="lightgrey"
          />

          <TextInput
            size="sm"
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            style={styles.input}
            placeholderTextColor="lightgrey"
          />

          <TextInput
            w={{
              base: "100%",
              md: "25%",
            }}
            placeholderTextColor="lightgrey"
            style={styles.input}
            type={show ? "text" : "password"}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={6}
                  mr="2"
                  color="darkorange"
                />
              </Pressable>
            }
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            placeholder="Password"
          />
          <TextInput
            w={{
              base: "100%",
              md: "25%",
            }}
            placeholderTextColor="lightgrey"
            style={styles.input}
            type={show ? "text" : "password"}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={6}
                  mr="2"
                  color="darkorange"
                />
              </Pressable>
            }
            value={ConfirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            placeholder="Confirm Password"
          />
          <Button
            style={styles.button}
            leftIcon={
              <Icon
                as={Ionicons}
                style={{ height: 25, width: 70 }}
                name="cloud-upload-outline"
                size={6}
              />
            }
            onPress={pickPatentImage}
          >
            Upload Patent Image
          </Button>
          {/* <Button
            style={styles.button}
            leftIcon={
              <Icon as={Ionicons} name="cloud-upload-outline" size={7} />
            }
            onPress={pickProfileImage}
          >
            Upload Profile Image
          </Button> */}
          <Button
            style={styles.button2}
            onPress={() => {
              Register();
            }}
          >
            <Text style={{ color: "darkorange" }}>Register</Text>
          </Button>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ownerlogin");
            }}
          >
            <Text
              style={{ color: "lightgrey", top: 60, fontSize: 10, left: 60 }}
            >
              Already an Owner ? Login Here .
            </Text>
          </TouchableOpacity>
        </Stack>
      </Center>
    </NativeBaseProvider>
  );
};

export default OwnerCreateAccount;

const styles = StyleSheet.create({
  container: { backgroundColor: "black" },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent",
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey",
    color: "darkorange",
    marginVertical: 3,
  },

  button: {
    backgroundColor: "transparent",
    width: "100%",
    padding: 15,
    borderRadius: 0,

    borderLeftWidth: 0.5,
    borderColor: "lightgrey",
    alignItems: "center",
  },
  button2: {
    backgroundColor: "transparent",
    width: "100%",
    padding: 15,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: "darkorange",
    alignItems: "center",
    color: "lightgrey",

    top: 50,
  },
});
