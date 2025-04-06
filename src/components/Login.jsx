import React, { useState, useRef } from "react";
import "./Login.css";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../store/userSlice";

import { USER_AVATAR } from "../utils/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./Header";
const Login = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
   const user = useSelector((store) => store.user);
  console.log("user from redux", user);
    


  const toggleSignUp = () => {
    setIsLogin((prevValue) => !prevValue);
  };
  function handleFormSubmit(e) {
    e.preventDefault();
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    if (!isLogin) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(async (userCredential) => {
          // Signed up
          const user = userCredential.user;
          
         await updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          });
          
          const {uid, displayName, email, photoURL} = auth.currentUser
              
              dispatch(addUser({uid, displayName, email, photoURL}))
        
          navigate("/browse");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;

          setErrorMessage("*"+ error.message + " " + errorCode);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user", user)
          const {uid, displayName, email, photoURL} = auth. currentUser
              
              dispatch(addUser({uid, displayName, email, photoURL}))

          console.log("user", user);
         
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          setErrorMessage("**" + error.message + " " + errorCode);
        });
    }
  }
  return (<>
    <Header />
    <div className="main-login-conatiner">
      <form onSubmit={handleFormSubmit}>
        <div className="form-container">
          <h2>{isLogin ? "SignIn" : "SignUp"} </h2>
          {!isLogin && (
            <input
              type="text"
              ref={name}
              className="login-input-box"
              placeholder="enter your name"
            ></input>
          )}
          <input
            type="text"
            className="login-input-box"
            ref={email}
            placeholder="enter your email"
          ></input>
          <input
            className="login-input-box"
            type="password"
            ref={password}
            placeholder="enter your password"
          ></input>
          <button className="login-submit-button" type="submit">
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
          <p className="error-message">{errorMessage}</p>
          <p className="signup-toggle" onClick={toggleSignUp}>
            Do you want to {isLogin ? "Sign Up" : "SignIn"}
          </p>
        </div>
      </form>
    </div>
  </>
    
  );
};

export default Login;
