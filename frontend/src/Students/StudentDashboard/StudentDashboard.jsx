import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";
import homeicon from "../StudentAssets/homeicon.png";
import education from "../StudentAssets/education.png";
import mstudent from '../StudentAssets/man-student.png';
import wstudent from '../StudentAssets/woman-student.png';
import announcement from "../StudentAssets/Tannouncement.png";
import { Link } from "react-router-dom";
import searchicon from "../StudentAssets/searchicon.png";
import settingicon from "../StudentAssets/setting.png";
import attendance from "../StudentAssets/attendance.png";
import grades from "../StudentAssets/grading.png";
import assignments from "../StudentAssets/assignment.png";
import axios from "axios";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState({});
  const [studentSchedule, setStudentSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    console.log("Retrieved Student ID:", studentId);

    if (studentId) {
      fetchStudentData(studentId);
      fetchStudentSchedule(studentId);
    } else {
      alert("No student ID found. Please log in again.");
    }
  }, []);

  const fetchStudentData = async (studentId) => {
    try {
      console.log("Fetching data for Student ID:", studentId);
      const response = await axios.get("http://localhost:5000/GetStudentRecord");
      console.log("API Response:", response.data);

      const { Students } = response.data;
      const normalizeString = (str) => str?.trim().toLowerCase() || "";
      const student = Students.find(
        (s) => normalizeString(s.StudentID) === normalizeString(studentId)
      );

      setStudentData(student || {});
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const fetchStudentSchedule = async (studentId) => {
    try {
      console.log("Fetching schedule for Student ID:", studentId);
      const response = await axios.get(`http://localhost:5000/ClassSchedule/${studentId}`);
      console.log("Schedule API Response:", response.data);
  
      if (response.data && response.data.length > 0) {
        const flattenedSchedule = response.data.flatMap((schedule) => {
          const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          return days.flatMap((day, index) => {
            const subjectKey = `Subject${index + 1}`;
            const slotKey = `Slot${index + 1}`;
            if (schedule[subjectKey] && schedule[slotKey]) {
              return {
                DayOfWeek: day,
                Subject: schedule[subjectKey],
                TimeSlot: schedule[slotKey],
                Classroom: schedule.ClassID || "N/A",
              };
            }
            return [];
          });
        });
  
        console.log("Flattened Schedule:", flattenedSchedule);
        setStudentSchedule(flattenedSchedule);
      } else {
        console.log("No schedule data available.");
        setStudentSchedule([]);
      }
  
      setLoading(false);
    } catch (error) {
      console.error("Error fetching student schedule:", error.response?.data || error.message);
      setLoading(false);
    }
  };
  

  return (
    <div className="SD-mainDashboard">
      <div className="SD-sider">
        <div className="SD-DTitle">
          <img src={education} alt="Education Portal" />
          <p>Education Portal</p>
        </div>
        <div className="SD-option SD-Home">
          <Link to="/StudentDashboard" className="SD-link">
            <img src={homeicon} alt="Home Icon" />
            <p>Home</p>
          </Link>
        </div>
        <div className="SD-option SD-Attendance">
          <Link to="/ViewAttendance" className="SD-link">
            <img src={attendance} alt="Attendance Icon" />
            <p>View Attendance</p>
          </Link>
        </div>
        <div className="SD-option SD-Assignments">
          <Link to="/SubmitAssignment" className="SD-link">
            <img src={assignments} alt="Assignments Icon" />
            <p>Submit Assignment</p>
          </Link>
        </div>
        <div className="SD-option SD-Grades">
          <Link to="/ViewGrades" className="SD-link">
            <img src={grades} alt="Grades Icon" />
            <p>View Grades</p>
          </Link>
        </div>
        <div className="SD-option SD-Announcements">
          <Link to="/SAnnouncements" className="SD-link">
            <img src={announcement} alt="Announcements Icon" />
            <p>Announcements</p>
          </Link>
        </div>
        <div className="SD-option SD-setting">
          <Link to="/" className="SD-link">
            <img src={settingicon} alt="Logout Icon" />
            <p>Logout</p>
          </Link>
        </div>
      </div>

      <div className="SD-Dashboard-content">
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
                  onClick={() => (window.location.href = "/SAttendance")}
                >
                  Attendance
                </div>
                <div
                  className="search-option"
                  onClick={() => (window.location.href = "/Assignments")}
                >
                  Assignments
                </div>
                <div
                  className="search-option"
                  onClick={() => (window.location.href = "/Grades")}
                >
                  Grades
                </div>
                <div
                  className="search-option"
                  onClick={() => (window.location.href = "/Announcements")}
                >
                  Announcements
                </div>
              </div>
            )}
          </div>
          <div className="username">
            <div className="SD-user">
              <img
                className="navimg"
                src={studentData.Gender === "Male" ? mstudent : wstudent}
                alt="Student Icon"
              />
              <p>
                Welcome! {studentData?.FirstName || "Guest"} {studentData?.LastName || ""}
              </p>
            </div>
          </div>
        </div>

        <div className="SD-welcome">
          <h2>Dashboard!!</h2>
          <div className="SD-userphoto">
            <img
              className="navimg"
              src={studentData.Gender === "Male" ? mstudent : wstudent}
              alt="Student Icon"
            />
            <p>
              Hey! {studentData?.FirstName || "Guest"} {studentData?.LastName || ""}
            </p>
          </div>
        </div>

        <div className="SD-Feature">
          <div className="StudentSchedule">
            <h2>Your Class Schedule</h2>
            {loading ? (
              <p>Loading schedule...</p>
            ) : studentSchedule.length > 0 ? (
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
                  {studentSchedule.map((schedule, index) => (
                    <tr key={index}>
                      <td>{schedule.DayOfWeek}</td>
                      <td>{schedule.TimeSlot}</td>
                      <td>{schedule.Subject}</td>
                      <td>{schedule.Classroom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No schedule found for the current student.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
