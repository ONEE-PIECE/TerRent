import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { ImageBackground, Image } from "react-native";

const MyCarousel = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      carouselRef.current?.snapToNext();
    }, 15000); // Change the time duration here for the slide rotation
    return () => clearInterval(timer);
  }, []);

  const data = [
    {
      image: "https://wallpaperaccess.com/full/3429289.jpg",
    },
    {
      image: "https://tennismash.com/wp-content/uploads/2018/02/Hemer-04.jpg",
    },
    {
      image: "https://wallpaperaccess.com/full/1767835.jpg",
    },
    {
      image:
        "https://i.pinimg.com/originals/63/00/82/63008254d66e382e44b48edd327b0c0a.jpg",
    },
    {
      image: "https://i.ytimg.com/vi/WIaBIVv5FaM/maxresdefault.jpg",
    },
    {
      image:
        "https://i.pinimg.com/originals/52/46/b7/5246b75d3a47356b44f31b239a3824ea.jpg",
    },
    {
      image:
        "https://i.pinimg.com/originals/80/fe/b3/80feb31fa307d46b0233ae358dd01ca3.jpg",
    },
    {
      image:
        "https://www.tiebreaktens.com/wp-content/uploads/2018/01/bigstock-MELBOURNE-JANUARY-Serena-42486436.jpg",
    },
  ];

  const renderData = [...data, ...data.slice(0, 3)]; // add the first 3 images to the end to ensure all images are displayed

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

  return (
    <Carousel
      ref={carouselRef}
      data={renderData}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth}
      loop={true}
      autoplay={true}
      autoplayInterval={9000} // Change the time duration here for the slide rotation
      onSnapToItem={onSnapToItem}
      initialScrollIndex={currentIndex}
      decelerationRate="normal" // Set the decelerationRate prop
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    backgroundColor: "transparent",
    height: "100%",
  },
  image: {
    width: 450,
    height: "100%",
    opacity: 0.9,
  },
});

export default MyCarousel;
