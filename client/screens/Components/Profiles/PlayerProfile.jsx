import React, { useState } from "react";
import axios from "axios";
import { Avatar, Card } from "react-native-paper";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { baseUrl } from "../../../urlConfig/urlConfig";

const Playerprofile = () => {
  const [dataplayer, setdataplayer] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}api/player/Rmt1HlADW2eRc82c7XG5srWLjUQ2`)
      .then((res) => {
        setdataplayer(res.data[0]);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <View style={{ backgroundColor: "black", height: "100%" }}>
      <View>
        <Avatar.Image
          style={{
            alignSelf: "center",

            borderTopRightRadius: 144,
            borderTopLeftRadius: 150,
            borderBottomRightRadius: 137,
            borderBottomLeftRadius: 143,
            borderColor: "darkorange",
            backgroundColor: "transparent",
            borderWidth: 2,
          }}
          source={{
            uri: dataplayer.ProfileImage,
          }}
          size={300}
        />
      </View>

      <Text
        style={{
          color: "darkorange",
          textAlign: "center",
          top: 10,
          fontStyle: "italic",
          fontWeight: "700",
          textTransform: "capitalize",
        }}
      >
        {dataplayer.FirstName + " " + dataplayer.SecondName}
      </Text>

      <Card.Content>
        <View
          style={{
            borderRadius: 100,
            width: 180,
            height: 100,
            top: 120,
            backgroundColor: "white",
          }}
          source={{
            uri: "https://wallpaperaccess.com/full/1236519.jpg",
          }}
        ></View>
      </Card.Content>

      <Card.Content>
        <Text style={{ textAlign: "center", top: 60, left: -100 }}>
          Settings
        </Text>
        <View
          style={{
            borderRadius: 100,
            height: 100,
            width: 180,
            backgroundColor: "white",
            left: 190,
          }}
          source={{
            uri: "https://media.istockphoto.com/id/1178494279/photo/triangles-background-texture.jpg?b=1&s=170667a&w=0&k=20&c=VZJQJVAB-oDecd-zRzWwjLw3l1yMZoOCgznp2ZNoMEA=",
          }}
        >
          <Text
            style={{ textAlign: "center", top: 40, color: "black", zIndex: 1 }}
          >
            Notifications
          </Text>
        </View>
      </Card.Content>
    </View>
  );
};

export default Playerprofile;
