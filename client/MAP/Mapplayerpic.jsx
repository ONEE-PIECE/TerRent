import React, { useEffect, useState } from "react";
import MapView, {
  Circle,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { TouchableOpacity, StyleSheet, View, Text, Button } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import Confirmation from "./Confirmation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GOOGLE_MAPS_KEY } from "@env";
import { NavigationContainer } from "@react-navigation/native";

const Mapplayerpic = ({ navigation: navigate }) => {
  const [tunis, settunis] = useState({
    latitude: 36.80638936,
    longitude: 10.181667,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [regin, setregin] = useState({
    latitude: 36.8941559,
    longitude: 10.1870625,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={{ marginTop: 33, flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 36.8941559,
          longitude: 10.1870625,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          console.log("onUserLocationChange", e.nativeEvent.coordinate);
          setregin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        {/* this for the current location */}

        <Marker
          coordinate={{
            latitude: regin.latitude,
            longitude: regin.longitude,
          }}
          draggable={true}
          title={"here "}
          description={"this is me "}
          onDragStart={(e) => {
            console.log("drag start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            console.log("drag end", e.nativeEvent.coordinate);
            setregin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        ></Marker>

        <Circle center={regin} radius={100} />

        <MapViewDirections
          origin={regin}
          destination={tunis}
          apikey={GOOGLE_MAPS_KEY}
          strokeWidth={5}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: 400,
    height: 150,
    backgroundColor: "white",
  },
});

export default Mapplayerpic;
