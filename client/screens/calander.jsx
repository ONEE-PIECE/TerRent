import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { baseUrl } from '../urlConfig/urlConfig';



const AppointmentScheduler = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  
  
  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    setSelectedTime(null);
    setModalVisible(true);
    console.log(day.dateString)
  };
  
  const handleTimePress = (time) => {
    setSelectedTime(time);
    setConfirmVisible(true);
  };
  
  const handleConfirm = async () => {
    try {
      const posts = await axios.post(`${baseUrl}api/reservation/player/1/1`, {
        Day: selectedDay,
        Hour: selectedTime,
        Reserved: false,
      });
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
      const response = await axios.get(`${baseUrl}api/reservation/players/1`);
     console.log(response.data);
    }
     catch(err){
throw err
     }
    }
  ;
  const timeSlots = [9, 11, 13, 15, 17,19,21,23];
  
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
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select a time:</Text>
          {timeSlots.map((hour) => (
            <TouchableOpacity
              key={hour}
              style={[
                styles.timeSlot,
                hour === selectedTime && styles.selectedTimeSlot,
              ]}
              onPress={() => handleTimePress(hour)}
            >
              <Text>{hour}:00</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <Modal
  animationType="slide"
  visible={confirmVisible}
  onRequestClose={() => {
    setConfirmVisible(false);
  }}
>
  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>
      Are you sure you want to select {selectedTime}:00 on {selectedDay}?
    </Text>
    <View style={styles.modalButtonContainer}>
      <TouchableOpacity
        style={[styles.modalButton, styles.cancelButton]}
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
    backgroundColor: '#1e3f20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  calendarHeader: {
    backgroundColor: '#2f4f4f',
    padding: 10,
  },
  calendarHeaderText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calendarDay: {
    color: '#2f4f4f',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  calendarSelectedDay: {
    backgroundColor: '#2f4f4f',
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timeSlot: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#5cb85c',
    padding: 10,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSlotText: {
    color: '#5cb85c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedTimeSlot: {
    backgroundColor: 'green',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  confirmButton: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default AppointmentScheduler;

