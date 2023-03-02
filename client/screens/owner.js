import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View,Button,ScrollView } from 'react-native';

const Reservation = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    handleFetchingAllTheReservationForAnOwner(),
    handleUpdateReservation()
  }, []);
  const handleFetchingAllTheReservationForAnOwner = () => {
    axios
      .get('http://192.168.104.9:3000/api/reservation/player/1')
      .then(function (response) {
        setReservations(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleUpdateReservation = (reservationId) => {
    axios
      .put(`http://192.168.104.9:3000/api/reservation/player/${reservationId}`)
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
      .delete(`http://192.168.104.9:3000/api/reservation/player/${reservationId}`)
      .then(function (response) {
        console.log(response.data);
        // Update the reservations state by filtering out the deleted reservation
        const updatedReservations = reservations.filter((reservation) => reservation.id !== reservationId);
        setReservations(updatedReservations);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <ScrollView>
      <Text>Reservations:</Text>
      {reservations.map((reservation) => (
        <View key={reservation.id}>
          <Text>Day: {reservation.Day}</Text>
          <Text>Hour: {reservation.Hour}</Text>
          <Text>Reserved: {reservation.Reserved.toString()}</Text>
          <Button
  title="Confirm"
  onPress={() => handleUpdateReservation(reservation.id)}
  disabled={reservation.Reserved}
/>
<Button
title='Delete'
onPress={() => handleDeleteReservation(reservation.id)}
>
</Button>
        </View>
      ))}
    </ScrollView>
  );
};


export default Reservation;
