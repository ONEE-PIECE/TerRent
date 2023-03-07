import React from 'react'
import { View } from 'react-native'
import { Card } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
const  OwnerOrPlayer=()=> {
const navigation=useNavigation()
return (
    <View>
        <Card
        onPress={()=>navigation.navigate("LoginScreen")}>
<Card.Cover
style={styles.owner}
source={{uri:"https://cdn.dribbble.com/users/1876052/screenshots/16449565/media/59217f39b6c249c5fd8e0b5f30577d43.png?compress=1&resize=400x300&vertical=top"}}
>
</Card.Cover>
</Card>
<Card
onPress={()=>navigation.navigate("OwnerLogin")}>
<Card.Cover
style={styles.player}
source={{uri:"https://preview.redd.it/luffy-will-play-in-the-next-brazil-soccer-game-v0-0p21vi00ur2a1.png?auto=webp&s=9de4acb8cc6a182664dac3f70538e5aa9e5e5b33"}}
>
</Card.Cover>
</Card>
</View>
  )
}
const styles = StyleSheet.create({
 owner:{
  height:350
 },
 player:{
    marginTop:5,
    height:350
 }
})
export default OwnerOrPlayer