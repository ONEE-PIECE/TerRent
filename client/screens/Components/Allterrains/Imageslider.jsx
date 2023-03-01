import * as React from "react";

import {
  Avatar,
  Button,
  Card,
  Text,
  Surface,
  Divider,
} from "react-native-paper";
import axios from "axios";
import { ImageBackground, View } from "react-native";
import { Image } from "react-native-web";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
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

const Slider = () => {
  axios
    .get(`http://127.0.0.1:3000/api/terrains:${"categorie"}`)
    .then((data) => res.json(data))
    .catch((err) => next(err));

  return (
    <View>
      <Surface
        style={{
          marginLeft: "10",

          display: "flex",
          gap: 1,
          paddingTop: 1,
          paddingBottom: 1,
          borderColor: "transparent",
          overflow: "auto",
          width: "94%",
          scrollSnapType: "x mandatory",
          "& > *": {
            scrollSnapAlign: "center",
          },
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        {data.map((item) => (
          <Card
            orientation="horizontal"
            key={item.title}
            variant="outlined"
            style={{
              gap: 2,
              "--Card-padding": (theme) => theme.spacing(70),
            }}
          >
            <Card.Cover
              source={{
                uri: "https://cepsum.imgix.net/2021/03/soccer-ligues-exterieur-c.jpg?auto=compress%2Cformat&ixlib=php-3.3.0",
              }}
            />
            <Card.Cover
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200, linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300",
              }}
            />
            <Card.Content style={{ justifyContent: "flex-end" }}>
              <Text level="h2" fontSize="lg" textColor="#fff" mb={1}>
                {item.title}
              </Text>
              <Text
                // startDecorator={<StarOutlineIcon />}
                textColor="neutral.300"
              >
                {item.rating}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </Surface>
      <Text fontSize={25} fontFamily={"monospace"}>
        All Soccer Fields
      </Text>
      <Surface
        variant="outlined"
        style={{
          ml: 5,
          mr: 5,
          minWidth: 100,
          display: flex,
          flexDirection: column,
          gap: 1,
          width: 300,
          borderRadius: 20,
          borderColor: "transparent",
        }}
      >
        <ul
          style={{
            paddingTop: "var(--List-divider-gap)",
            paddingBottom: "var(--List-divider-gap)",
          }}
        >
          {data.map((item, index) => (
            <React.Fragment key={item.title}>
              <li>
                <Card style={{ minHeight: 150, minWidth: "90%" }}>
                  <Card.Cover>
                    <ImageBackground source={item.src}>
                      // Your view content goes here
                    </ImageBackground>
                  </Card.Cover>
                  <Card.Cover
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200, linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300",
                    }}
                  />
                  <Card.Content style={{ justifyContent: "flex-end" }}>
                    <Text level="h2" fontSize="lg" textColor="#fff" mb={1}>
                      {item.title}
                    </Text>
                    <Text
                      // startDecorator={}
                      textColor="neutral.300"
                    >
                      {item.capacity}
                    </Text>
                  </Card.Content>
                </Card>
              </li>
              {index !== data.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </ul>
      </Surface>
    </View>
  );
};
export default Slider;
