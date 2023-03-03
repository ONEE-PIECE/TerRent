import React, {useEffect,useState} from 'react';
import MapView,{Circle, Marker,Polyline,PROVIDER_GOOGLE} from 'react-native-maps';
import { TouchableOpacity, StyleSheet, View ,Text, Button} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions';
import Confirmation from './Confirmation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 

export default function App() {

  const [tunis,settunis]=useState({
    latitude:36.80638936,
    longitude:10.181667,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [regin,setregin]=useState({
    latitude:36.8941559,
    longitude:10.1870625,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

console.log( "heree",location)
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
      
        {/* <Text style={{marginTop:80}}>{text}</Text> */}
       
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
        key: '',
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
        latitude:36.8941559,
        longitude:10.1870625,
       latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }} >

    {/* this for the current location */}
    <Marker coordinate={{
      latitude:regin.latitude,longitude:regin.longitude}} 
      draggable={true}
      title={"here "}
     
      
            description={"this is me "}
            onDragStart={(e)=>{   
        console.log("drag start", e.nativeEvent.coordinate)
      }}
      onDragEnd={(e)=>{
        console.log("drag end",e.nativeEvent.coordinate)
        setregin({
           latitude:e.nativeEvent.coordinate.latitude,
           longitude:e.nativeEvent.coordinate.longitude })
      }}

    ></Marker >
  
      <Circle 
        center={regin} 
        radius={100}
    /> 

    <Marker coordinate={tunis}
          onDragEnd= {(tunis)=>settunis(tunis.nativeEvent.coordinate)}
          draggable={true}
          title={"here "}
       />


      <MapViewDirections 
            regin={regin}
            tunis={tunis}
             apikey={""}
      />
      <Polyline
            coordinates={[regin,tunis]}
            strokeWidth={10}
            />
         </MapView>


         <View style={{position:'absolute' ,bottom:30,zIndex:1,left:130,}}>
         <Button title='confirm your position ' >
        </Button>
        </View>
     
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