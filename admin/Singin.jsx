import React,{useState} from 'react'
import './client/dist/styles.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./client/config.js"




function Signin() {
    
const [Email,setEmail]=useState("")
const [Password,setPassword]=useState("")





const SignIn =async(e)=>{
    e.preventDefault()
    const res = await signInWithEmailAndPassword(auth, Email, Password)
    console.log(res);;
}




  return (
    <form class="signup-form">
    <h2>Sign In</h2>
   
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
      />
      </div>
    
    <button type="submit" onClick={(e)=>{
      SignIn(e)}} >Sign In</button>
  </form>
  )
}

export default Signin