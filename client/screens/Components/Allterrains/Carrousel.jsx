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

const data = [
  {
    id: "1",
    image:
      "https://fivethirtyeight.com/wp-content/uploads/2022/11/GettyImages-1442587075-e1668806020544.jpg?w=917",
  },
  {
    id: "2",
    image:
      "https://media.istockphoto.com/id/1199894704/photo/african-american-young-boy-playing-soccer-in-a-stadium-pitch-child-running-with-soccer-ball.jpg?s=612x612&w=0&k=20&c=mRKKlAIo7CoWLKcxQGbSaKYO6_VdWxa1NpAtqb4oBT4=",
  },
  {
    id: "3",
    image:
      "https://img.freepik.com/free-vector/flat-design-soccer-player-silhouette-illustration_23-2149483061.jpg?w=2000",
  },
];

const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 300;
const ITEM_SPACING = 20;

const AnimatedTouchable = Animated.createAnimatedComponent(
  TouchableWithoutFeedback
);

const Carrousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const onItemPress = (index) => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + ITEM_SPACING * 2}
        contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
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
              onPress={() => onItemPress(index)}
              style={[
                styles.itemContainer,
                {
                  transform: [{ scale }],
                  opacity,
                  elevation,
                },
                index === currentIndex && styles.selectedItem,
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.itemImage} />
            </AnimatedTouchable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: ITEM_SPACING,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: "#333",
  },
  itemImage: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
});
export default Carrousel;
