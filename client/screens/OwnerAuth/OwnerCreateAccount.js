import {
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { auth, app } from "../../config.js";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

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
import { baseUrl } from "../../urlConfig/urlConfig.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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

  /// Upload an image to Firebase Cloud Storage
  const uploadPatentImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const storage = getStorage(app);
    const storageRef = ref(storage, `terrent_Patent_images/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, blob, filename);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setPatentImage(downloadURL);
        });
      }
    );
  };

  const uploadProfileImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const storage = getStorage(app);
    const storageRef = ref(storage, `terrent_Profile_images/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, blob, filename);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setProfileImage(downloadURL);
        });
      }
    );
  };

  const axiosPost = (FireId) => {
    console.log(FireId);
    let body = {
      Fireid: FireId,
      Email: email,
      FullName: fullName,
      PhoneNumber: phoneNumber,
      patentImage: patentImage,
      ProfileImage: ProfileImage,
    };
    axios
      .post(`${baseUrl}owner/signUpOwner`, body)
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
      uploadProfileImage(result.uri);
    }
  };
  const pickPatentImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        base64: false,
      });
      if (!result.canceled) {
        uploadPatentImage(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const Register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // uploadImage(patentImage,'my-image.jpg')
        axiosPost(res._tokenResponse.localId);
        navigation.navigate("ownerLogin");
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
            Register Here and join the fun
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
          <Button style={styles.button2} onPress={Register}>
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
