import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
//  import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { fire } from "../config";
import { baseUrl } from "../urlConfig/urlConfig.js";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard } from "react-native";
const AddEventForm = () => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [message, setMessage] = useState("");
  const [userToken, setUserToken] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [time, setTime] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);
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
  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime !== undefined) {
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}`;
      setTime(timeString);
      setSelectedDate(
        new Date(
          selectedDate.setHours(
            selectedTime.getHours(),
            selectedTime.getMinutes()
          )
        )
      );
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
  const showToast = () => {
    ToastAndroid.show(
      "Event added successfully ",

      ToastAndroid.SHORT
    );
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{ height: "100%" }}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={eventName}
          onChangeText={setEventName}
          placeholder="Event Name"
          placeholderTextColor="lightgrey"
        />
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          placeholderTextColor="lightgrey"
        />
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDateTimePicker(true)}
        >
          <Text
            style={{
              color: "#C147E9",
              marginVertical: 10,
            }}
          >
            {selectedDate.toLocaleString().slice(0, 9)}
          </Text>
          {showDateTimePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="datetime"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setShowDateTimePicker(false);
                if (selectedDate !== undefined) {
                  setSelectedDate(selectedDate);
                  setDate(selectedDate.toLocaleString());
                }
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text style={{ color: "#C147E9" }}>
            {time ? time : "Select Time"}
          </Text>
          {showTimePicker && (
            <DateTimePicker
              textColor="#C147E9"
              accentColor="dark"
              value={selectedDate}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Price"
          placeholderTextColor="lightgrey"
        />
        {eventImage && (
          <Image source={{ uri: eventImage }} style={styles.image} />
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            borderWidth: 0.5,
            paddingVertical: 15,
            paddingHorizontal: 25,
            borderRadius: 5,
            top: 5,
            alignItems: "center",
            left: -60,
          }}
          onPress={handlePickImage}
        >
          <Ionicons
            name="images-outline"
            color={"#C147E9"}
            size={40}
          ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSubmit, showToast();
            Keyboard.dismiss();
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    width: "95%",
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#C147E9",
    marginBottom: 20,
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    color: "#C147E9",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0.5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    top: -60,
    left: 70,
  },
  buttonText: {
    color: "#C147E9",
    fontSize: 20,
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
    top: 50,
  },
});
export default AddEventForm;
