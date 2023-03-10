import { Image, ImageBackground, ScrollView } from "react-native";

import { Card } from "react-native-paper";

import axios from "axios";
import { Alert } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ITEM_WIDTH = 340;
const ITEM_HEIGHT = 300;
const ITEM_SPACING = 10;

const AnimatedTouchable = Animated.createAnimatedComponent(
  TouchableWithoutFeedback
);

const Allterrains = ({ navigation, route }) => {
  const [data, setdata] = useState([]);

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    axios
      .get(
        `http://192.168.101.8:3000/api/terrain/terrains/category/${route.params.Category}`
      )
      .then((response) => {
        if (response.data.length === 0) {
          alert("no data");
        } else {
          setdata(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <Card style={{ backgroundColor: "black", borderRadius: 0 }}>
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

            color: "black",
            fontSize: 25,
            paddingLeft: 20,
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
          }}
        >
          Soccer For All
        </Text>
      </Card>

      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
          marginLeft: 10,
          color: "orange",
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
                    shadowColor: "black",
                    backgroundColor: "black",
                  }}
                  onPress={() => {
                    navigation.navigate("oneterrain");
                  }}
                >
                  <View style={{ opacity: 0.9 }}>
                    <Card.Cover
                      style={styles.itemImage}
                      source={{
                        uri: item.img1,
                      }}
                    />
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
                    }}
                  >
                    {item.Name}
                  </Text>

                  <Text
                    style={{
                      position: "absolute",
                      top: 145,
                      left: 270,
                      right: 0,
                      bottom: 0,
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    {item.Rating}
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
          color: "orange",
        }}
      >
        All Terrains
      </Text>
      {data.map((item) => (
        <Card
          style={{
            paddingBottom: 10,
            paddingHorizontal: 10,
            shadowColor: "transparent",
            backgroundColor: "black",
          }}
          onPress={(e) => {
            navigation.navigate("oneterrain", { id: item.id });
          }}
        >
          <View style={{ opacity: 0.9 }}>
            {console.log(item)}
            <Card.Cover
              source={{
                uri: item.img1,
              }}
            />
          </View>
          <Text
            style={{
              position: "absolute",
              top: 140,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              fontSize: 25,
              paddingLeft: 20,
              borderBottomLeftRadius: 14,
              borderBottomRightRadius: 14,
            }}
          >
            {item.Name}
          </Text>

          <Text
            style={{
              position: "absolute",
              top: 170,
              left: 50,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            {item.Capacity} Player
          </Text>
          <Text
            style={{
              position: "absolute",
              top: 170,
              left: 270,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            {item.Rating} Stars
          </Text>
        </Card>
      ))}
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
});

export default Allterrains;
