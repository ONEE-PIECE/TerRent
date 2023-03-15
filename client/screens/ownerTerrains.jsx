import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  Image,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";
import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../urlConfig/urlConfig";
import BottomNavigationBarowner from "./Components/Bottomnavowner/Bottomnavowner";

const HandleOwnerTerrains = () => {
  const [terrains, setTerrains] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTerrain, setSelectedTerrain] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [capacity, setCapacity] = useState("");
  const [availability, setAvailability] = useState("");
  const [loading, setLoading] = useState("Loading...");
  const navigation = useNavigation();
  // SignOut function

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("OwnerToken");
      console.log("welcome :", value);
      let ownerTerrains = await axios.get(`${baseUrl}api/terrain/${value}`);
      console.log("owner", ownerTerrains.data);
      return ownerTerrains.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTerrain = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}api/terrain/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateTerrain = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}api/terrain/${selectedTerrain.id}`,
        {
          Name: name,
          Price: price,
          Description: description,
          Images: images,
          Capacity: capacity,
          Availability: availability,
        }
      );
      console.log(response.data);
      setModalVisible(false);
      setSelectedTerrain();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    _retrieveData().then((response) => {
      setTerrains(response);
    });
  }, []);
  return (
    <View style={{ backgroundColor: "black", height: "100%" }}>
      <FlatList
        data={terrains}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            style={{
              paddingBottom: 10,
              paddingHorizontal: 10,
              shadowColor: "transparent",
              backgroundColor: "transparent",
              marginTop: 30,
              width: "50%",
              // borderBottomColor: "#C147E9",
              // borderBottomWidth: 2,
              // borderBottomRightRadius: 20,
              // borderBottomLeftRadius: 20,
            }}
            onPress={(e) => {
              navigation.navigate("reservations", { id: item.id });
            }}
          >
            <View style={{ opacity: 0.9 }}>
              <ImageBackground
                style={{ height: 200 }}
                borderRadius={15}
                source={{
                  uri: item.Img1,
                }}
              >
                <View
                  style={{ flex: 1, backgroundColor: "rgba(0,0,0, 0.4)" }}
                />
              </ImageBackground>
            </View>
            <Text
              style={{
                position: "absolute",
                top: 140,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 0.5,
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                paddingLeft: 20,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: "#181818",
                opacity: 0.9,
                textTransform: "capitalize",
              }}
            >
              {item.Name}
            </Text>

            <Text
              style={{
                position: "absolute",
                top: 170,
                left: 50,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: "600",
              }}
            >
              {item.Category}
            </Text>
          </Card>
        )}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View>
          <Text>Edit Terrain</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Price"
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          /////change img
          {/* <TextInput
        placeholder="Images"
        value={Img1}
        onChangeText={(text) => setImages(text)}
      /> */}
          <TextInput
            placeholder="Capacity"
            value={capacity}
            onChangeText={(text) => setCapacity(text)}
          />
          <View>
            <Text>Availability:</Text>
            <Button
              title={availability ? "Available" : "Unavailable"}
              onPress={() => setAvailability(!availability)}
            />
          </View>
          <Button title="Save" onPress={handleUpdateTerrain} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <BottomNavigationBarowner />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  terrain: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalContent: {
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  availabilityText: {
    marginRight: 10,
  },
});

export default HandleOwnerTerrains;
