import React, { useEffect, useState } from "react";
import "./Admindashboard.css";
import homeicon from "../AdminAssets/homeicon.png";
import education from "../AdminAssets/education.png";
import addmisionicon from "../AdminAssets/addmisionicon.png";
import studenticon from "../AdminAssets/student.png";
import teachericon from "../AdminAssets/teacher.png";
import annoucement from "../AdminAssets/annoucement.png";
import searchicon from "../AdminAssets/searchicon.png";
import adminicon from "../AdminAssets/admin.png";
import settingicon from "../AdminAssets/setting.png";
import revenue1 from "../AdminAssets/revenue1.png";
import Tstudent from "../AdminAssets/Tstudent.png";
import schedule from "../AdminAssets/schedule.png";
import absent from "../AdminAssets/absent.png";
import studentsabsent from "../AdminAssets/studentsabsent.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Admindashboard = () => {
  const [TotalStd, setTotalStd] = useState(0);
  const [FeeCollection, setFeeCollection] = useState(0);
  const [TotalAbsentTeacher,setTotalAbsentTeacher]=useState(0)
  const [adminData, setAdminData] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/count");
        setTotalStd(response.data.totalStudents || 0);
        setFeeCollection(response.data.feeCollection || 0);
        setTotalAbsentTeacher(response.data.totalAbsentTeacher||0);
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
    <div className="mainDashboard">
      <div className="sider">
        <div className="DTitle">
          <img src={education} alt="Education Logo" />
          <p>Education Portal</p>
        </div>

        <div className="option Home">
          <Link to="/Admindashboard" className="link">
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
              <p>View Records</p>
            </Link>
            <Link to="/MarkAttendences" className="link">
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
          <img src={schedule} alt="Schedule Icon" />
          <p>Create Schedule</p>
          <div className="dropdown-content">
            
            <Link to="/ClassSchedule" className="link">
              <p>For Classes</p>
            </Link>
          </div>
        </div>

        <div className="option setting">
          <Link to="/" className="link">
            <img src={settingicon} alt="Settings Icon" />
            <p>Logout</p>
          </Link>
        </div>
      </div>

      <div className="Dashboard-content">
        <div className="navbarD">
          <div className="search-container">
            <img src={searchicon} alt="Search Icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              onFocus={() => setShowOptions(true)}
              onBlur={() => setTimeout(() => setShowOptions(false), 200)}
            />
            {showOptions && (
              <div className="search-options-dropdown">
                <div
                  className="search-option"
                  onClick={() => (window.location.href = "/FeeCollection")}
                >
                  Fee Collection
                </div>
                <div
                  className="search-option"
                  onClick={() => (window.location.href = "/ViewStudentRecord")}
                >
                  View Student Records
                </div>
                <div
                  className="search-option"
                  onClick={() => (window.location.href = "/ViewFacultyRecord")}
                >
                  View Faculty Records
                </div>
                <div
                  className="search-option"
                  onClick={() => (window.location.href = "/Annoucement")}
                >
                  Announcements
                </div>
              </div>
            )}
          </div>
          <div className="username">
            <p>{adminData ? adminData.AdminUserID : "Admin"}</p>
            <img src={adminicon} alt="Admin Icon" />
          </div>
        </div>

        <div className="welcome">
          <div className="a">
            <h2 className="h2">Dashboard!!</h2>
            <div className="userphoto">
              <img src={adminicon} alt="Admin Icon" />
              <p>HEY! {adminData ? adminData.AdminUserID : "Admin"}</p>
            </div>
          </div>
        </div>

        <div className="Feature">
          <div className="count1">
            <div className="f student">
              <h2>Total Registered</h2>
              <p>Students</p>
              <h1 className="h1">{TotalStd}</h1>
              <img src={Tstudent} alt="Total Students" />
            </div>
            <div className="f fee">
              <h2>Fee Collection</h2>
              <p>For this Month</p>
              <h1 className="h1">{FeeCollection}</h1>
              <img src={revenue1} alt="Fee Collection" />
            </div>
            <div className="f sabsent">
              <h2>No of Students</h2>
              <p>Absent Today</p>
              <h1 className="h1">40</h1>
              <img src={studentsabsent} alt="Total Student Absent" />
            </div>
            <div className="f fabsent">
              <h2>No of Faculty</h2>
              <p>Absent Today</p>
              <h1 className="h1">{TotalAbsentTeacher}</h1>
              <img src={absent} alt="Total Absent" />
            </div>
          </div>
          <div className="graph">
            <div className="std"></div>
            <div className="fee"></div>
            <div className="absent"></div>
          </div>
        </div>
        <div className="DFooter">
          <div className="footer-left">
            <p>© 2024 School Management System. All rights reserved.</p>
          </div>
          <div className="footer-center">
            <p>Last Updated: November 20, 2024 | Portal Version: 1.0.0</p>
          </div>
          <div className="footer-right">
            <p>
              <a href="/dashboard">Dashboard</a> | <a href="/settings">Services</a> |{" "}
              <a href="/reports">Reports</a> Need help?{" "}
              <a href="mailto:it.support@schoolportal.com">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
