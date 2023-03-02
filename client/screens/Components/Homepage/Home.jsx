import React from "react";
import { ImageBackground, View } from "react-native";
import { Text, StyleSheet, TextInput } from "react-native";
import { ScrollView } from "react-native";
import { Avatar, Button, Card, Surface } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <Card
        style={{
          paddingBottom: 10,
          paddingHorizontal: 10,

          shadowColor: "transparent",
        }}
        onPress={() => {
          navigation.navigate("Allterrains");
        }}
      >
        <View style={{ opacity: 0.9 }}>
          <Card.Cover
            source={{
              uri: "https://www.wondriumdaily.com/wp-content/uploads/2022/11/11-30-22-Feature-1024x555.jpg",
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
          Soccer
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
          Check all Soccer Fields
        </Text>
      </Card>

      <Card
        style={{
          paddingBottom: 10,
          paddingHorizontal: 10,
          shadowColor: "transparent",
        }}
        onPress={() => {
          navigation.navigate("Allterrains");
        }}
      >
        <View style={{ opacity: 0.9 }}>
          <Card.Cover
            source={{
              uri: "https://blog.nasm.org/hubfs/Training%20Basketball%20Players-1.jpg",
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
          BasketBall
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
          Check all BasketBall courts
        </Text>
      </Card>
      <Card
        style={{
          paddingBottom: 10,
          paddingHorizontal: 10,
          shadowColor: "transparent",
        }}
        onPress={() => {
          navigation.navigate("Allterrains");
        }}
      >
        <View style={{ opacity: 0.9 }}>
          <Card.Cover
            source={{
              uri: "https://triptale.net/wp-content/uploads/2020/06/ball_skopje_handball.jpg",
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
          HandBall
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
          Check all Handball terrains
        </Text>
      </Card>
      <Card
        style={{
          paddingBottom: 10,
          paddingHorizontal: 10,
          shadowColor: "transparent",
        }}
        onPress={() => {
          navigation.navigate("Allterrains");
        }}
      >
        <View style={{ opacity: 0.9 }}>
          <Card.Cover
            source={{
              uri: "https://reviewed-com-res.cloudinary.com/image/fetch/s--UJ2sGByA--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_972/https://reviewed-production.s3.amazonaws.com/1597356287543/GettyImages-1171084311.jpg",
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
          Tennis
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
          Check all tennis Courts
        </Text>
      </Card>

      <Card
        style={{
          paddingBottom: 10,
          paddingHorizontal: 10,
          shadowColor: "transparent",
        }}
        onPress={() => {
          navigation.navigate();
        }}
      >
        <View style={{ opacity: 0.9 }}>
          <Card.Cover
            source={{
              uri: "https://paintballsports.co.uk/wp-content/uploads/2022/04/FF0924_2015_2_Bundesliga_Spieltag1-2-19.jpg",
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
            overflow: "hidden",
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
          PaintBall
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
          Check all Paintball fields
        </Text>
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

export default Home;
