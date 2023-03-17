import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ImageBackground } from "react-native";
import { baseUrl } from "../../../urlConfig/urlConfig";
import { getAuth, signOut } from "firebase/auth";
const Homeowner = ({ navigation, route }) => {
  const [dataowner, setdataowner] = useState([]);
  const auth = getAuth();
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "#C147E9",
          fontSize: 25,
          top: 60,
          left: -70,
          fontStyle: "italic",
        }}
      >
        Welcome
      </Text>
      <Text
        style={{
          color: "#C147E9",
          fontSize: 15,
          top: 50,
          left: 40,
          textTransform: "capitalize",
        }}
      >
        {route.params.FirstName + " " + route.params.LaseName}
      </Text>

      <View style={styles.row}>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={(e) => {
              navigation.navigate("HandleOwnerTerrains");
            }}
          >
            <Text style={styles.title}>All Terrains</Text>

            <Text style={styles.subtitle}>
              In here you can see all your added terrains
            </Text>
            <ImageBackground
              source={{
                uri: "https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700320628.jpg",
              }}
              style={{
                position: "absolute",
                borderWidth: 1,

                width: 160,
                height: 250,
                top: 10,
                opacity: 0.6,
              }}
              borderRadius={20}
            ></ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={(e) => {
              navigation.navigate("Map");
            }}
          >
            <Text style={styles.title}>Add a new Terrain</Text>
            <Text style={styles.subtitle}>
              In here you can add a new terrain
            </Text>

            <ImageBackground
              source={{
                uri: "https://e1.pxfuel.com/desktop-wallpaper/706/490/desktop-wallpaper-geometric-shapes-dark-background-black-violet-violet-dark-black-thumbnail.jpg",
              }}
              style={{
                position: "absolute",

                width: 160,
                height: 250,
                opacity: 0.6,
                top: 10,
              }}
              borderRadius={20}
            ></ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.card2}>
          <TouchableOpacity
            onPress={(e) => {
              navigation.navigate("addterrain");
            }}
          >
            <Text style={styles.title}>Reservations</Text>
            <Text style={styles.subtitle}>
              In here you can accept or ignore incoming reservations
            </Text>
            <ImageBackground
              source={{
                uri: "https://cutewallpaper.org/28/dark-violet-wallpaper-logo-hd/13728636.jpg",
              }}
              style={{
                position: "absolute",
                borderWidth: 1,
                width: 160,
                height: 250,
                opacity: 0.6,
                top: 10,
              }}
              borderRadius={20}
            ></ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.card2}>
          <TouchableOpacity
            onPress={(e) => {
              navigation.navigate("EventsList");
            }}
          >
            <Text style={styles.title}>Events</Text>
            <Text style={styles.subtitle}>
              In here you can see your events or add new ones
            </Text>

            <ImageBackground
              source={{
                uri: "https://cutewallpaper.org/23/abstract-purple-black-wallpaper/216185177.jpg",
              }}
              style={{
                position: "absolute",
                borderWidth: 1,

                width: 160,
                opacity: 0.6,
                height: 250,
                top: 10,
              }}
              borderRadius={20}
            >
              {/* <View
              style={{ flex: 1, backgroundColor: "rgba(0,0,0, 0.60)" }}
            ></View>  hedha l shader li bch nestaaamlou filokhrin */}
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card3}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("profileowner");
            }}
          >
            <Avatar.Image
              source={{
                uri: route.params.ProfileImage,
              }}
              size={45}
            />
          </TouchableOpacity>
          <Text
            style={{
              left: 60,
              top: -35,
              fontSize: 20,
              fontWeight: "bold",
              color: "#C147E9",
            }}
          >
            {route.params.FirstName}
          </Text>
        </View>
        <View style={styles.card3}>
          <TouchableOpacity
            onPress={() => {
              signOut(auth)
                .then(() => {})
                .catch((error) => {
                  console.error(error);
                });
              navigation.navigate("ownerlogin");
            }}
          >
            <Ionicons
              name="log-out-outline"
              color={"#C147E9"}
              size={40}
            ></Ionicons>
            <Text
              style={{
                left: 60,
                top: -35,
                fontSize: 20,
                fontWeight: "400",
                color: "#C147E9",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
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
    backgroundColor: "black",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    top: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 20,

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
    backgroundColor: "black",
    borderRadius: 20,
    padding: 10,
    height: 250,
    marginTop: 40,
    margin: 5,
    height: 70,
  },
  title: {
    zIndex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  subtitle: {
    zIndex: 1,
    fontSize: 14,
    color: "lightgrey",
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
