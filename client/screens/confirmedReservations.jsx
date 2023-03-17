import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, Button, ScrollView, ImageBackground } from "react-native";
import { StyleSheet } from "react-native";
import { baseUrl } from "../urlConfig/urlConfig";
import { Ionicons } from "@expo/vector-icons";

const ConfirmedReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [terrains, setTerrains] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}api/terrain/terrains/all`)
      .then((response) => {
        console.log(response.data);
        setTerrains(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${baseUrl}api/reservation/playerss/Rmt1HlADW2eRc82c7XG5srWLjUQ2/confirmed`
      )
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getTerrainNameById = (terrainId) => {
    const terrain = terrains.find((terrain) => terrain.id === terrainId);
    if (terrain) {
      return terrain.Img1;
    }
    return "";
  };

  return (
    <ScrollView>
      {reservations.map((reservation) => (
        <ImageBackground
          style={{ height: 150, marginHorizontal: 10 }}
          borderRadius={10}
          source={{
            uri: "https://www.aturf.com/wp-content/uploads/2021/11/sahlens-flash-field-corner-kick-sunset-listing.jpg",
          }}
          // source={{ uri: "getTerrainNameById(reservations.Img1) "}}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0, 0.4)",
              borderRadius: 11,
              paddingBottom: 150,
            }}
          />
          <View style={{ textAlign: "center", top: -130 }} key={reservation.id}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {reservation.Day.slice(0, 10)}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {reservation.Hour.slice(0, 5)}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: "green",
                fontWeight: "bold",
              }}
            >
              Confirmed
            </Text>
            <Ionicons></Ionicons>
          </View>
        </ImageBackground>
      ))}
    </ScrollView>
  );
};

export default ConfirmedReservations;
