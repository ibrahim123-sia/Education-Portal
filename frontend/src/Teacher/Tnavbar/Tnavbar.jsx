import './Tnavbar.css';
import axios from 'axios';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import fteacher from './fteacher.png';
import mteacher from './mteacher.png';
import { useState, useEffect } from 'react';

const Tnavbar = () => {
  const [teacherGender, setTeachergender] = useState({});
  const [TeacherData, setTeacherData] = useState(null);
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        if (teacherId) {
          const response = await axios.get(`http://localhost:5000/TeacherLogin/${teacherId}`);
          setTeacherData(response.data);
          const gender = await axios.get("http://localhost:5000/GetTeacherRecord");
        const Teachers= response.data;
        const teacher = Teachers.find((t) => t.TeacherID === teacherId);
        setTeachergender(teacher || {});
        }
        
      } 
      catch (error) {
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
        <img
                        src={teacherGender.Gender === "Male" ? mteacher : fteacher}
                        alt="Teacher Icon"
                      />
        <p>{TeacherData ? TeacherData.TeacherUserID : "Teacher"}</p>
        <Link to="/">
          <button className="Tnavbar-logoutButton">Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Tnavbar;
