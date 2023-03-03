import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

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
    
    try{
   const posts= await axios.post('http://192.168.104.13:3000/api/reservation/player/6/1', {
      Day: selectedDay,
      Hour: selectedTime,
      Reserved:false
    })
    console.log(posts);
  }
  catch(err){
    console.log(err);
  }
  };
  
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: 'green',
  },
});
export default AppointmentScheduler;

