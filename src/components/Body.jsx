import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import Header from './Header'
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import { removeUser } from '../store/userSlice'


const Body = () => {
    const dispatch= useDispatch()


// useEffect(()=>{
    
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log("triggered")
//     const {uid, displayName, email} = user;
    
//     dispatch(addUser({uid, displayName, email}))
   
   
    
//   } else {
//     dispatch(removeUser())
    
//   }
// });

// },[])


    const appRoute= createBrowserRouter([
        {
            path:"/",
            element:<Login />

        },
        {
            path:"/browse",
            element:<Browse />
        },
        {
            path:"/",
            element:<Header />
        }
    ])
  return (
    <div>
    <RouterProvider router={appRoute} />
    </div>
  )
}

export default Body