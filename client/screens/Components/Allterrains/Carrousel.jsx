import React, { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Card } from "react-native-paper";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const data = [
  {
    id: "mourouj terrain",
    rating: "5 Stars",
    image:
      "https://fivethirtyeight.com/wp-content/uploads/2022/11/GettyImages-1442587075-e1668806020544.jpg?w=917",
  },
  {
    id: "ariana terrain ",
    rating: "4.2 Stars",
    image:
      "https://media.istockphoto.com/id/1199894704/photo/african-american-young-boy-playing-soccer-in-a-stadium-pitch-child-running-with-soccer-ball.jpg?s=612x612&w=0&k=20&c=mRKKlAIo7CoWLKcxQGbSaKYO6_VdWxa1NpAtqb4oBT4=",
  },
  {
    id: "zahra terrain ",
    rating: "3.9 Stars",
    image:
      "https://img.freepik.com/free-vector/flat-design-soccer-player-silhouette-illustration_23-2149483061.jpg?w=2000",
  },
];

const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 300;
const ITEM_SPACING = 30;

const AnimatedTouchable = Animated.createAnimatedComponent(
  TouchableWithoutFeedback
);

const Carrousel = () => {
  const navigation = useNavigation();

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={408}
        contentContainerStyle={{
          paddingLeft: 10,
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
            outputRange: [0.8, 1, 0.8],
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
          });

          const elevation = scrollX.interpolate({
            inputRange,
            outputRange: [0, 10, 0],
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
                  shadowColor: "white",
                }}
                onPress={() => {
                  navigation.navigate("oneterrain");
                }}
              >
                <View style={{ opacity: 0.9 }}>
                  <Card.Cover
                    style={styles.itemImage}
                    source={{
                      uri: item.image,
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
                  {item.id}
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
                  {item.rating}
                </Text>
              </Card>
            </AnimatedTouchable>
          );
        }}
      />
    </View>
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
    width: 390,
    height: 180,
  },
});
export default Carrousel;
