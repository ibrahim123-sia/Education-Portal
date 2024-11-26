import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from './logo.png'
import { Link } from 'react-router-dom'
import { Context } from "../Context/Context";
import admin from './admin.png'

const Navbar = () => {

    const { username } = useContext(Context);
    
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="logo"/>
            <p>Education System</p>
        </div>
           
        <div className='nav-login-cart'>
            <img src={admin} alt="admin"/>  
            <p className='welname'>{username}</p>   
            <Link to='/'><button>Logout</button></Link>
        </div>
    </div>
  )
}

export default Navbar