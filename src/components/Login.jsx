import React, {useState, useRef} from 'react'
import "./Login.css"
import {checkValidData } from "../utils/validate" 
import {  createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase"
import { addUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import {USER_AVATAR} from "../utils/constant"
import { useSelector } from 'react-redux';

const Login = () => {
  const [isLogin , setIsLogin]  = useState(false)
  const [errorMessage, setErrorMessage]= useState(null)
  const name= useRef();
  const email= useRef();
  const password= useRef();
  const dispatch=  useDispatch();
  const userData= useSelector((state)=>state.user)
 const toggleSignUp=()=>{
  setIsLogin((prevValue)=>!prevValue)
}
function handleFormSubmit(e){
  e.preventDefault()
  const message=checkValidData(email.current.value, password.current.value)
  setErrorMessage(message);
  if (message) return;
  if(!isLogin){
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value,
      photoURL: USER_AVATAR,
    })
    dispatch(addUser({user}))
    console.log("userredux", userData)
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    
    setErrorMessage(error.message+" "+errorCode)
    // ..
  });

  }else{
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    dispatch(addUser({user}))
    console.log("userredux", userData)
    console.log("user", user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    setErrorMessage(error.message+" "+errorCode)
  });

  }



}
  return (
    <div className='main-login-conatiner'>
      <form onSubmit={handleFormSubmit}>
        <div className='form-container'>
        <h2>{isLogin?"SignIn":"SignUp"} </h2>
       {!isLogin  && <input type="text" ref={name}  className='login-input-box' placeholder='enter your name' ></input>}
        <input type="text" className='login-input-box' ref={email} placeholder='enter your email' ></input>
        <input className='login-input-box'  type="password" ref={password} placeholder="enter your password"></input>
        <button className='login-submit-button' type="submit">{isLogin?"Sign In":"Sign Up"}</button>
        <p className='error-message'>{errorMessage}</p>
        <p className='signup-toggle' onClick={toggleSignUp}>Do you want to {isLogin?"Sign Up":"SignIn"}</p>

        </div>
      </form>
    </div>
  )
}

export default Login