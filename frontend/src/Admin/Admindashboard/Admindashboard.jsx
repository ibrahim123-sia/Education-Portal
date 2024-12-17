import React, { useEffect, useState } from "react";
import "./Admindashboard.css";
import homeicon from "../AdminAssets/homeicon.png";
import education from "../AdminAssets/education.png";
import addmisionicon from "../AdminAssets/addmisionicon.png";
import studenticon from "../AdminAssets/student.png";
import teachericon from "../AdminAssets/teacher.png";
import annoucement from "../AdminAssets/annoucement.png";
import { Link } from "react-router-dom";
import searchicon from "../AdminAssets/searchicon.png";
import adminicon from "../AdminAssets/admin.png";
import settingiocn from "../AdminAssets/setting.png";
import revenue1 from "../AdminAssets/revenue1.png";
import Tstudent from "../AdminAssets/Tstudent.png";
import schedule from "../AdminAssets/schedule.png";
import axios from "axios";

const Admindashboard = () => {
  const [TotalStd, setTotalStd] = useState(0);
  const [FeeCollection, setFeeCollection] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/count");
        setTotalStd(response.data.totalStudents || 0);
        setFeeCollection(response.data.FeeCollection || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="mainDashboard">
      <div className="sider">
        <div className="DTitle">
          <img src={education} alt="" />
          <p>Education Portal</p>
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
            <Link to="/FeeCollection" className="link">
              <p>Fee Collection</p>
            </Link>
            <Link to="/ViewStudentRecord" className="link">
              <p>View Records</p>
            </Link>
            <Link to="/StudentAttendences" className="link">
              <p>View Attendences</p>
            </Link>
          </div>
        </div>

        <div className="option Faculty">
          <img src={teachericon} alt="Faculty Icon" />
          <p>Faculty</p>
          <div className="dropdown-content">
            <Link to="/AddFaculty" className="link">
              <p>New Hiring</p>
            </Link>
            <Link to="/ViewFacultyRecord" className="link">
              <p>View Records</p>{" "}
            </Link>
            <Link to='/MarkAttendences' className="link">
              <p>Mark Attendences</p>
            </Link>
          </div>
        </div>

        <div className="option Annoucement">
          <Link to="/Annoucement" className="link">
            <img src={annoucement} alt="Announcement Icon" />
            <p>Announcement</p>
          </Link>
        </div>

        <div className="option Schedule">
          <img src={schedule} alt="Faculty Icon" />
          <p>Create Schedule</p>
          <div className="dropdown-content">
            <Link to="/ExamSchedule" className="link">
              <p>For Exams</p>
            </Link>
            <Link to="/ClassSchedule"  className="link">
              <p>For Classes</p>{" "}
            </Link>
          </div>
        </div>

        <div className="option setting">
          <Link className="link">
            <img src={settingiocn} alt="" />
            <p>Settings</p>
          </Link>
        </div>
      </div>

      <div className="Dashboard-content">
        <div className="navbarD">
          <div class="search-container">
            <img src={searchicon} alt="" className="search-icon" />
            <input type="text" placeholder="Search" class="search-input" />
          </div>
          <div className="username">
            <p></p>
            <img src={adminicon} alt="" />
          </div>
        </div>

        <div className="welcome">
          <div className="a">
            <h2 className="h2">Dashboard!!</h2>
            <div className="userphoto">
              <img src={adminicon} alt="" />
              <p>HEY! </p>
            </div>
          </div>
        </div>
        <div className="Feature">
          <div className="count1">
            <div className="f student">
              <h2>Total Registered </h2>
              <p>students</p>
              <h1 className="h1">{TotalStd}</h1>
              <img src={Tstudent} alt="" />
            </div>
            <div className="f fee">
              <h2>Fee Collection</h2>
              <p>for this month</p>
              <h1 className="h1">{FeeCollection}</h1>
              <img src={revenue1} alt="" />
            </div>
            <div className="f sabsent">
              <h2>No Of Student</h2>
              <p>absent today</p>
            </div>
            <div className="f fabsent">
              <h2>No Of Faculty</h2>
              <p>absent today</p>
            </div>
          </div>
          <div className="graph">
            <div className="std"></div>
            <div className="fee"></div>
            <div className="absent"></div>
          </div>
        </div>
        <div className="DFooter">
          <div class="footer-left">
            <p>© 2024 School Management System. All rights reserved.</p>
          </div>
          <div class="footer-center">
            <p>Last Updated: November 20, 2024 | Portal Version: 1.0.0</p>
          </div>
          <div class="footer-right">
            <p>
              <a href="/dashboard">Dashboard</a> |
              <a href="/settings">Services</a> |<a href="/reports">Reports </a>
              Need help?{"  "}
              <a href="mailto:it.support@schoolportal.com">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
