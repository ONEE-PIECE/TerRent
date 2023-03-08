import { TouchableOpacity,KeyboardAvoidingView,StyleSheet, Text, View ,TextInput} from 'react-native'
import React,{useState} from 'react'
import * as ImagePicker from 'expo-image-picker'
import { authentification } from '../../FbConfig/config.js';
import {app} from '../../FbConfig/config.js';
import { getStorage,ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import  axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { Button,Stack,Icon,Input,Pressable, Center ,NativeBaseProvider} from 'native-base';
import {Ionicons,MaterialIcons} from '@expo/vector-icons'
const OwnerCreateAccount = () => {

  const navigation=useNavigation();

const [email,setEmail]= useState('');
const [password,setPassword]= useState('');
const [ConfirmPassword,setConfirmPassword]= useState('');
const [fullName,setFullName]= useState('');
const [phoneNumber,setPhoneNumber]= useState('');
const [patentImage,setPatentImage]= useState('');
const [ProfileImage,setProfileImage]= useState('');
const [FireId,setFireId]= useState('');
const [show,setShow]= useState(false);


/// Upload an image to Firebase Cloud Storage
const uploadPatentImage = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const storage=getStorage(app)
  const storageRef=ref(storage,`terrent_Patent_images/${filename}`)
  const uploadTask = uploadBytesResumable(storageRef,blob,filename)
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setPatentImage(downloadURL);
      });
    }
  );
};

const uploadProfileImage = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const storage=getStorage(app)
  const storageRef=ref(storage,`terrent_Profile_images/${filename}`)
  const uploadTask = uploadBytesResumable(storageRef,blob,filename)
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setProfileImage(downloadURL);
      });
    }
  );
};

const axiosPost=(FireId)=>{
  console.log(FireId);
  let body={
    Fireid: FireId,
    FullName:fullName,
    PhoneNumber:phoneNumber,
    patentImage:patentImage,
    ProfileImage:ProfileImage,
  }
  axios.post('http://192.168.104.8:3000/owner/signUpOwner',body)
  .then(response=>console.log("account created successfully"))
  .catch(err=>console.log(err))
}

//! IMAGE UPLOADER 

 const pickProfileImage = async ()=>{
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
    
  });

  if (!result.canceled) {
    uploadProfileImage(result.uri)    
  }
 }
  const pickPatentImage = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64:false,
    

    });
    if (!result.canceled) {
      uploadPatentImage(result.uri)

        }
   }catch (e) {console.log(e)};
   };




 const Register = () =>{
  createUserWithEmailAndPassword(authentification,email,password)
  .then(res=>{
    axiosPost(res._tokenResponse.localId)
    navigation.navigate('Login')

  })
   .catch(e=>console.log(e))
}

return (
  <NativeBaseProvider>
<Center  flex={1} px="3">
<Stack  space={4} w="75%" maxW="300px" mx="auto">
      <Input size="lg" placeholder="Full Name" value={fullName} onChangeText={(text)=>{setFullName(text)}} />
      <Input size="lg" placeholder="Phone Number" value={phoneNumber} onChangeText={(text)=>{setPhoneNumber(text)}} />
    
      <Input size="lg" placeholder="Email" value={email}  onChangeText={(text)=>{setEmail(text)}} />

<Input w={{
      base: "75%",
      md: "25%"
    }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={6} mr="2" color="muted.400" />
          </Pressable>} value={password} onChangeText={(text)=>{setPassword(text)}} placeholder="Password" />
          <Input w={{
      base: "75%",
      md: "25%"
    }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={6} mr="2" color="muted.400" />
          </Pressable>}  value={ConfirmPassword} onChangeText={(text)=>{setConfirmPassword(text)}} placeholder="Confirm Password" />
      <Button leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size={7}/>} onPress={pickPatentImage} >Upload Patent Image</Button>
      <Button leftIcon={<Icon as={Ionicons} name="cloud-upload-outline"  size={7}/>}  onPress={pickProfileImage}   >Upload Profile Image</Button>
      <Button onPress={() =>{Register()}}>Register</Button>
    </Stack>
    </Center>
    </NativeBaseProvider>
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