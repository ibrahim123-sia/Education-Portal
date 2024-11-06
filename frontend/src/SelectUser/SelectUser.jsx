import React from "react";
import './SelectUser.css';
import adminImage from '../Assets/admin.png';
import teacherImage from '../Assets/teacher.png';
import studentImage from '../Assets/student.png';
import { Link } from "react-router-dom";

const SelectUser = () => {
  return (
    <div className="main">
      <div className="submain">
        <div className="student">
          <Link to='/AdminLogin'><div className="inner-student">
            <div className="Image"><img src={adminImage} alt="Student" /></div>
            <h3>Admin Portal</h3>
          </div></Link>
        </div>
        <div className="teacher">
          <div className="inner-teacher">
            <div className="Image"><img src={teacherImage} alt="Teacher" /></div>
            <h3>Teacher Portal</h3>
          </div>
        </div>
        <div className="admin">
          <div className="inner-admin">
            <div className="Image"><img src={studentImage} alt="Admin" /></div>
            <h3>Student Portal</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectUser;
