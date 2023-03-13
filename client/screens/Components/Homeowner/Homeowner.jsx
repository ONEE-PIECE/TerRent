import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Avatar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Homeowner = ({ navigation }) => {
  const [dataowner, setdataowner] = useState([]);
  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 20, top: 30, left: -60 }}>
        Welcome
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 15,
          top: 20,
          left: 40,
          textTransform: "capitalize",
        }}
      >
        owner Name
      </Text>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text
            onPress={(e) => {
              navigation.navigate("HandleOwnerTerrains");
            }}
            style={styles.title}
          >
            All Terrains
          </Text>
          <Text style={styles.subtitle}>
            In here you can see all your added terrains
          </Text>
          <Ionicons name="eye-outline" color={"white"} size={140}></Ionicons>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Add a new Terrain</Text>
          <Text style={styles.subtitle}>In here you can add a new terrain</Text>

          <Ionicons
            name="add-circle-outline"
            color={"white"}
            size={140}
          ></Ionicons>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.card2}>
          <Text style={styles.title}>Reservations</Text>
          <Text style={styles.subtitle}>
            In here you can accept or ignore incoming reservations
          </Text>
          <Ionicons name="calendar" size={140} color={"white"}></Ionicons>
        </View>
        <View style={styles.card2}>
          <Text style={styles.title}>Events</Text>
          <Text style={styles.subtitle}>
            In here you can see your events or add new ones
          </Text>
          <Ionicons name="calendar" size={140} color={"white"}></Ionicons>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card3}>
          <Avatar.Image
            source={{
              uri: "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg?fit=640,427",
            }}
            size={45}
          />
          <Text
            style={{
              left: 60,
              top: -35,
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Profile
          </Text>
        </View>
        <View style={styles.card3}>
          <Ionicons name="log-out-outline" color={"black"} size={40}></Ionicons>
          <Text
            style={{
              left: 60,
              top: -35,
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Logout
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F49D1A",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    height: 250,
    marginTop: 80,
    margin: 5,
  },
  card2: {
    flex: 1,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    height: 250,
    marginTop: 150,
    margin: 5,
  },
  card3: {
    flex: 1,
    backgroundColor: "#F49D1A",
    borderRadius: 20,
    padding: 10,
    height: 250,
    marginTop: 40,
    margin: 5,
    height: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Homeowner;
