import React, { useEffect, useState } from "react";
import "./TeacherDashboard.css";
import homeicon from "../TeacherAssets/homeicon.png";
import education from "../TeacherAssets/education.png";
import announcement from "../TeacherAssets/Tannouncement.png";
import { Link } from "react-router-dom";
import searchicon from "../TeacherAssets/searchicon.png";
import fteachericon from "../TeacherAssets/fteacher.png";
import mteachericon from "../TeacherAssets/mteacher.png";
import settingicon from "../TeacherAssets/setting.png";
import attendance from "../TeacherAssets/attendance.png";
import grading from "../TeacherAssets/grading.png";
import assignment from "../TeacherAssets/assignment.png";
import axios from "axios";

const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState({});
  const [teacherSchedule, setTeacherSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const teacherId = localStorage.getItem("teacherId");

    if (teacherId) {
      fetchTeacherData(teacherId);
    } else {
      alert("No teacher ID found. Please log in again.");
    }
  }, []);

  const fetchTeacherData = async (teacherId) => {
    try {
      const response = await axios.get("http://localhost:5000/GetTeacherRecord");
      const { Teachers, Tschedule } = response.data;
      const teacher = Teachers.find((t) => t.TeacherID === teacherId);
      const schedule = Tschedule.filter(s => 
        s.TeacherID.trim().toLowerCase() === teacherId.trim().toLowerCase()
      );
      

      setTeacherData(teacher || {});
      setTeacherSchedule(schedule || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="TD-mainDashboard">
      <div className="TD-sider">
        <div className="TD-DTitle">
          <img src={education} alt="" />
          <p>Education Portal</p>
        </div>
        <div className="TD-option TD-Home">
          <Link to="/TeacherDashboard" className="TD-link">
            <img src={homeicon} alt="Home Icon" />
            <p>Home</p>
          </Link>
        </div>
        <div className="TD-option TD-New-Admission">
          <Link to="/ClassAttendance" className="TD-link">
            <img src={attendance} alt="Admission Icon" />
            <p>Class Attendance</p>
          </Link>
        </div>
        <div className="TD-option TD-Announcement">
          <Link to="/Assignment" className="TD-link">
            <img src={assignment} alt="Announcement Icon" />
            <p>Assignment</p>
          </Link>
        </div>
        <div className="TD-option TD-Announcement">
          <Link className="TD-link">
            <img src={grading} alt="Announcement Icon" />
            <p>Grading</p>
          </Link>
        </div>
        <div className="TD-option TD-Announcement">
          <Link className="TD-link">
            <img src={announcement} alt="Announcement Icon" />
            <p>Announcement</p>
          </Link>
        </div>
        <div className="TD-option TD-setting">
          <Link to='/' className="TD-link">
            <img src={settingicon} alt="" />
            <p>Logout</p>
          </Link>
        </div>
      </div>

      <div className="TD-Dashboard-content">
        <div className="navbarD">
          <div className="search-container">
            <img src={searchicon} alt="" className="search-icon" />
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
                  onClick={() => (window.location.href = "/Attendance")}
                >
                  Class Attendance
                </div>
                <div
                  className="search-option"
                  onClick={() => (window.location.href = "/Assignment")}
                >
                  Assignment
                </div>
                <div
                  className="search-option"
                  onClick={() => (window.location.href = "/Grading")}
                >
                  Grading
                </div>
                <div
                  className="search-option"
                  onClick={() => (window.location.href = "/Announcement")}
                >
                  Announcements
                </div>
              </div>
            )}
          </div>

          <div className="username">
            <div className="TD-user">
              <img
                className="navimg"
                src={teacherData.Gender === "Male" ? mteachericon : fteachericon}
                alt="Teacher Icon"
              />
              <p>
                 Welcome {teacherData.FirstName} {teacherData.LastName}
              </p>
            </div>
          </div>
        </div>

        <div className="TD-welcome">
          <div className="TD-a">
            <h2 className="TD-h2">Dashboard!!</h2>
            <div className="TD-userphoto">
              <img
                src={teacherData.Gender === "Male" ? mteachericon : fteachericon}
                alt="Teacher Icon"
              />
              <p>
                HEY! {teacherData.FirstName} {teacherData.LastName}
              </p>
            </div>
          </div>
        </div>

        <div className="TD-Feature">
          <div className="TeacherSchedule">
            <h2>Your Class Schedule</h2>
            {loading ? (
              <p>Loading schedule...</p>
            ) : teacherSchedule.length > 0 ? (
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Time Slot</th>
                    <th>Subject</th>
                    <th>Classroom</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherSchedule.map((schedule, index) => (
                    <tr key={index}>
                      <td>{schedule.DayOfWeek}</td>
                      <td>{schedule.TimeSlot}</td>
                      <td>{schedule.Subject}</td>
                      <td>{schedule.Class}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No schedule found for the current teacher.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
