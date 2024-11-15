import React from 'react';
import './Admindashboard.css';
import homeicon from '../AdminAssets/homeicon.png'
import logo from '../AdminAssets/logo.png'
import addmisionicon from '../AdminAssets/addmisionicon.png'
import studenticon from '../AdminAssets/student.png'
import teachericon from '../AdminAssets/teacher.png'
import annoucement from '../AdminAssets/annoucement.png'

const Admindashboard = () => {

  




  return (
    <div className="mainDashboard">
      <div className="sider">
        
        <div className="DTitle">
          <img src={logo} alt="" />
          <p>Education System</p>
        </div>
        <div className="option Home">
          <img src={homeicon} alt="Home Icon" />
          <p>Home</p>
        </div>

        <div className="option New-Addmision">
          <img src={addmisionicon} alt="Admission Icon" />
          <p>Admission</p>          
        </div>

        <div className="option Student">
          <img src={studenticon} alt="Student Icon" />
          <p>Student</p>
          <div className="dropdown-content">
            <p>View Students</p>
            <p>Edit Student Info</p>
          </div>
        </div>

        <div className="option Faculty">
          <img src={teachericon} alt="Faculty Icon" />
          <p>Faculty</p>
          <div className="dropdown-content">
            <p>View Faculty</p>
            <p>Add New Faculty</p>
          </div>
        </div>

        <div className="option Annoucement">
          <img src={annoucement} alt="Announcement Icon" />
          <p>Announcement</p>
          <div className="dropdown-content">
            <p>New Announcements</p>
            <p>Archive</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
