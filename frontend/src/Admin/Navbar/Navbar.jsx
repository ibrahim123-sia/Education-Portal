import React, { useContext, useState } from 'react'
import './Navbar.css'

import { Link } from 'react-router-dom'
import { Context } from "../Context/Context";


const Navbar = () => {

    const { username } = useContext(Context);
    
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            {/* <img src={logo1} alt="logo"/> */}
            <p>Dobicon</p>
        </div>
        <ul className='nav-menu'>
            <li ><Link to='/AdminDashboard' style={{textDecoration:'none'}} className='LinkA'>Home</Link></li>
            <li ><Link to='/AdminLogin' style={{textDecoration:'none'}} className='LinkA'>A</Link> </li>
            <li ><Link to='/Admission' style={{textDecoration:'none'}} className='LinkA'> B</Link> </li>
            
        </ul>    
        <div className='nav-login-cart'>
            <p className='welname'>{username}</p>      
            {/* <Link to='/cart'><img src={cart} alt="cart"/></Link> */}
            
            <Link to='/'><button>Logout</button></Link>
        </div>
    </div>
  )
}

export default Navbar