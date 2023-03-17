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
    const eventToUpdate = events.find((ahmed) => ahmed.id === id);
    setUpdatingEventId(id);

    setUpdatedEventName(eventToUpdate.EventName);
    setUpdatedEventDescription(eventToUpdate.Description);
    setUpdatedEventPrice(eventToUpdate.Price);
  };

  const handleUpdateFormSubmit = async (updatingEventId) => {
    console.log(updatingEventId);
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
    <View
      style={{
        flex: 1,
        height: "100%",
        marginTop: 50,
        paddingTop: 20,
        backgroundColor: "black",
      }}
    >
      {events.length ? (
        events.map((event) => (
          <View>
            <View
              key={event.id}
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
              onPress={() => handleUpdate(event.id)}
            >
              <Text
                style={{
                  textTransform: "capitalize",
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {event.EventName}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  marginTop: 20,

                  textTransform: "capitalize",
                  textAlign: "center",
                }}
              >
                {event.Description}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  marginTop: 5,
                  textAlign: "center",
                }}
              >
                {event.Date.slice(0, 10)}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  textAlign: "center",
                  marginBottom: 50,
                }}
              >
                {event.Price}
              </Text>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 180,
                  marginBottom: 50,
                  left: 30,
                }}
                onPress={() => handleDelete(event.id)}
              >
                <Text style={{ color: "#C147E9", top: -30, right: -300 }}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ position: "absolute", top: 200, left: 10 }}
                onPress={() => handleUpdate(event.id)}
              >
                <Text
                  style={{
                    color: "grey",

                    top: -50,
                    paddingBottom: 50,
                    left: 20,
                    position: "absolute",
                  }}
                >
                  update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
            style={{
              fontSize: 16,
              marginBottom: 8,
              color: "white",
              borderBottomColor: "#C147E9",
              borderBottomWidth: 1,
              alignSelf: "center",
              height: 40,
            }}
          />
          <TextInput
            value={updatedEventDescription}
            onChangeText={setUpdatedEventDescription}
            placeholder="Event description"
            style={{
              fontSize: 14,
              marginBottom: 8,
              color: "white",
              borderBottomColor: "#C147E9",
              borderBottomWidth: 1,
              alignSelf: "center",
              height: 40,
            }}
          />
          <TextInput
            value={updatedEventPrice}
            onChangeText={setUpdatedEventPrice}
            placeholder="Event price"
            style={{
              fontSize: 12,
              marginBottom: 8,
              color: "white",
              borderBottomColor: "#C147E9",
              borderBottomWidth: 1,
              alignSelf: "center",
              height: 40,
            }}
          />
          <TouchableOpacity
            onPress={handleUpdateFormSubmit}
            style={{
              backgroundColor: "transparent",
              padding: 8,
              marginRight: 320,
              top: 20,
            }}
          >
            <Text style={{ color: "#C147E9" }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUpdatingEventId(null)}
            style={{
              backgroundColor: "transparent",
              padding: 8,
              marginLeft: 320,
              marginBottom: 50,
              top: -20,
            }}
          >
            <Text style={{ color: "grey", marginBottom: 80 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View>
        <Countdown
          style={{ top: -50 }}
          size={25}
          until={1000}
          digitStyle={{
            backgroundColor: "transparent",
            borderWidth: 0,
            borderColor: "darkorange",
          }}
          digitTxtStyle={{ color: "#C147E9" }}
          timeLabelStyle={{ color: "red", fontWeight: "bold" }}
          separatorStyle={{ color: "#C147E9" }}
          timeToShow={["H", "M", "S"]}
          timeLabels={{ m: null, s: null }}
          showSeparator
        />
      </View>
    </View>
  );
};

export default EventsList;
