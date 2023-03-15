import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import { Popup } from "popup-ui";
import Root from "popup-ui/src/basic/Root";

const AppointmentScheduler = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [allReservations, setAllReservatins] = useState([]);
  const [resversedDate, setreservedDate] = useState([]);

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    setSelectedTime(null);

    console.log(day);
    const reservationsForSelectedDay = allReservations.filter((reservation) => {
      const reservationDate = new Date(reservation.Day);
      const selectedDate = new Date(day.dateString);
      return (
        reservationDate.toDateString() === selectedDate.toDateString() &&
        reservation.Reserved === true
      );
    });
    console.log(reservationsForSelectedDay);

    var newarray = reservationsForSelectedDay.map((e) => {
      let time = e.Hour;

      return time.slice(0, time.length - 3);
    });

    setreservedDate(newarray);
    return newarray;
  };

  // const aa=reservationsForSelectedDay.filter(reservation=>{
  //   reservation.Reserved===true
  //   console.log(aa);
  // })

  const handleTimePress = (time) => {
    setSelectedTime(time);
    setModalVisible(true);
  };

  useEffect(() => {
    fetchallreservation();
  }, []);

  const fetchallreservation = () => {
    axios
      .get("http://192.168.101.8:3000/api/reservation/playerG")
      .then(function (response) {
        setAllReservatins(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // console.log(allReservations);

  const handleConfirm = async () => {
    try {
      const posts = await axios.post(
        "http://192.168.101.8:3000/api/reservation/player/1/1",
        {
          Day: selectedDay,
          Hour: selectedTime,
          Reserved: false,
        }
      );
      console.log(posts);
    } catch (err) {
      console.log(err);
    }
  };

  const timeSlots = [
    "9:00",
    "11:00",
    "13:00",
    "15:00",
    "17:00",
    "19:00",
    "21:00",
    "23:00",
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDay]: { selected: true },
        }}
      />
      {selectedDay && (
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, marginVertical: 20, color: "white" }}>
            Select a time:
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {timeSlots.map((hour) => (
              <TouchableOpacity
                key={hour}
                style={[
                  {
                    width: 80,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 10,
                  },
                  hour === selectedTime && {
                    borderBottomWidth: 1,
                    borderColor: "darkorange",
                  },
                ]}
                onPress={() => {
                  handleTimePress(hour),
                    Popup.show({
                      type: "Success",
                      title: "Confirm Your Reservation",
                      button: true,
                      textBody:
                        "Are you sure you want to reserve this date and time ?",
                      buttontext: "Confirm",
                      callback: () => {
                        Popup.hide();
                        handleConfirm();
                      },
                    });
                }}
              >
                <Text
                  style={[
                    {
                      color: resversedDate.includes(hour)
                        ? "lightgrey"
                        : "darkorange",
                      opacity: resversedDate.includes(hour) ? 0.5 : 1,
                      fontSize: 18,
                      fontWeight: "600",
                      fontStyle: "italic",
                    },
                    hour === selectedTime && {
                      color: "darkorange",
                    },
                  ]}
                >
                  {resversedDate.includes(hour) ? "reserved" : hour}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  selectedTimeSlot: {
    backgroundColor: "transparent",
  },
});
export default AppointmentScheduler;
