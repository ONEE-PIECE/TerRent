import React from "react";
import { ImageBackground, View } from "react-native";
import { Text, StyleSheet, TextInput } from "react-native";
import { ScrollView } from "react-native";
import { Avatar, Button, Card, Surface } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Home = ({ navigation: { navigate } }) => {
  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <Card
        style={{
          paddingBottom: 10,
          paddingHorizontal: 10,
          backgroundColor: "black",
          shadowColor: "transparent",
          backgroundColor: "black",
        }}
        onPress={() => {
          navigate("Allterrains", {
            Category: "foot",
            imgg: "https://i.pinimg.com/originals/e3/30/7e/e3307ee202d6b7defb08c64fc00ff41b.jpg",
          });
        }}
      >
        <View style={{ opacity: 0.9 }}>
          <Card.Cover
            source={{
              uri: "https://i.pinimg.com/originals/e3/30/7e/e3307ee202d6b7defb08c64fc00ff41b.jpg",
            }}
          />
        </View>
        <Text
          style={{
            position: "absolute",
            top: 10,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",

            color: "orange",
            fontSize: 25,
            paddingLeft: 20,
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
          }}
        >
          Soccer
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 50,
            left: 30,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          Check all Soccer Fields
        </Text>
      </Card>

      <Card
        style={{
          paddingBottom: 10,
          paddingHorizontal: 10,
          shadowColor: "transparent",
          backgroundColor: "black",
        }}
        onPress={() => {
          navigate("Allterrains", {
            Category: "basket",
            imgg: "https://w0.peakpx.com/wallpaper/737/886/HD-wallpaper-basketball-black-pure.jpg",
          });
        }}
      >
        <View style={{ opacity: 0.9 }}>
          <Card.Cover
            source={{
              uri: "https://w0.peakpx.com/wallpaper/737/886/HD-wallpaper-basketball-black-pure.jpg",
            }}
          />
        </View>
        <Text
          style={{
            position: "absolute",
            top: 10,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",

            color: "orange",
            fontSize: 25,
            paddingLeft: 20,
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
          }}
        >
          BasketBall
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 50,
            left: 30,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          Check all BasketBall courts
        </Text>
      </Card>
      <Card
        style={{
          paddingBottom: 10,
          paddingHorizontal: 10,
          shadowColor: "transparent",
          backgroundColor: "black",
        }}
        onPress={() => {
          navigate("Allterrains", {
            Category: "hand",
            imgg: "https://www.sg-as.com/assets/default/ebd04b0d-8c3b-4f7a-a134-785db0a5f232/JyskArena7.jpg",
          });
        }}
      >
        <View style={{ opacity: 0.9 }}>
          <Card.Cover
            source={{
              uri: "https://www.sg-as.com/assets/default/ebd04b0d-8c3b-4f7a-a134-785db0a5f232/JyskArena7.jpg",
            }}
          />
        </View>
        <Text
          style={{
            position: "absolute",
            top: 10,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",

            color: "orange",
            fontSize: 25,
            paddingLeft: 20,
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
          }}
        >
          HandBall
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 50,
            left: 30,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          Check all Handball terrains
        </Text>
      </Card>
      <Card
        style={{
          paddingBottom: 10,
          paddingHorizontal: 10,
          shadowColor: "transparent",
          backgroundColor: "black",
        }}
        onPress={() => {
          navigate("Allterrains", {
            Category: "tennis",
            imgg: "https://imageio.forbes.com/specials-images/imageserve/613f73621f830bcc3318fe25/Laver-Cup-2021-Boston/960x0.jpg?height=463&width=711&fit=bounds",
          });
        }}
      >
        <View style={{ opacity: 0.9 }}>
          <Card.Cover
            source={{
              uri: "https://imageio.forbes.com/specials-images/imageserve/613f73621f830bcc3318fe25/Laver-Cup-2021-Boston/960x0.jpg?height=463&width=711&fit=bounds",
            }}
          />
        </View>
        <Text
          style={{
            position: "absolute",
            top: 10,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",

            color: "orange",

            fontSize: 25,
            paddingLeft: 20,
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
          }}
        >
          Tennis
        </Text>
        <Text
          style={{
            position: "absolute",
            top: 50,
            left: 30,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          Check all tennis Courts
        </Text>
      </Card>

      <Card
        style={{
          paddingBottom: 10,
          paddingHorizontal: 10,
          shadowColor: "transparent",
          backgroundColor: "black",
        }}
        onPress={() => {
          navigate("Allterrains", {
            Category: "paintball",
            imgg: "https://st3.depositphotos.com/1000689/16148/i/450/depositphotos_161489420-stock-photo-heavily-armed-masked-soldier-isolated.jpg",
          });
        }}
      >
        <View style={{ opacity: 0.9 }}>
          <Card.Cover
            source={{
              uri: "https://st3.depositphotos.com/1000689/16148/i/450/depositphotos_161489420-stock-photo-heavily-armed-masked-soldier-isolated.jpg",
            }}
          />
        </View>
        <Text
          style={{
            position: "absolute",
            top: 10,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",

            color: "orange",
            fontSize: 25,
            paddingLeft: 20,
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
          }}
        >
          PaintBall
        </Text>

        <Text
          style={{
            position: "absolute",
            top: 50,
            left: 30,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          Check all Paintball fields
        </Text>
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

export default Home;
