import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Image, Text } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { fire } from "../config";
import { baseUrl } from "../urlConfig/urlConfig.js";
const AddEventForm = () => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [message, setMessage] = useState("");
  const [userToken, setUserToken] = useState("");
  // retrieve token from local storage
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("Token");
      setUserToken(value);
      console.log("welcome :", value);
      let ownerData = await axios.get(`${baseUrl}owner/signInOwner/${value}`);
      console.log("owner", ownerData.data);
      return ownerData.data;
    } catch (error) {
      console.log(error);
    }
  };
  // permession to access galery and camera
  const Permession = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  // upload image to the firebase storage
  /// Upload an image to Firebase Cloud Storage
  const uploadEventImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const storage = getStorage(fire);
    const storageRef = ref(storage, `terrent_Events_images/${filename}`);
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
          setEventImage(downloadURL);
        });
      }
    );
  };
  useEffect(() => {
    Permession();
    _retrieveData();
  }, []);
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("EventName", eventName);
      formData.append("Description", description);
      formData.append("Date", date);
      formData.append("Price", price);
      formData.append("Media", eventImage);
      const response = await axios.post(
        `${baseUrl}api/events/${userToken}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setMessage("Event added");
      setEventName("");
      setDescription("");
      setDate("");
      setPrice("");
      setEventImage();
    } catch (err) {
      console.log(err);
    }
  };
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      uploadEventImage(result.uri);
    }
  };
  return (
    <View>
      <TextInput
        value={eventName}
        onChangeText={setEventName}
        placeholder="Event Name"
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <TextInput value={date} onChangeText={setDate} placeholder="Date" />
      <TextInput value={price} onChangeText={setPrice} placeholder="Price" />
      {eventImage && (
        <Image
          source={{ uri: eventImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button title="Select Image" onPress={handlePickImage} />
      <Button title="Submit" onPress={handleSubmit} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
};
export default AddEventForm;
