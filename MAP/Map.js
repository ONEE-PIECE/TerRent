import React, {useEffect,useState} from 'react';
import MapView,{Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View ,Text} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import * as Location from 'expo-location'


export default function App() {


  const [regin,setregin]=React.useState({
    latitude:36.8941559,
    longitude:10.1870625,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)

      console.log("Location:")
      console.log(Location)
    })()
  }, [])

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={{marginTop:50,flex:1}}>
        <Text style={{marginTop:80}}>{text}</Text>
       
         <GooglePlacesAutocomplete
      placeholder='Search here...'
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby:"distance"
      }}

      onPress={(data, details = null) => {
       
        console.log(data, details)
        setregin({
          latitude:details.geometry.location.lat,
          longitude:details.geometry.location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        })
      }}
      query={{
        key: 'AIzaSyB3gw78dU8-sOg2nzSiHi4-7LUgEedSasM',
        language: 'en',
        types:"establishment",
        radius:30000,
        location:`${regin.latitude},${regin.longitude}`
      }}
        styles={{container:{flex:0,position:'absolute',width:"100%",zIndex:1},
    listView:{backgroundColor:"white"}}}
    />
      <MapView 
      provider={PROVIDER_GOOGLE}

      style={styles.map}   initialRegion={{
    latitude: 36.8065,
    longitude: 10.1815,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }} >
    <Marker coordinate={{
      latitude:regin.latitude,longitude:regin.longitude}} 
    ></Marker>
    <Marker coordinate={{latitude:36.8065 ,
            longitude:10.1815}}
            title={"here "}
            description={"stade "}
         />

  </MapView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});