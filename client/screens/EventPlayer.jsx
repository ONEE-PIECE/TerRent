import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { baseUrl } from "../urlConfig/urlConfig";
import Countdown from "react-native-countdown-component";
import { Button } from "react-native-paper";
const EventPlayer = () => {
  const [events, setEvents] = useState([]);
  const [isJoinButtonDisabled, setIsJoinButtonDisabled] = useState(false);
  const joinEvent = async () => {
    try {
      setIsJoinButtonDisabled(true); // Disable the button
      const response = await axios.post(
        `${baseUrl}api/events/4/players/KXOSTN1J6FS8cYtMQPy99glI7lZ2`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/events/2`);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  const renderEventItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 10 }}>
        <Text>{item.EventName}</Text>
        <Text>{item.Description}</Text>
        <Text>{item.Price}</Text>
        <Button disabled={isJoinButtonDisabled} onPress={() => joinEvent()}>
          JOIN
        </Button>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Countdown
        until={122}
        onFinish={() => console.log("Countdown finished")}
        size={12}
      />
    </View>
  );
};
export default EventPlayer;
