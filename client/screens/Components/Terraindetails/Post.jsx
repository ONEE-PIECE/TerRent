import { StyleSheet, Text, View ,Pressable} from 'react-native'
import React ,{useState,useEffect} from 'react'
import { Input, Stack, Center, NativeBaseProvider } from "native-base";
import axios from "axios" 
import { Avatar, Button, Card } from "react-native-paper";
import {baseUrl} from "../../../urlConfig/urlConfig.js"
import PlayerDetails from "./PlayerDetails";
import {AntDesign } from  "@expo/vector-icons"
const Post = () => {
const [comment , setComment]=useState("") 
const [data,setData]=useState([])
const [refresh,setRefresh] = useState(false)
useEffect(() => {
  getComment()
 
}, [refresh])

  const getComment = () =>{
 
    axios.get(`${baseUrl}Comments/getComment/1`) //  is the terrain Id 
    .then((response) =>setData(response.data))
    .catch((error) =>console.log(error))
    
}
const addComment = () => {

    let body={
        Comment:comment
    }
 console.log(comment);
axios.post(`${baseUrl}Comments/addComment/wYaNseqrwlcCrkQHZnjJrVQ4lQp2/2`, body).then((response) => {
    setData([...data, response.data])
})
.catch((error) =>console.log(error))

}


    return (
    <NativeBaseProvider>
      <Center>
   
    <Stack space={4} w="75%" maxW="300px" mx="auto">
    {data.map((item,i) => (
        <Card key={i}
          style={{
            marginTop: 15,
            marginBottom: 3,

            backgroundColor: "white",
            borderColor: "darkorange",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
      

        <PlayerDetails  playerFireId={item.playerFireId}/>
        <Pressable onPress={() => console.log("Chat")}>
        <AntDesign name="message1" marginLeft={250}  marginTop={-40} size={25} color="blue" />
              </Pressable>
          <Card.Content>
            <Text
              style={{ marginLeft: 20, fontSize: 20, color: "black" }}
              variant="headlineSmall"
            >
             {item.Comment}
            </Text>
          </Card.Content>
        </Card>
      ))}
    <Input      
    onChangeText={setComment
    }
    variant="rounded" 
    placeholder="Searching For Game?" 
    
    />
      <Button 
      onPress={()=>{addComment()
    setRefresh(true)}}
      >post</Button>
    </Stack>
    </Center>
    </NativeBaseProvider>
  )
}

export default Post

const styles = StyleSheet.create({})