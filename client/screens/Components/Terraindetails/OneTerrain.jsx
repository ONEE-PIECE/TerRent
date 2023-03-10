import React, { useEffect, useState } from "react";
import { Image, ScrollView } from "react-native";
import { View, TextInput } from "react-native";
import { Surface, Text } from "react-native-paper";
import axios from "axios";
import { Avatar, Button, Card } from "react-native-paper";
import AppointmentScheduler from "../../calander.jsx";
import Mapplayer from "../../../MAP/Mapplayer .jsx";

const OneTerrain = ({ navigation, route }) => {
  const [review, setreview] = useState("");
  const [data, setdata] = useState([]);
  const [dataterrain, setdataterrain] = useState([]);
  const addReview = () => {
    axios.post(
      `http://192.168.101.8:3000/api/reviews/addreview/${route.params.id}`,
      {
        idterrain: route.params.id,
        Comments: review,
      }
    );
  };
  useEffect(() => {
    axios
      .get(`http://192.168.101.8:3000/api/reviews/getreview/${route.params.id}`)
      .then((response) => {
        console.log(route.params);
        axios
          .get(
            `http://192.168.101.8:3000/api/terrain/terrains/atefIYED/${route.params.id}`
          )
          .then((response2) => {
            console.log(response.data, "mehdi");
            setdata(response.data);
            setdataterrain(response2.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ScrollView>
      <Card style={{ marginTop: 0, marginBottom: 3 }}>
        <Card.Title
          style={{ marginTop: 0, marginLeft: 5 }}
          //   title={route.params.Name}
        />

        <Card.Content>
          <Text
            style={{ marginLeft: 20, fontSize: 20 }}
            variant="headlineSmall"
          >
            {item.Comments}
          </Text>
        </Card.Content>
      </Card>
      <Text>
        Terrain Title<Text> {data[0] ? data[0].Rating : "loading"}</Text>
      </Text>

      <Text>{dataterrain.Price} </Text>

      <Text>{dataterrain.Capacity} </Text>

      <Image
        source={{
          uri: "https://athletics.rose-hulman.edu/images/2020/8/19/Soccer_Field_Endzone_2020.jpg",
        }}
      />
      <Text>other images</Text>
      <Card>
        <Card.Cover
          style={{ minWidth: 20, maxWidth: 30 }}
          source={{ uri: item.img1 }}
        />
      </Card>
      <Text> {dataterrain.Description}</Text>
      <Text> Terrain reviews here</Text>
      <TextInput onChangeText={(text) => console.log(text)} />

      <Button
        onPress={() => {
          setreview(addReview());
          addReview;
        }}
      >
        save
      </Button>
      {data.map((item) => (
        <Card style={{ marginTop: 15, marginBottom: 3 }}>
          <Avatar.Image
            size={40}
            style={{ marginTop: 10, marginLeft: 8 }}
            source={{ uri: item.img }}
          />
          <Card.Title
            style={{ marginTop: -40, marginLeft: 40 }}
            title={"player name"}
          />

          <Card.Content>
            <Text
              style={{ marginLeft: 20, fontSize: 20 }}
              variant="headlineSmall"
            >
              {item.Comments}
            </Text>
          </Card.Content>
        </Card>
      ))}
      <Mapplayer />
      <AppointmentScheduler />
    </ScrollView>
  );
};

export default OneTerrain;
