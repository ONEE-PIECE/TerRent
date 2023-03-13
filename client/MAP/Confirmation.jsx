import React, { useState } from "react";
import axios from "axios";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Confirmation = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setlat] = useState(route.params.lat);
  const [long, setLong] = useState(route.params.long);
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState("");
  const [capacity, setCapacity] = useState("");
  const [availability, setAvailability] = useState(false);

  const handleAddTerrain = async () => {
    try {
      const newTerrain = {
        Name: name,
        Price: price,
        Description: description,
        lat: lat,
        long: long,
        Region: region,
        Category: category,
        Images: images,
        Capacity: capacity,
        Availability: availability,
      };
      const response = await axios.post(
        "http://192.168.101.8:3000/api/terrain/ownerId",
        newTerrain
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("iheb", lat);
  console.log("atef", route.params.lat, route.params.long);
  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput placeholder="Region" value={region} onChangeText={setRegion} />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput placeholder="Images" value={images} onChangeText={setImages} />
      <TextInput
        placeholder="Capacity"
        value={capacity}
        onChangeText={setCapacity}
        keyboardType="numeric"
      />
      <Button
        title={availability ? "Available" : "Unavailable"}
        onPress={() => setAvailability(!availability)}
      />
      <Button title="Add Terrain" onPress={handleAddTerrain} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: "30%",
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    marginTop: 50,
    marginBottom: 50,
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
export default Confirmation;
