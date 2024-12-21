import './Navbar.css';
import axios from 'axios';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import admin from './admin.png';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [AdminData, setAdminData] = useState(null);
  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        if (adminId) {
          const response = await axios.get(`http://localhost:5000/Adminlogin/${adminId}`);
          setAdminData(response.data);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, [adminId]);

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="logo" />
        <p>Education System</p>
      </div>
      <Link to='/Admindashboard' className='home-button'>
        Home
      </Link>
      <div className='nav-login-cart'>
        <img src={admin} alt="admin" />
        <p>{AdminData ? AdminData.AdminUserID : "Admin"}</p>
        <Link to='/'>
          <button className='logout'>Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
