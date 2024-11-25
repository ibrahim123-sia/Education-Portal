import React, { useState } from "react";
import "./Admindashboard.css";
import homeicon from "../AdminAssets/homeicon.png";
import logo from "../AdminAssets/logo.png";
import addmisionicon from "../AdminAssets/addmisionicon.png";
import studenticon from "../AdminAssets/student.png";
import teachericon from "../AdminAssets/teacher.png";
import annoucement from "../AdminAssets/annoucement.png";
import { Link } from "react-router-dom";
import searchicon from "../AdminAssets/searchicon.png";
import { Context } from "../Context/Context";
import { useContext } from "react";
import adminicon from "../AdminAssets/admin.png";
import settingiocn from "../AdminAssets/setting.png";
import axios from "axios";
import facebook from "../AdminAssets/facebook.png";
import instagram from "../AdminAssets/instagram.png";
import whatsapp from "../AdminAssets/whatsapp.png";


const Admindashboard = () => {
  const [TotalStd, setTotalStd] = useState(0);
  const { username } = useContext(Context);

  const HandleCount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/count");

      const TotalStudent = response.data.totalStudents;
      setTotalStd(TotalStudent);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  return (
    <div className="mainDashboard">
      <div className="sider">
        <div className="DTitle">
          <img src={logo} alt="" />
          <p>Education System</p>
        </div>
        <div className="option Home">
          <Link to="/AdminDashboard" className="link">
            <img src={homeicon} alt="Home Icon" />
            <p>Home</p>
          </Link>
        </div>

        <div className="option New-Addmision">
          <Link to="/Admission" className="link">
            <img src={addmisionicon} alt="Admission Icon" />
            <p>Admission</p>
          </Link>
        </div>

        <div className="option Student">
          <img src={studenticon} alt="Student Icon" />
          <p>Student</p>

          <div className="dropdown-content">
            <p>Fee Collection</p>
            <p>View Attendence</p>
            <p>View Students</p>
          </div>
        </div>

        <div className="option Faculty">
          <img src={teachericon} alt="Faculty Icon" />
          <p>Faculty</p>
          <div className="dropdown-content">
            <p>View Faculty</p>
           <Link to='/AddFaculty'> <p>Add New Faculty</p></Link>
            <p>Mark Attendences</p>
          </div>
        </div>

        <div className="option Annoucement">
          <img src={annoucement} alt="Announcement Icon" />
          <p>Announcement</p>          
        </div>

        <div className="option setting">
          <img src={settingiocn} alt="" />
          <p>Settings</p>          
        </div>
      </div>

      <div className="Dashboard-content">
        <div className="navbarD">
          <div class="search-container">
            <img src={searchicon} alt="" className="search-icon" />
            <input type="text" placeholder="Search" class="search-input" />
          </div>
          <div className="username">
            <p>{username}</p>
            <img src={adminicon} alt="" />
          </div>
        </div>

        <div className="welcome">
          <div className="a">
            <h2 className="h2">Dashboard!!</h2>
            <div className="userphoto">
              <img src={adminicon} alt="" />
              <p>HEY! {username}</p>
            </div>
          </div>
        </div>
        <div className="Feature">
          <div className="count1">
            <div className="f student">
              <p>Total Student</p>
              <h1>{TotalStd}</h1>
            </div>
            <div className="f fee">
              <p>Total Fee Collection</p>
            </div>
            <div className="f sabsent"></div>
            <div className="f fabsent"></div>
          </div>
          <div className="graph">
            <div className="std"></div>
            <div className="fee"></div>
            <div className="absent"></div>
          </div>
        </div>
        <div className="DFooter">
      <div className="Dfooter-logo">
        <img src={logo} alt="" />
        
      </div>
      <ul className='Dfooter-links'>
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="Dfooter-social-icon">
        <div className="Dfooter-icon-container">
            <img src={whatsapp} alt="" />
        </div>
        <div className="Dfooter-icon-container">
            <img src={facebook} alt="" />
        </div>
        <div className="Dfooter-icon-container">
            <img src={instagram} alt="" />
        </div>
      </div>
      <div className="Dfooter-copy-right">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved.</p>
      </div>
      </div>
      </div>      
    </div>
  );
};

export default Admindashboard;
