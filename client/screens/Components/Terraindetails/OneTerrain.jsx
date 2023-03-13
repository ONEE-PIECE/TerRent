import React, { useEffect, useState, useRef } from "react";
import { Animated } from "react-native";
import { Image, ScrollView } from "react-native";
import { View, TextInput } from "react-native";
import { Surface, Text } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import { Avatar, Button, Card } from "react-native-paper";
import AppointmentScheduler from "../../calander.jsx";
import Mapplayerpic from "../../../MAP/Mapplayerpic.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import config from "../../../config.js";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { Root } from "popup-ui";
import { KeyboardAvoidingView } from "react-native";

const OneTerrain = ({ navigation, route }) => {
  const [review, setreview] = useState("");
  const [data, setdata] = useState([]);
  const [dataterrain, setdataterrain] = useState([]);
  const [seeReviews, setseeReviews] = useState(false);
  const dataimage = [
    {
      image: dataterrain.Img1,
    },
    {
      image: dataterrain.Img2,
    },
    {
      image: dataterrain.Img3,
    },
    {
      image: dataterrain.Img1,
    },
  ];
  const addReview = () => {
    axios.post(
      `http://192.168.101.8:3000/api/reviews/addreview/${route.params.id}`,
      {
        idterrain: route.params.id,
        Comments: review,
      }
    );
  };
  const showreview = () => {
    setseeReviews(true);
  };
  useEffect(() => {
    console.log("ssssssssssssssss", route.params.id);
    axios
      .get(`http://192.168.101.8:3000/api/reviews/getreview/${route.params.id}`)
      .then((response) => {
        axios
          .get(
            `http://192.168.101.8:3000/api/terrain/terrains/oneterrains/${route.params.id}`
          )
          .then((response2) => {
            setdata(response.data);
            setdataterrain(response2.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      carouselRef.current?.snapToNext();
    }, 10000); // Change the time duration here for the slide rotation
    return () => clearInterval(timer);
  }, []);
  const renderData = [...dataimage, ...data.slice(0, 3)]; // add the first 3 images to the end to ensure all images are displayed

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item.image }} style={styles.image}></Image>
      </View>
    );
  };

  const { width: screenWidth } = Dimensions.get("window");

  const onSnapToItem = (index) => {
    setCurrentIndex(index);
  };
  const isReviewEmpty = review.trim().length === 0;
  return (
    <Root>
      <ScrollView style={{ backgroundColor: "black" }}>
        <Card
          style={{
            marginTop: 0,

            marginBottom: 40,
            backgroundColor: "black",
          }}
        >
          <Carousel
            ref={carouselRef}
            data={renderData}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            loop={true}
            autoplay={true}
            autoplayInterval={7000} // Change the time duration here for the slide rotation
            onSnapToItem={onSnapToItem}
            initialScrollIndex={currentIndex}
            decelerationRate="normal" // Set the decelerationRate prop
          />
          <View
            style={{
              borderWidth: 1,
              borderBottomColor: "darkorange",
              paddingBottom: 10,
            }}
          >
            <Text
              style={{
                color: "darkorange",
                position: "absolute",
                top: 10,
                fontSize: 20,
                left: 20,
                textTransform: "capitalize",
              }}
            >
              {dataterrain.Name}
            </Text>

            <Text
              style={{
                color: "darkorange",
                position: "absolute",
                top: 15,
                left: 295,
              }}
            >
              Price : {dataterrain.Price}
            </Text>
            <Text
              style={{
                color: "darkorange",
                position: "absolute",
                top: 15,
                left: 130,
                fontSize: 15,
              }}
            >
              {dataterrain.Capacity}
              <Ionicons
                name="ios-people"
                size={15}
                color="darkorange"
              ></Ionicons>
            </Text>

            <Text
              style={{
                marginLeft: 220,
                fontSize: 15,
                color: "darkorange",
                top: 10,
              }}
              variant="headlineSmall"
            >
              {data[0] ? data[0].Rating : "loading"}
              <Ionicons
                name="star-outline"
                size={15}
                color="darkorange"
              ></Ionicons>
            </Text>
          </View>
        </Card>

        <View>
          <Text
            style={{ color: "white", marginVertical: 20, marginHorizontal: 10 }}
          >
            {dataterrain.Description}
          </Text>
        </View>
        <View pointerEvents="none">
          <Mapplayerpic />
        </View>
        <View>
          <TouchableOpacity
            style={{
              top: -150,
              height: 40,
              width: 40,
              backgroundColor: "black",
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",

              left: 0,

              position: "absolute",
              borderColor: "darkorange",
            }}
            onPress={() => {
              navigation.navigate("Mapplayer");
            }}
          >
            <Text style={{ color: "darkorange", marginTop: 7 }}>
              <Ionicons name="compass-outline" size={20}></Ionicons>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={true}
          style={{
            backgroundColor: "black",
            borderWidth: 0.5,

            alignItems: "center",
            marginVertical: 10,
            left: 0,

            borderBottomColor: "darkorange",
          }}
        >
          <Text style={{ color: "white", fontSize: 15, top: 5 }}>
            Reserve Here
          </Text>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="white"
            style={{ left: 70, top: -15 }}
          ></Ionicons>
        </TouchableOpacity>
        <AppointmentScheduler />

        <TouchableOpacity
          onPress={(e) => {
            showreview();
            setseeReviews(!seeReviews);
          }}
          style={{
            backgroundColor: "black",
            borderWidth: 0.5,

            alignItems: "center",
            marginVertical: 20,
            left: 0,

            borderBottomColor: "darkorange",
          }}
        >
          <Text style={{ color: "white", fontSize: 15, top: 5 }}>
            Press to see Players Reviews
          </Text>
          <Ionicons
            name="eye-outline"
            size={20}
            color="white"
            style={{ top: -15, left: 120 }}
          ></Ionicons>
        </TouchableOpacity>
        {seeReviews && (
          <View>
            {data.map((item) => (
              <Card
                style={{
                  marginTop: 15,
                  marginBottom: 3,

                  backgroundColor: "white",
                  borderColor: "darkorange",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Avatar.Image
                  size={40}
                  style={{ marginTop: 10, marginLeft: 8 }}
                  source={{ uri: item.Img1 }}
                />
                <Card.Title
                  style={{ marginTop: -40, marginLeft: 40 }}
                  title={item.FirstName}
                />

                <Card.Content>
                  <Text
                    style={{ marginLeft: 20, fontSize: 20, color: "white" }}
                    variant="headlineSmall"
                  >
                    {item.Comments}
                  </Text>
                </Card.Content>
              </Card>
            ))}
            <TouchableOpacity
              disabled={true}
              style={{
                backgroundColor: "black",
                borderWidth: 0.5,

                alignItems: "center",
                marginVertical: 20,
                left: 0,

                borderBottomColor: "darkorange",
              }}
            >
              <Text style={{ color: "white", fontSize: 15, top: 5 }}>
                Add Your Own Review
              </Text>
              <Ionicons
                name="pencil-outline"
                size={20}
                color="white"
                style={{ top: -15, left: 100 }}
              ></Ionicons>
            </TouchableOpacity>

            <TextInput
              placeholder={"Write your review here"}
              value={review}
              style={{
                textTransform: "capitalize",
                textAlign: "center",
                color: "darkorange",
                fontSize: 15,
              }}
              placeholderTextColor="lightgrey"
              onChangeText={(text) => setreview(text)}
            />
            <KeyboardAvoidingView behavior="position">
              <Button
                onPress={() => {
                  setreview(addReview());
                  addReview;
                }}
                textColor="darkorange"
                style={{ opacity: isReviewEmpty ? 0.5 : 1 }}
              >
                Post
              </Button>
            </KeyboardAvoidingView>
          </View>
        )}
      </ScrollView>
    </Root>
  );
};
const styles = StyleSheet.create({
  slide: {
    backgroundColor: "transparent",
    height: 170,
  },
  image: {
    width: 430,
    height: 170,
    opacity: 0.9,
  },
});
export default OneTerrain;
