import React, { useEffect, useState } from "react";
import { Image, ImageBackground, ScrollView, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Card } from "react-native-paper";
import Carrousel from "./Carrousel.jsx";
import { Text } from "react-native-paper";
import axios from "axios";
import { Alert } from "react-native";
import { baseUrl } from "../../../urlConfig/urlConfig.js";

const Allterrains = ({ navigation, route }) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${baseUrl}api/terrain/terrains/category/${route.params.Category}`
      )
      .then((response) => {
        if (response.data.length === 0) {
          alert("no data");
        } else {
          setdata(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ScrollView>
      <Card>
        <Card.Cover
          source={{
            uri: "https://chronicle.brightspotcdn.com/02/35/6569497e16c8d337843b578ff306/1476ca2cb5cf7a03ee92612764413561.jpg",
          }}
          style={{
            width: 420,
            height: 200,
            marginBottom: 10,
          }}
        />
        <Text
          style={{
            position: "absolute",
            top: 0,
            left: -12,
            right: 0,
            bottom: 10,
            justifyContent: "center",
            alignItems: "center",

            color: "black",
            fontSize: 25,
            paddingLeft: 20,
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
          }}
        >
          Soccer For All
        </Text>
      </Card>

      <Text style={{ fontSize: 20, marginBottom: 10, marginLeft: 10 }}>
        Most Rated Soccer Fields
      </Text>
      <Carrousel />
      <Text style={{ fontSize: 20, marginBottom: 10, marginLeft: 10 }}>
        All Terrains
      </Text>
      {data.map((item) => (
        <Card
          style={{
            paddingBottom: 10,
            paddingHorizontal: 10,
            shadowColor: "transparent",
          }}
          onPress={(e) => {
            navigation.navigate("oneterrain", { id: item.id });
          }}
        >
          <View style={{ opacity: 0.9 }}>
            {console.log(item)}
            <Card.Cover
              source={{
                uri: item.Images,
              }}
            />
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
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              fontSize: 25,
              paddingLeft: 20,
              borderBottomLeftRadius: 14,
              borderBottomRightRadius: 14,
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
            }}
          >
            {item.Capacity} Player
          </Text>
          <Text
            style={{
              position: "absolute",
              top: 170,
              left: 270,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            {item.Rating} Stars
          </Text>
        </Card>
      ))}
    </ScrollView>
  );
};

export default Allterrains;
