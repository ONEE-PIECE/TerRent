import { TouchableOpacity,KeyboardAvoidingView,StyleSheet, Text, View ,TextInput, Button} from 'react-native'
import React,{useState} from 'react'
import {launchImageLibrary} from 'react-native-image-picker';
import { authentification } from '../../../FbConfig/config';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import  axios from 'axios'
import { useNavigation } from '@react-navigation/native';


const OwnerCreateAccount = () => {

  const navigation=useNavigation();

const [email,setEmail]= useState('');
const [password,setPassword]= useState('');
const [fullName,setFullName]= useState('');
const [phoneNumber,setPhoneNumber]= useState('');
const [patentImage,setPatentImage]= useState('');
const [ProfileImage,setProfileImage]= useState('');
const [FireId,setFireId]= useState('');



const axiosPost=(FireId)=>{
  console.log(FireId);
  let body={
    Fireid: FireId,
    FullName:fullName,
    PhoneNumber:phoneNumber,
    patentImage:patentImage,
    ProfileImage:ProfileImage,
  }
  axios.post('http://192.168.100.10:3000/owner/signUpOwner',body)
  .then(response=>console.log(response))
  .catch(err=>console.log(err))
}

//! IMAGE UPLOADER 
// const options = {
//   title: 'Select Image',
//   maxHeight: 200,
//   maxWidth: 200,
//   mediaType: 'photo',
//   includeBase64: false,
//   quality: 1,
// };


// const openGallery = async () =>{
//   try{
//   const image = await launchImageLibrary(options)
//   console.log(image)
//   } catch (e) {console.log(e)};
// }

 const Register = () =>{
  createUserWithEmailAndPassword(authentification,email,password)
  .then(res=>{
    
    axiosPost(res._tokenResponse.localId)
    navigation.navigate('Login')

  })
   .catch(e=>console.log(e))
}

return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior='padding'
    >
       <View style={styles.inputContainer}>
           <TextInput 
           placeholder="Full Name"
           value={fullName}
           onChangeText={ text=> {setFullName(text)}}
           style={styles.input}
           />
           <TextInput 
           placeholder="Phone Number"
           value={phoneNumber}
           onChangeText={ number=> {setPhoneNumber(number)}}
           style={styles.input}
           />
           <TextInput 
           placeholder="Email"
           value={email}
           onChangeText={ text=> {setEmail(text)}}
           style={styles.input}
           />
                 <TextInput 
           placeholder="Password"
           value={password}
           onChangeText={ text=> setPassword(text) }
           style={styles.input}
           secureTextEntry
           /></View>
{/* <View style={styles.UploadButton}>
           <Button
           title="Upload Patent Image"
           value={patentImage}
           onPress={openGallery}
           style={styles.input}
           ></Button>
         
           <Button
           title="Upload Profile Image"
           value={ProfileImage}
           style={styles.input}
           ></Button>
  </View> */}
       <View style={styles.buttonContainer}>
           <TouchableOpacity
           onPress={Register}
           style={styles.button}
           >
       <Text style={styles.buttonOutLineText}>Register</Text>
           </TouchableOpacity>
       </View>
    
    </KeyboardAvoidingView>

  )
}

export default OwnerCreateAccount

const styles = StyleSheet.create({ 
  container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

  }
,

inputContainer:{
width:'80%',
},
input:{
  backgroundColor:'white',
  paddingHorizontal:15,
  paddingVertical:10,
  borderRadius:10,
  marginTop:10,

},
buttonContainer:{
  width:'60%',
justifyContent: 'center',
alignItems: 'center',
marginTop:40,
},
button:{
  backgroundColor:'#0782F9',
width:'100%',
padding:15,
borderRadius:10,
alignItems:'center',
},
buttonOutLine:{
  backgroundColor:'white',
  marginTop:5,
  borderColor:'0782F9',
  borderwidth:2,

},
buttonText:{
color:'white',
fontWeight:'700',
fontsize:16,
},
buttonOutLineText:{
  fontWeight:'700',
  alignItems :'center',
  
},



})