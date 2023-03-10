import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, Button, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [filterReserved, setFilterReserved] = useState(false);

  useEffect(() => {
    handleFetchingAllTheReservationForAnOwner(), handleUpdateReservation();
  }, []);

  const handleFetchingAllTheReservationForAnOwner = () => {
    axios
      .get("http://192.168.43.108:3000/api/reservation/player/1")
      .then(function (response) {
        setReservations(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUpdateReservation = (reservationId) => {
    axios
      .put(`http://192.168.43.108:3000/api/reservation/player/${reservationId}`)
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
      .delete(
        `http://192.168.43.108:3000/api/reservation/player/${reservationId}`
      )
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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="bell" size={30} style={styles.icon} />
          <Text style={styles.notificationCount}>{notificationCount}</Text>
        </View>
        <Button onPress={handleFilterReserved} title="filter"></Button>
        <Button title="clear" onPress={handleClearFilter}></Button>
        <Text style={styles.title}>Reservations:</Text>
        {filteredReservations.map((reservation) => (
          <View key={reservation.id} style={styles.reservationContainer}>
            <Text style={styles.reservationText}>Day: {reservation.Day}</Text>
            <Text style={styles.reservationText}>Hour: {reservation.Hour}</Text>
            <Text style={styles.reservationText}>
              Reserved: {reservation.Reserved.toString()}
            </Text>

            <Button
              title="Confirm"
              onPress={() => handleUpdateReservation(reservation.id)}
              disabled={reservation.Reserved}
              style={styles.confirmButton}
              titleStyle={styles.confirmButtonText}
            />
            <Button
              title="Delete"
              onPress={() => handleDeleteReservation(reservation.id)}
              style={styles.deleteButton}
              titleStyle={styles.deleteButtonText}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
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
