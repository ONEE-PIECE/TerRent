import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, Button, ScrollView } from "react-native";
import { StyleSheet } from "react-native";

const confirmedReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [terrains, setTerrains] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.43.108:3000/api/terrain/terrains/getAll")
      .then((response) => {
        setTerrains(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://192.168.43.108:3000/api/reservation/playerss/1/confirmed")
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
    <ScrollView>
      {reservations.map((reservation) => (
        <View key={reservation.id}>
          <Text>{reservation.Day}</Text>
          <Text>{reservation.Hour}</Text>
          <Text>{getTerrainNameById(reservation.terrainId)}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default confirmedReservations;
