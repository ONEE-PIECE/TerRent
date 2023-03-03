import React from "react";
import { Image, ImageBackground, ScrollView, View } from "react-native";
import Slider from "./Carrousel.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Card } from "react-native-paper";
import Carrousel from "./Carrousel.jsx";
import { Text } from "react-native-paper";
const data = [
  {
    src: "https://cepsum.imgix.net/2021/03/soccer-ligues-exterieur-c.jpg?auto=compress%2Cformat&ixlib=php-3.3.0",
    title: "Ariana Terrain",
    rating: "5",
    capacity: "10",
  },
  {
    src: "https://www.wate.com/wp-content/uploads/sites/42/2022/03/1040x585-2022-0119-best-size-4-soccer-ball-3e953e-1.jpg",
    title: "Mourouj Terrain",
    rating: "4.74 ",
    capacity: "12",
  },
  {
    src: "https://chronicle.brightspotcdn.com/02/35/6569497e16c8d337843b578ff306/1476ca2cb5cf7a03ee92612764413561.jpg",
    title: "Lac Terrain",
    rating: "4.6 ",
    capacity: "10",
  },
  {
    src: "https://wwwcache.highschoolot.com/asset/content/womens_soccer/2018/03/01/17381690/football-1396740-DMID1-5dy9namhq-640x360.jpg",
    title: "Tunis Terrain",
    rating: "4.4 ",
    capacity: "14",
  },
  {
    src: "https://www.thamescentre.on.ca/sites/default/files/styles/twitter_large_image/public/images/2019-06/xxxx_spo_ocr-l-soccer-generic-stock-001-5.jpg?h=c00a0a28&itok=QWANWQQ8",
    title: "Sousse Terrain",
    rating: "3.9 ",
    capacity: "10",
  },
];
const Allterrains = ({ navigation }) => {
  return (
    <ScrollView>
      <Text>fcvgbhjk</Text>
      <Image
        style={{ width: "100%" }}
        source={{
          uri: "https://www.thamescentre.on.ca/sites/default/files/styles/twitter_large_image/public/images/2019-06/xxxx_spo_ocr-l-soccer-generic-stock-001-5.jpg?h=c00a0a28&itok=QWANWQQ8",
        }}
      ></Image>
      <Carrousel />
      {data.map((item) => (
        <Card
          style={{
            paddingBottom: 10,
            paddingHorizontal: 10,
            shadowColor: "transparent",
          }}
          onPress={() => {
            navigation.navigate("carousel");
          }}
        >
          <View style={{ opacity: 0.9 }}>
            <Card.Cover
              source={{
                uri: item.src,
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
            {item.title}
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
            {item.capacity} Player
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
            {item.rating} Stars
          </Text>
        </Card>
      ))}
    </ScrollView>
  );
};

export default Allterrains;
