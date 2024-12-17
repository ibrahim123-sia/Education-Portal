
import './Navbar.css'
import logo from './logo.png'
import { Link } from 'react-router-dom'
import admin from './admin.png'

const Navbar = () => {


    
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="logo"/>
            <p>Education System</p>
        </div>
           
        <div className='nav-login-cart'>
            <img src={admin} alt="admin"/>  
            <p className='welname'></p>   
            <Link to='/'><button>Logout</button></Link>
        </div>
    </div>
  )
}

export default Navbar