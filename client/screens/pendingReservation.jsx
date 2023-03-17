import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, Button, ScrollView, ImageBackground } from "react-native";
import { StyleSheet } from "react-native";
import { baseUrl } from "../urlConfig/urlConfig";

const PendingReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [terrains, setTerrains] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}api/terrain/terrains/getAll`)
      .then((response) => {
        setTerrains(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${baseUrl}api/reservation/playerss/Rmt1HlADW2eRc82c7XG5srWLjUQ2/pending`
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
      return terrain.Name;
    }
    return "";
  };

  return (
    <ScrollView style={{ marginVertical: 30 }}>
      {reservations.map((reservation) => (
        <ImageBackground
          style={{ height: 150, marginHorizontal: 10 }}
          borderRadius={10}
          source={{
            uri: "https://images.unsplash.com/photo-1540379708242-14a809bef941?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3RhZGV8ZW58MHx8MHx8&w=1000&q=80",
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
                color: "darkorange",
                fontWeight: "bold",
              }}
            >
              Pending
            </Text>
          </View>
        </ImageBackground>
      ))}
    </ScrollView>
  );
};

export default PendingReservation;
