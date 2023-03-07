import { TouchableOpacity,StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {signOut} from "firebase/auth"
import { authentification } from "../../../client/FbConfig/config.js";
import { useNavigation } from "@react-navigation/native";


import AsyncStorage  from '@react-native-async-storage/async-storage';
const OwnerHome = () => {
const [ownerData,setOwnerData] = useState([])
const [stop,setStop] = useState(false)
  const navigation = useNavigation()
const LogOut = () => {

  
signOut(authentification).then((res) => {
  console.log(res)
alert("Good Bye ",ownerData.FullName)
navigation.navigate("Login")
}).catch((error) => {
  console.log(error)
});
}


_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem("Token");

   console.log("welcome :",value)
    let ownerData= await axios.get(`http://192.168.43.52:3000/owner/signInOwner/${value}`)
    console.log("owner",ownerData.data );
    return ownerData.data;

  } catch (error) {
    console.log(error);
  }
}


useEffect(() => {

  _retrieveData().then((res)=> 
 { console.log('response :::::',res);  
   setOwnerData(res[0])}
  )
},[stop])

console.log(ownerData);

  



  return (
    <View style={styles.container}>
     <View>
      <Text> Hello {ownerData.FullName} WelCome To your app</Text>
     </View>
     <View>
     <TouchableOpacity
            onPress={() => {LogOut()}}
            style={styles.button}
            >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
    </View>
  
    </View>)
}

export default OwnerHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "red",
    width: "100%",
    marginTop: 100,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  }
});
