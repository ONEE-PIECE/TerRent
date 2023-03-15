import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import axios from "axios";
import { baseUrl } from "../urlConfig/urlConfig";
import Countdown from "react-native-countdown-component";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [updatingEventId, setUpdatingEventId] = useState(null);
  const [updatedEventName, setUpdatedEventName] = useState("");
  const [updatedEventDescription, setUpdatedEventDescription] = useState("");
  const [updatedEventPrice, setUpdatedEventPrice] = useState("");
  // const eventTimeInSeconds = Math.floor(new Date(event.Date).getTime() / 1000);
  // const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  // const timeDiffInSeconds = eventTimeInSeconds - currentTimeInSeconds;
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/events/1`);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}api/events/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      Alert.alert("Success", "Event deleted successfully.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to delete event.");
    }
  };

  const handleUpdate = (id) => {
    const eventToUpdate = events.find((event) => event.id === id);
    setUpdatingEventId(id);
    setUpdatedEventName(eventToUpdate.EventName);
    setUpdatedEventDescription(eventToUpdate.Description);
    setUpdatedEventPrice(eventToUpdate.Price);
  };

  const handleUpdateFormSubmit = async () => {
    try {
      await axios.put(`${baseUrl}api/events/${updatingEventId}`, {
        EventName: updatedEventName,
        Description: updatedEventDescription,
        Price: updatedEventPrice,
      });
      fetchEvents();
      setUpdatingEventId(null);
      setUpdatedEventName("");
      setUpdatedEventDescription("");
      setUpdatedEventPrice("");
      Alert.alert("Success", "Event updated successfully.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to update event.");
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {events.length ? (
        events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
            onPress={() => handleUpdate(event.id)}
            onLongPress={() => handleDelete(event.id)}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {event.EventName}
            </Text>
            <Text style={{ fontSize: 14 }}>{event.Description}</Text>
            <Text style={{ fontSize: 12 }}>{event.Date.slice(0, 10)}</Text>
            <Text style={{ fontSize: 12 }}>{event.Price}</Text>
            <TouchableOpacity onPress={() => handleDelete(event.id)}>
              <Text style={{ color: "red", marginTop: 10 }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleUpdate(event.id)}>
              <Text style={{ color: "green", marginTop: 10 }}>update</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No events found.</Text>
      )}
      {updatingEventId !== null ? (
        <View style={{ padding: 16 }}>
          <TextInput
            value={updatedEventName}
            onChangeText={setUpdatedEventName}
            placeholder="Event name"
            style={{ fontSize: 16, marginBottom: 8 }}
          />
          <TextInput
            value={updatedEventDescription}
            onChangeText={setUpdatedEventDescription}
            placeholder="Event description"
            style={{ fontSize: 14, marginBottom: 8 }}
          />
          <TextInput
            value={updatedEventPrice}
            onChangeText={setUpdatedEventPrice}
            placeholder="Event price"
            style={{ fontSize: 12, marginBottom: 8 }}
          />
          <TouchableOpacity
            onPress={handleUpdateFormSubmit}
            style={{ backgroundColor: "blue", padding: 8 }}
          >
            <Text style={{ color: "white" }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUpdatingEventId(null)}
            style={{ backgroundColor: "red", padding: 8, marginLeft: 8 }}
          >
            <Text style={{ color: "white" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View>
        {/* <Countdown
          until={timeDiffInSeconds}
          onFinish={() => console.log("Countdown finished")}
          size={12}
          timeToShow={["D", "H", "M", "S"]}
          digitStyle={{ backgroundColor: "#FFF" }}
          digitTxtStyle={{ color: "#1CC625" }}
          separatorStyle={{ color: "#1CC625" }}
          timeLabels={{ d: "Days", h: "Hours", m: "Minutes", s: "Seconds" }}
        /> */}
      </View>
    </View>
  );
};

export default EventsList;
