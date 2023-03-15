import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, Button, ScrollView } from "react-native";

import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/AntDesign";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { baseUrl } from "../urlConfig/urlConfig";
import { Card } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
const Reservation = ({ navigation, route }) => {
  const [reservations, setReservations] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [filterReserved, setFilterReserved] = useState(false);
  const [token, setToken] = useState("");
  const [terrain, setTerrain] = useState([]);
  const [style, setstyle] = useState(false);
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("OwnerToken");
      console.log("welcome :", value);
      setToken(value);
      return value;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    _retrieveData().then((response) => getAllTerrains(response));

    handleFetchingAllTheReservationForAnOwner();
  }, []);

  const getAllTerrains = (token) => {
    axios
      .get(`${baseUrl}api/terrain/${token}`)
      .then(function (response) {
        setTerrain(response.data);

        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const handleFetchingAllTheReservationForAnOwner = () => {
    axios
      .get(`${baseUrl}api/reservation/player/${route.params.id}`)
      .then(function (response) {
        setReservations(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const addPoints = (playerFireId) => {
    console.log(playerFireId);
    axios
      .get(`${baseUrl}api/player/${playerFireId}`)
      .then((response) => {
        let addedPoints = response.data[0].Points + 5;
        axios.put(`${baseUrl}api/player/updatePlayerPoints`, {
          FireId: playerFireId,
          Points: addedPoints,
        });
      })
      .catch((error) => console.log(error));
  };
  const handleUpdateReservation = (reservationId) => {
    axios
      .put(`${baseUrl}api/reservation/player/${reservationId}`)
      .then(function (response) {
        console.log(response.data);
        // Update the reservations state with the new data
        const updatedReservations = reservations.map((reservation) => {
          if (reservation.id === reservationId) {
            return { ...reservation, Reserved: true };
          }
          return reservation;
        });
        setReservations(updatedReservations);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleDeleteReservation = (reservationId) => {
    axios
      .delete(`${baseUrl}api/reservation/player/${reservationId}`)
      .then(function (response) {
        console.log(response.data);
        // Update the reservations state by filtering out the deleted reservation
        const updatedReservations = reservations.filter(
          (reservation) => reservation.id !== reservationId
        );
        setReservations(updatedReservations);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleFilterReserved = () => {
    setFilterReserved(true);
  };
  const handleClearFilter = () => {
    setFilterReserved(false);
  };
  const filteredReservations = filterReserved
    ? reservations.filter((reservation) => reservation.Reserved)
    : reservations;
  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleFilterReserved}
          >
            <Text style={styles.headerButtonText}>Confirmed </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleClearFilter}
          >
            <Text style={styles.headerButtonText}>All reservations</Text>
          </TouchableOpacity>
        </View>

        {filteredReservations.map((reservation) => (
          <View>
            <Card
              style={{
                paddingBottom: 10,
                paddingHorizontal: 10,
                shadowColor: "transparent",
                backgroundColor: "white",
                width: 340,
                borderColor: "#C147E9",
                borderWidth: 1,
                marginTop: 30,
                top: 120,
                left: 0,
              }}
            >
              <Text
                style={{
                  justifyContent: "center",
                  alignItems: "center",

                  color: "black",
                  fontWeight: "500",
                  fontSize: 20,
                }}
              >
                Day : {reservation.Day}
              </Text>

              <Text
                style={{
                  top: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#C147E9",
                  fontWeight: "600",
                }}
              >
                Time : {reservation.Hour}
              </Text>
              <Text
              // style={{
              //   position: "absolute",
              //   top: 170,
              //   left: 270,
              //   right: 0,
              //   bottom: 0,
              //   justifyContent: "center",
              //   alignItems: "center",
              //   color: "white",
              //   paddingLeft: 70,
              // }}
              ></Text>

              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: -60,
                  top: -5,
                }}
                onPress={() => {
                  handleUpdateReservation(reservation.id);
                  addPoints(reservation.playerFireId);
                  setstyle(true);
                }}
                disabled={reservation.Reserved}
              >
                <Text style={{ fontSize: 13, color: "lightgreen", top: 0 }}>
                  <Icon size={30} name="check"></Icon>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 30,
                  right: -60,
                }}
                onPress={() => handleDeleteReservation(reservation.id)}
              >
                <Text style={{ fontSize: 13, color: "red", top: 15 }}>
                  <Icon2 size={30} name="delete"></Icon2>
                </Text>
              </TouchableOpacity>
            </Card>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#C147E9",
  },
  headerButton: {
    flex: 1,
    alignItems: "center",
    marginVertical: 30,
    left: -160,
  },
  headerButtonText: {
    fontSize: 20,
    color: "lightgrey",
  },
  divider: {
    borderLeftWidth: 1,
    borderLeftColor: "#C147E9",
    height: "70%",
    marginHorizontal: 10,

    left: -165,
  },
  container: {
    top: 50,
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: 1000,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
    left: 170,
    position: "absolute",
  },

  title: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  reservationContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  reservationText: {
    marginBottom: 5,
  },
  confirmButton: {
    marginTop: 5,
    backgroundColor: "#5cb85c",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 5,
    backgroundColor: "#d9534f",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default Reservation;
