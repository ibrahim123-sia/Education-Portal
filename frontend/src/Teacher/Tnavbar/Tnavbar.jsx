import './Tnavbar.css';
import axios from 'axios';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import fteacher from './fteacher.png';
import mteacher from './mteacher.png';
import { useState, useEffect } from 'react';

const Tnavbar = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [teacherRecord, setTeacherRecord] = useState({});
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        if (teacherId) {
          const teacherResponse = await axios.get(`http://localhost:5000/TeacherLogin/${teacherId}`);
          setTeacherData(teacherResponse.data);

          const recordResponse = await axios.get("http://localhost:5000/GetTeacherRecord");
          const { Teachers } = recordResponse.data;
          const teacher = Teachers.find((t) => t.TeacherID === teacherId);
          setTeacherRecord(teacher || {});
        } else {
          alert("No teacher ID found. Please log in again.");
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchTeacherData();
  }, [teacherId]);

  return (
    <div className="Tnavbar">
      <div className="Tnavbar-logo">
        <img src={logo} alt="logo" />
        <p>Education System</p>
      </div>
      <Link to="/TeacherDashboard" className="Tnavbar-homeButton">
        Home
      </Link>
      <div className="Tnavbar-loginCart">
        {teacherData && teacherRecord ? (
          <>
            <img
              src={teacherRecord.Gender === "Male" ? mteacher : fteacher}
              alt="Teacher Icon"
            />
            <p>{teacherData?.TeacherUserID || "Guest"} {teacherData?.LastName || ""}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <Link to="/">
          <button className="Tnavbar-logoutButton">Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Tnavbar;
