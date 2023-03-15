import { Image, ImageBackground, ScrollView } from "react-native";

import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Alert } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Dimensions } from "react-native";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { NetworkInfo } from "react-native-network-info";
import config from "../../../config";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
const ITEM_WIDTH = 340;
const ITEM_HEIGHT = 300;
const ITEM_SPACING = 50;

const AnimatedTouchable = Animated.createAnimatedComponent(
  TouchableWithoutFeedback
);
import HorizontalPicker from "@vseslav/react-native-horizontal-picker";
import { TouchableOpacity } from "react-native";
import BottomNavigationBar from "../Bottomnav/BottomNav";
import { baseUrl } from "../../../urlConfig/urlConfig";
const Items = ["ariana", "tunis", "Ben Arous", "fouchana", "mourouj"];
// const IPV4Address = NetworkInfo.getIPV4Address()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => console.log(error));

const Allterrains = ({ navigation, route }) => {
  const [data, setdata] = useState([]);
  const [dataregion, setdataregion] = useState([]);
  const rednerItem = (region, index) => (
    <View style={{ width: 150, left: 40 }}>
      <TouchableOpacity
        onPress={() => {
          handleregion(region);
        }}
        style={{ borderColor: "black" }}
      >
        <Text
          style={{
            color: "darkorange",
            fontStyle: "italic",
            letterSpacing: 3,
            fontWeight: "700",
            textTransform: "capitalize",
          }}
        >
          {region}
        </Text>
      </TouchableOpacity>
    </View>
  );
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    axios
      .get(`${baseUrl}api/terrain/terrains/category/${route.params.Category}`)
      .then((response) => {
        if (response.data.length === 0) {
          alert("no data");
        } else {
          setdata(response.data);
        }
        handleregion(response.data);
      })

      .catch((error) => console.log(error));
  }, []);
  const handleregion = (region) => {
    axios
      .get(`${baseUrl}api/terrain/terrains/region/${region}`)
      .then((res) => {
        console.log("fghjk", res);
        setdataregion(res.data);
      })
      .catch((error) => console.log(error));
  };
  const SCREEN_WIDTH = Dimensions.get("window").width;

  return (
    <ScrollView style={{ backgroundColor: "black", height: "100%" }}>
      <HorizontalPicker
        data={Items}
        renderItem={rednerItem}
        snapToInterval={40}
        itemWidth={100}
      />
      <Card style={{ backgroundColor: "black", marginBottom: 0 }}>
        <Card.Cover
          source={{
            uri: route.params.imgg,
          }}
          style={{
            width: 420,
            height: 200,
            marginBottom: 10,
          }}
        />
        <Text
          style={{
            position: "absolute",
            top: 0,
            left: -12,
            right: 0,
            bottom: 10,
            justifyContent: "center",
            alignItems: "center",

            color: "white",
            fontSize: 25,
            paddingLeft: 20,
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
          }}
        ></Text>
      </Card>

      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
          marginLeft: 10,
          color: "darkorange",
          textAlign: "center",
        }}
      >
        Most Rated Soccer Fields
      </Text>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={355}
          contentContainerStyle={{
            paddingLeft: 5,
            paddingRight: -30,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * (ITEM_WIDTH + ITEM_SPACING * 2),
              index * (ITEM_WIDTH + ITEM_SPACING * 2),
              (index + 1) * (ITEM_WIDTH + ITEM_SPACING * 2),
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1, 1],
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1, 1],
            });

            const elevation = scrollX.interpolate({
              inputRange,
              outputRange: [10, 10, 10],
            });

            return (
              <AnimatedTouchable
                style={[
                  styles.itemContainer,

                  index === currentIndex && styles.selectedItem,
                ]}
              >
                <Card
                  style={{
                    paddingBottom: 10,
                    paddingRight: 20,
                    paddingLeft: 0,
                    shadowColor: "transparent",
                    backgroundColor: "transparent",
                  }}
                  onPress={() => {
                    navigation.navigate("oneterrain", { id: item.id });
                  }}
                >
                  <View style={{ opacity: 0.9 }}>
                    <ImageBackground
                      borderRadius={10}
                      style={styles.itemImage}
                      source={{
                        uri: item.Img1,
                      }}
                    >
                      <View
                        style={{ flex: 1, backgroundColor: "rgba(0,0,0, 0.4)" }}
                      />
                    </ImageBackground>
                  </View>
                  <Text
                    style={{
                      position: "absolute",
                      top: 120,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "white",
                      fontSize: 20,
                      paddingLeft: 20,
                      borderBottomLeftRadius: 14,
                      borderBottomRightRadius: 14,
                      textTransform: "capitalize",
                      fontWeight: "600",
                    }}
                  >
                    {item.Name}
                  </Text>

                  <Text style={{ color: "white", left: 250, top: -40 }}>
                    {item.Rating}
                    <Ionicons name="star-sharp" size={20}></Ionicons>
                  </Text>
                </Card>
              </AnimatedTouchable>
            );
          }}
        />
      </View>

      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
          marginLeft: 10,
          top: -25,
          color: "darkorange",
          textAlign: "center",
        }}
      >
        All Terrains
      </Text>
      {dataregion.length !== 0
        ? dataregion.map((it) => (
            <Card
              style={{
                paddingHorizontal: 10,
                shadowColor: "transparent",
                backgroundColor: "transparent",
                marginVertical: 10,
                top: -40,
              }}
              onPress={(e) => {
                navigation.navigate("oneterrain", { id: it.id });
              }}
            >
              <ImageBackground
                borderRadius={10}
                style={{ width: "100%", height: 150 }}
                source={{
                  uri: it.Img1,
                }}
              >
                <View
                  style={{ flex: 1, backgroundColor: "rgba(0,0,0, 0.4)" }}
                />
              </ImageBackground>

              <Text
                style={{
                  position: "absolute",
                  top: 10,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",

                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                  paddingLeft: 20,

                  backgroundColor: "transparent",
                  opacity: 0.9,
                  textTransform: "capitalize",
                }}
              >
                {it.Name}
              </Text>

              <Text
                style={{
                  position: "absolute",
                  top: 40,
                  left: 50,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Ready for : {it.Capacity} Player
              </Text>
              <Text
                style={{
                  position: "absolute",
                  top: 100,
                  left: 150,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  paddingLeft: 70,
                }}
              >
                Average Rating of {it.Rating}
                <Ionicons name="star-sharp" size={20}></Ionicons>
              </Text>
            </Card>
          ))
        : data.map((item) => (
            <Card
              style={{
                paddingHorizontal: 10,
                shadowColor: "transparent",
                backgroundColor: "transparent",
                marginVertical: 10,
                top: -40,
              }}
              onPress={(e) => {
                navigation.navigate("oneterrain", { id: item.id });
              }}
            >
              <ImageBackground
                borderRadius={10}
                style={{ width: "100%", height: 150 }}
                source={{
                  uri: item.Img1,
                }}
              >
                <View
                  style={{ flex: 1, backgroundColor: "rgba(0,0,0, 0.4)" }}
                />
              </ImageBackground>

              <Text
                style={{
                  position: "absolute",
                  top: 10,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",

                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                  paddingLeft: 20,

                  backgroundColor: "transparent",
                  opacity: 0.9,
                  textTransform: "capitalize",
                }}
              >
                {dataregion.length !== 0 ? it.Name : item.Name}
              </Text>

              <Text
                style={{
                  position: "absolute",
                  top: 40,
                  left: 50,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Ready for : {item.Capacity} Player
              </Text>
              <Text
                style={{
                  position: "absolute",
                  top: 100,
                  left: 150,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  paddingLeft: 70,
                }}
              >
                Average Rating of {item.Rating}
                <Ionicons name="star-sharp" size={20}></Ionicons>
              </Text>
            </Card>
          ))}
      {/* <BottomNavigationBar /> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: ITEM_SPACING,
  },

  itemImage: {
    width: 340,
    height: 180,
  },
  container: {
    width: "100%",
    height: "100%",
  },
});

export default Allterrains;
