import './Snavbar.css';
import axios from 'axios';
import logo from './education.png';
import { Link } from 'react-router-dom';
import mstudent from './man-student.png';
import fstudent from './woman-student.png';
import { useState, useEffect } from 'react';

const Snavbar = () => {
  const [studentData, setStudentData] = useState(null);
  const [studentGender, setStudentGender] = useState({});
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        if (studentId) {
          // Fetch student data by ID
          const studentResponse = await axios.get(`http://localhost:5000/StudentLogin/${studentId}`);
          setStudentData(studentResponse.data);

          // Fetch all student records to get gender
          const response = await axios.get("http://localhost:5000/GetStudentRecord");
          const { Students, Sschedule } = response.data;
          const studentRecord =Students.find((s) => s.StudentID === studentId);
          setStudentGender(studentRecord || {});
        } else {
          alert("No student ID found. Please log in again.");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [studentId]);

  return (
    <div className="Snavbar">
      <div className="Snavbar-logo">
        <img src={logo} alt="logo" />
        <p>Education System</p>
      </div>
      <Link to="/StudentDashboard" className="Snavbar-homeButton">
        Home
      </Link>
      <div className="Snavbar-loginCart">
        
        {studentData && studentGender ? (
          <>
            <img
              src={studentGender.Gender === "Male" ? mstudent : fstudent}
              alt="Student Icon"
            />
            <p>{studentData?.StudentID || "Guest"}{" "}
            {studentData?.LastName || ""}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <Link to="/">
          <button className="Snavbar-logoutButton">Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Snavbar;
