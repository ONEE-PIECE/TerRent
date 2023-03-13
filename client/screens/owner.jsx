import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, Button, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import { baseUrl } from "../urlConfig/urlConfig";
import { Card } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
const Reservation = ({ naviagtion, route }) => {
  const [reservations, setReservations] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [filterReserved, setFilterReserved] = useState(false);
  const [token, setToken] = useState("");
  const [terrain, setTerrain] = useState([]);
  const [style, setstyle] = useState(false);
  _retrieveData = async () => {
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
    <ScrollView style={{ backgroundColor: "#F49D1A" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="bell" size={30} style={styles.icon} />
          <Text style={styles.notificationCount}>{notificationCount}</Text>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: "transparent", left: 250 }}
          onPress={handleFilterReserved}
        >
          <Text style={{ fontSize: 30 }}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ top: -40, left: 70 }}
          onPress={handleClearFilter}
        >
          <Text style={{ fontSize: 30 }}>All</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Reservations:</Text>
        {filteredReservations.map((reservation) => (
          <View>
            <Card
              style={{
                paddingBottom: 10,
                paddingHorizontal: 10,
                shadowColor: "transparent",
                backgroundColor: "transparent",
                marginVertical: 10,
                borderColor: "black",
                borderWidth: 1,
                marginVertical: 50,
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
                  color: "black",
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
                  left: 110,
                  top: 50,

                  borderLeftColor: "black",
                  borderLeftWidth: 1,
                }}
                onPress={() => {
                  handleUpdateReservation(reservation.id);
                  addPoints(reservation.playerFireId);
                  setstyle(true);
                }}
                disabled={reservation.Reserved}
              >
                <Text style={{ fontSize: 13 }}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 50,
                  left: 250,
                  borderLeftColor: "black",
                  borderLeftWidth: 1,
                }}
                onPress={() => handleDeleteReservation(reservation.id)}
              >
                <Text style={{ fontSize: 13 }}>Reject Reservation</Text>
              </TouchableOpacity>
            </Card>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 50,
    flex: 1,
    backgroundColor: "#F49D1A",
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
  icon: {
    marginRight: 10,
    top: 20,
  },
  notificationCount: {
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reservationContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
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
