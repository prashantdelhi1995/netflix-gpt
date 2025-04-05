import React from 'react'
import { logo, banner } from '../utils/photoUrl'
import Login from './Login'

function Header() {
  return (
    <div className="header-container">
    <div className="main-banner-container">
     
      <img className="main-banner-image" src={banner} alt="Netflix Banner" />
      
      
      <img className="main-logo-image" src={logo} alt="Netflix Logo" />
      <Login />
    </div>
  </div>

  )
}

export default Header