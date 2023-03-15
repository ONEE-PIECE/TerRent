import { View, } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Avatar,Card,Text } from "react-native-paper";
import axios from 'axios'
import { baseUrl } from '../../../urlConfig/urlConfig';
const PlayerDetails = ({playerFireId}) => {
const [PlayerDetails,setPlayerDetails] = useState(null)



 
useEffect(() => {
const getPlayerData = async ()=>{
try{
const response = await axios.get(`${baseUrl}api/player/${playerFireId}`)
setPlayerDetails(response.data[0])
console.log(response.data[0].ProfileImage);
}catch (err){console.log(err)}

}
getPlayerData()
}, [playerFireId])


  console.log(playerFireId)
  return (
    <View> 

      { PlayerDetails ? (
      

         <>  
           <Avatar.Image   
           size={40}
           style={{ marginTop: 10, marginLeft: 8 }}
           source={{ uri:PlayerDetails.ProfileImage}} 
         />
            <Card.Title
            style={{ marginTop: -40, marginLeft: 40,}}
            title={<Text>{PlayerDetails.FirstName} </Text>}
          /></>):null
        } 
    </View>
  )
}

export default PlayerDetails