import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./client/dist/styles.css";
import { auth } from "./client/config.js"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { baseUrl } from "./client/urlConfig/urlConfig";
import axios from 'axios'
function Signup() {
   const [FirstName,setFirstName]=useState("");
   const [LastName,setLastName]=useState("")
   const [Email,setEmail]=useState("")
   const [Password,setPassword]=useState("")
   const [ProfileImage,setProfileImage]=useState("")


   const axiosPost = (FireId) => {
    console.log("in axios:",FireId);
    const body = {
      FireId:FireId,
      Email: Email,
      FirstName: FirstName,
      LastName:LastName,
      ProfileImage: ProfileImage,
    };
    console.log(FireId); 
    axios
      .post(`${baseUrl}Admin/signUpAdmin`, body)
      .then((response) => console.log("account created successfully"))
      .catch((err) => console.log(err));
  };


const uploadProfileImage = async (uri) => {
  const storage = getStorage();
  const storageRef = ref(storage, `terrent_AdminProfile_images/${uri.name}`);
  const uploadTask = uploadBytesResumable(storageRef, uri);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        setProfileImage(downloadURL);
      });
    }
  );
};


const handleImage =e=>{
  e.preventDefault();

  const file=e.target.files[0];
  console.log(file)
  uploadProfileImage(file)
  console.log(file)
}
const Register = (e) => {
  e.preventDefault()
  createUserWithEmailAndPassword(auth, Email, Password)
    .then((res) => {
      axiosPost(res._tokenResponse.localId);
     
    })
    .catch((e) => console.log(e));
};
  return (
    <form class="signup-form">
    <h2>Sign Up</h2>
    <div class="form-group">
      <label for="first-name">First Name:</label>
      <input
       type="text"
        id="first-name" 
        name="first-name" 
         required
            onChange={(e) => {e.preventDefault()
              setFirstName(e.target.value);
            }}
         />
    </div>
    <div class="form-group">
      <label for="last-name">Last Name:</label>
      <input 
      type="text" 
      id="last-name"
       name="last-name" 
       required
       onChange={(e) => {e.preventDefault()
        setLastName(e.target.value);
      }}
       />
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input
      type="email" 
      id="email" 
      name="email" 
      required
      onChange={(e) => {e.preventDefault()
        setEmail(e.target.value);
      }}
      />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input 
      type="password" 
      id="password" 
      name="password" 
      required
      onChange={(e) => {e.preventDefault()
        setPassword(e.target.value);
      }}
      /></div>
      <div class="form-group">
      <label for="file">Profile Image:</label>
      <input 
      type="file" 
      id="file" 
      name="Image" 
      required
      onChange={(e) => {e.preventDefault()
        handleImage(e);
      }}
      />
      </div>
    
    <button type="submit" onClick={(e)=>{
      console.log("hello");
      Register(e)}} >Sign Up</button>
  </form>
  );
}

export default Signup;
