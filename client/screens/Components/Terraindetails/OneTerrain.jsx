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
import { baseUrl } from "../../../urlConfig/urlConfig.js";
import { Rating } from "react-native-ratings";
import Icon from "react-native-vector-icons/FontAwesome";

const OneTerrain = ({ navigation, route }) => {
  const [review, setreview] = useState("");
  const [data, setdata] = useState([]);
  const [dataterrain, setdataterrain] = useState([]);
  const [seeReviews, setseeReviews] = useState(false);
  const [dataplayer, setdataplayer] = useState([]);
  const [write, setwrite] = useState(false);
  const [ratingValue, setRatingValue] = useState([]);
  const [average, setAverage] = useState(0);
  const numFilled = Math.floor(average);
  const hasHalf = average % 1 !== 0;
  const numEmpty = 5 - numFilled - (hasHalf ? 1 : 0);

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
  const stars = [];
  for (let i = 0; i < numFilled; i++) {
    stars.push(<Icon key={i} name="star" />);
  }
  if (hasHalf) {
    stars.push(<Icon key={numFilled} name="star-half-o" />);
  }
  for (let i = 0; i < numEmpty; i++) {
    stars.push(<Icon key={numFilled + (hasHalf ? 1 : 0) + i} name="star-o" />);
  }

  const addReview = () => {
    axios.post(`${baseUrl}api/reviews/addreview/${route.params.id}`, {
      idterrain: route.params.id,
      Comments: review,
    });
  };
  const showreview = () => {
    setseeReviews(true);
  };
  useEffect(() => {
    const getAllStars = () => {
      axios
        .get(`${baseUrl}api/reviews/getRating/${route.params.id}`)
        .then((res) => {
          const ratings = res.data;
          const filteredRatings = ratings.filter(
            (rating) => rating.Rating !== null
          );
          const totalRatings = filteredRatings.length;
          const sumRatings = filteredRatings.reduce((acc, rating) => {
            if (rating.Rating > 0) {
              return acc + rating.Rating;
            } else {
              return acc;
            }
          }, 0);
          const averageRating = sumRatings / totalRatings;
          setAverage(averageRating);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getAllStars();
  }, [route.params.id]);
  const addStar = () => {
    axios
      .post(`${baseUrl}api/reviews/stars/Rmt1HlADW2eRc82c7XG5srWLjUQ2/1`, {
        Rating: ratingValue,
      })
      .then((response) => {
        console.log("Review added successfully!");
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
  };
  useEffect(() => {
    axios
      .get(`${baseUrl}api/reviews/getreview/${route.params.id}`)
      .then((response) => {
        const filteredData = response.data.filter(
          (item) => item.Comments !== null
        );
        setdata(filteredData);
      })
      .catch((error) => console.error(error));

    axios
      .get(`${baseUrl}api/terrain/terrains/oneterrains/${route.params.id}`)
      .then((response) => {
        setdataterrain(response.data);
      })
      .catch((error) => console.error(error));
  }, [route.params.id]);

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      carouselRef.current?.snapToNext();
    }, 7000); // Change the time duration here for the slide rotation
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
      <KeyboardAvoidingView behavior="padding">
        <ScrollView style={{ backgroundColor: "black", height: 800 }}>
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
                  left: 10,
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
                  left: 150,
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
                {stars}
              </Text>
            </View>
          </Card>

          <View>
            <Text
              style={{
                color: "white",
                marginVertical: 20,
                marginHorizontal: 10,
                top: -20,
              }}
            >
              {dataterrain.Description}
            </Text>
          </View>
          <View
            pointerEvents="none"
            style={{ top: -20, marginHorizontal: 7.2 }}
          >
            <Mapplayerpic />
          </View>
          <View>
            <TouchableOpacity
              style={{
                top: -170,
                height: 40,

                width: 40,
                backgroundColor: "black",
                borderWidth: 0.5,
                borderRadius: 8,
                alignItems: "center",

                left: 7.2,

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

          {!seeReviews && (
            <View style={{ top: -20 }}>
              <AppointmentScheduler />
            </View>
          )}

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
              top: -40,

              borderBottomColor: "darkorange",
            }}
          >
            <Text style={{ color: "white", fontSize: 15, top: 5 }}>
              {seeReviews ? "Reserve Here" : "Press to see Players Reviews"}
            </Text>
            <Ionicons
              name={seeReviews ? "calendar-outline" : "eye-outline"}
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
                    marginTop: -50,
                    marginHorizontal: 10,
                    borderRadius: 60,
                    backgroundColor: "transparent",
                    borderColor: "darkorange",
                    borderWidth: 2,
                  }}
                >
                  <Avatar.Image
                    size={40}
                    style={{ marginTop: 10, marginLeft: 45 }}
                    source={{ uri: dataplayer.ProfileImage }}
                  />

                  <Text
                    style={{
                      top: -35,
                      marginLeft: 90,
                      fontSize: 20,
                      textTransform: "capitalize",
                      color: "white",
                    }}
                  >
                    {dataplayer.FirstName}
                  </Text>

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
                onPress={() => {
                  setwrite(!write);
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
                  Add Your Own Review
                </Text>
                <Ionicons
                  name="pencil-outline"
                  size={20}
                  color="white"
                  style={{ top: -15, left: 100 }}
                ></Ionicons>
              </TouchableOpacity>
              {write && (
                <View style={{ height: 150 }}>
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
                  <Button
                    style={{ backgroundColor: "orange", borderColor: "white" }}
                    title="Add Review"
                    onPress={addStar}
                  />
                  <Rating
                    type="star"
                    startingValue={0}
                    imageSize={20}
                    onFinishRating={setRatingValue}
                  />
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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
