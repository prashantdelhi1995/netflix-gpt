import React from 'react'
import { logo, banner } from '../utils/photoUrl'
import MainLogo from './MainLogo'


function Header() {
  return (
    <div className="header-container">
    <div className="main-banner-container">
    <MainLogo />
      <img className="main-logo-image" src={logo} alt="Netflix Logo" />

      
      
    
      
    </div>
  </div>

  )
}

export default Header