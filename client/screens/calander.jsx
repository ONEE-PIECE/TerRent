import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import { Root, Popup } from "popup-ui";
const AppointmentScheduler = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    setSelectedTime(null);
    setModalVisible(true);
    console.log(day.dateString);
  };

  const handleTimePress = (time) => {
    setSelectedTime(time);
    setConfirmVisible(true);
  };

  const handleConfirm = async () => {
    try {
      const posts = await axios.post(
        "http://192.168.43.108:3000/api/reservation/player/1/1",
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
  useEffect(() => {
    fetchReservedSlots();
  }, []);

  const fetchReservedSlots = async () => {
    try {
      const response = await axios.get(
        "http://192.168.43.108:3000/api/reservation/players/1"
      );
      console.log(response.data);
    } catch (err) {
      throw err;
    }
  };
  const timeSlots = [9, 11, 13, 15, 17, 19, 21, 23];

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDay]: { selected: true },
        }}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Root>
          <View style={styles.modalContainer}>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                borderBottomColor: "darkorange",
              }}
            >
              Please select a time :
            </Text>
            {timeSlots.map((hour) => (
              <TouchableOpacity
                key={hour}
                style={{
                  marginVertical: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  minWidth: 70,
                  minHeight: 35,
                  alignItems: "center",
                  borderColor: "darkorange",
                }}
                onPress={() => {
                  Popup.show({
                    type: "Success",
                    title: "Confirm Your Reservation",
                    button: true,
                    textBody:
                      "Are you sure you want to reserve this date and time ?",
                    buttontext: "Confirm",
                    callback: () => {
                      Popup.hide();
                    },
                  });
                }}
              >
                <Text style={{ color: "darkorange", fontSize: 15, top: 5 }}>
                  {hour}:00
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Root>
        <Popup />
      </Modal>
      <Modal
        animationType="slide"
        visible={confirmVisible}
        onRequestClose={() => {
          setConfirmVisible(false);
        }}
      >
        <View style={{ backgroundColor: "black", paddingTop: 60 }}>
          <Text style={styles.modalTitle}>
            Are you sure you want to select {selectedTime}:00 on {selectedDay}?
          </Text>
          <View style={{ backgroundColor: "black", height: "100%" }}>
            <TouchableOpacity
              style={{ backgroundColor: "black" }}
              onPress={() => setConfirmVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
  },
  calendarHeader: {
    backgroundColor: "#2f4f4f",
    padding: 10,
  },
  calendarHeaderText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  calendarDay: {
    color: "#2f4f4f",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  calendarSelectedDay: {
    backgroundColor: "#2f4f4f",
    borderRadius: 50,
  },
  modalContainer: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 90,
    top: -30,
  },
  modalTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timeSlot: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#5cb85c",
    color: "darkorange",
    padding: 10,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  timeSlotText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedTimeSlot: {
    backgroundColor: "green",
  },
  modalButtonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  modalButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  cancelButton: {
    backgroundColor: "red",
    borderColor: "red",
  },
  confirmButton: {
    backgroundColor: "green",
    borderColor: "green",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default AppointmentScheduler;
