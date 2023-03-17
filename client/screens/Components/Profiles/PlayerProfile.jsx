import React, { useState } from "react";
import axios from "axios";
import { Avatar, Card } from "react-native-paper";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { baseUrl } from "../../../urlConfig/urlConfig";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircularProgress from "react-native-circular-progress-indicator";
import { Popup } from "popup-ui";
import BottomNavigationBar from "../Bottomnav/BottomNav";
import Icon from "react-native-vector-icons/Fontisto";
import { Ionicons } from "@expo/vector-icons";
const Playerprofile = ({ navigation, route }) => {
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
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1616941381038-cc17b1ab63b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1cm5pbmd8ZW58MHx8MHx8&w=1000&q=80",
        }}
        style={{ height: "100%" }}
      >
        <View>
          <Avatar.Image
            style={{
              alignSelf: "center",

              backgroundColor: "transparent",
              top: 10,
            }}
            source={{
              uri: dataplayer.ProfileImage,
            }}
            size={250}
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
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 40,
          }}
        >
          {dataplayer.FirstName + " " + dataplayer.SecondName}
        </Text>
        <Card.Content>
          <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate("wishlist");
          // }}
          >
            <View
              style={{
                borderRadius: 100,
                width: 180,
                height: 100,
                top: -230,
                left: -90,
                position: "absolute",
              }}
            ></View>
            <Text
              style={{
                textAlign: "center",
                top: 20,
                right: 0,
                color: "red",
              }}
            >
              <Icon name="favorite" size={50} color={"darkorange"}></Icon>
            </Text>
            <Text
              style={{ color: "white", left: 163, top: 20, fontWeight: "600" }}
            >
              WishList
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("playersettings", {
                img: dataplayer.ProfileImage,
              });
            }}
            style={{ top: 225, right: -190 }}
          >
            <View
              style={{
                borderRadius: 100,
                width: 180,
                height: 100,
                top: -2,
                position: "absolute",
                backgroundColor: "rgba(0,0,0, 0.4)",
                borderColor: "darkorange",
                borderWidth: 4,
              }}
            >
              <Text
                style={{
                  left: 60,
                  top: 35,
                  color: "darkorange",
                  fontWeight: "500",
                }}
              >
                Settings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ top: 85 }}
            // onPress={() => {
            //   navigation.navigate("notifications");
            // }}
          >
            <View
              style={{
                position: "absolute",
                borderRadius: 100,

                height: 100,
                width: 180,
                backgroundColor: "rgba(0,0,0, 0.4)",
                borderColor: "darkorange",
                borderWidth: 4,

                left: 0,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  top: 35,
                  color: "darkorange",
                  fontWeight: "500",
                  zIndex: 1,
                }}
              >
                Events
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ top: 85 }}
            onPress={() => {
              navigation.navigate("notifications");
            }}
          >
            <View
              style={{
                position: "absolute",
                borderRadius: 100,

                height: 100,
                width: 180,
                backgroundColor: "rgba(0,0,0, 0.4)",
                borderColor: "darkorange",
                borderWidth: 4,

                left: 190,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  top: 35,
                  color: "darkorange",
                  zIndex: 1,
                  fontWeight: "500",
                }}
              >
                Notifications
              </Text>
            </View>
          </TouchableOpacity>
        </Card.Content>
        <View style={{ bottom: 130, left: 40, position: "absolute" }}>
          <CircularProgress
            value={dataplayer.Points}
            valueSuffix={"/50"}
            valueSuffixStyle={{ color: "darkorange", fontSize: 20 }}
            radius={60}
            duration={2000}
            progressValueColor={"#ecf0f1"}
            circleBackgroundColor={"rgba(0,0,0, 0.4)"}
            maxValue={50}
            title={"Points"}
            titleColor={"white"}
            activeStrokeColor={"darkorange"}
            activeStrokeSecondaryColor={"green"}
            titleStyle={{ fontWeight: "bold" }}
          />
        </View>
      </ImageBackground>

      <View
        style={{
          position: "absolute",
          bottom: 10,
          flex: 1,
          alignSelf: "stretch",
          right: 0,
          left: 0,
        }}
      >
        <BottomNavigationBar />
      </View>
    </View>
  );
};

export default Playerprofile;
