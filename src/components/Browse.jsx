import React from 'react'
import Header from './Header'
import MainLogo from './MainLogo'
import { logo, banner } from '../utils/photoUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './Browse.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { removeUser } from '../store/userSlice'
import { useDispatch } from 'react-redux';
import {  signOut } from "firebase/auth";

const Browse = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user) 
  console.log("user from redux on browse page", user);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser())
      navigate("/")
      // Sign-out successful.
    }).catch((error) => {
      console.log("error while signing out", error)
    });

    

  }

  return (
    <div className='nav-header'>
      
        <div className='logo-container'>
          <img src={logo} alt='NetflixLogo' className='logo-image'></img>
        </div>
        <div>
          <img src={user?.photoURL} alt='user' className='user-image'></img>
        <FontAwesomeIcon  onClick={handleLogOut} icon={faRightFromBracket} size='xl'/>
        </div>
      


    </div>
  )
}

export default Browse