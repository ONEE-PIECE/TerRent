import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios';

import AsyncStorage  from '@react-native-async-storage/async-storage';
const OwnerHome = () => {
const [ownerData,setOwnerData] = useState([])
const [stop,setStop] = useState(false)
  

_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem("marwen");

    alert(value, "marwen");
  } catch (error) {
    console.log(error);
  }
}


useEffect(() => {

  _retrieveData()
},[stop])



  



  return (
    <View style={styles.container}>
      {/* <Text> Hello {data[0].FullName}  WelCome To your app</Text> */}
    </View>
  )
}

export default OwnerHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
