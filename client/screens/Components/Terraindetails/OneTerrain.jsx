import React, { useState } from "react";
import { Image } from "react-native";
import { View, TextInput } from "react-native";
import { Surface, Text } from "react-native-paper";
import axios from "axios";
import { Avatar, Button, Card } from "react-native-paper";
const data = [
  {
    img: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
    fullname: "atef mabrouki",
    review: "this terrain sucks ",
  },
  {
    img: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
    fullname: "iheb kedri",
    review: "this terrain still ",
  },
  {
    img: "https://img.favpng.com/18/18/18/computer-icons-icon-design-avatar-png-favpng-X29r5WhWMXVYvNsYXkR4iBgwf.jpg",
    fullname: "ala chaar",
    review: "this terrain good ",
  },
];

const OneTerrain = () => {
  const [review, setreview] = useState("");
  const [allreviews, setallreviews] = useState([]);
  // const addReview = (post) => {
  //   axios
  //     .post(`http://127.0.0.1:3000/api/reviews/add`, {
  //       iduser: 1,
  //       idterrain: 1,
  //       review: review,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };
  // axios.get(`http://127.0.0.1:3000/api/reviews:${"iduser"}`).then((data) => {
  //   console.log(data);
  //   res.json(data);
  // });

  return (
    <View>
      <Text>
        Terrain Title<Text> Rating</Text>
      </Text>

      <Text>Price </Text>

      <Text>Capacity </Text>

      {/* <Image src="https://athletics.rose-hulman.edu/images/2020/8/19/Soccer_Field_Endzone_2020.jpg" />
      <Text>other images</Text>
      <Image
        style={{ minWidth: "20%", maxWidth: "30%" }}
        src="https://athletics.rose-hulman.edu/images/2020/8/19/Soccer_Field_Endzone_2020.jpg"
      />
      <Image
        style={{ minWidth: "20%", maxWidth: "30%" }}
        src="https://athletics.rose-hulman.edu/images/2020/8/19/Soccer_Field_Endzone_2020.jpg"
      />
      <Image
        style={{ minWidth: "20%", maxWidth: "30%" }}
        src="https://athletics.rose-hulman.edu/images/2020/8/19/Soccer_Field_Endzone_2020.jpg"
      /> */}
      <Text> terrain description</Text>
      <Text> reviews here</Text>
      <TextInput
        placeholder="write your review here"
        onChangeText={(e) => {
          console.log(e.target.value);
        }}
      ></TextInput>
      <Button
      // onPress={() => {
      //   console.log(addReview());
      //   addReview;
      // }}
      >
        save
      </Button>
      {data.map((item) => (
        <Card style={{ marginTop: 15 }}>
          <Avatar.Image
            size={45}
            source={item.img}
            style={{ marginBottom: 40 }}
          />
          <Card.Title style={{ marginLeft: 40 }} title={item.fullname} />

          <Card.Content>
            <Text variant="headlineSmall">{item.review}</Text>
          </Card.Content>
        </Card>
      ))}

      <Text>fgvbhj</Text>
    </View>
  );
};

export default OneTerrain;
