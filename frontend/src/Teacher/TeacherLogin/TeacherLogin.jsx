import React, { useState } from 'react';

import axios from 'axios';
import './TeacherLogin.css';
import teacherIcon from './teacher.png'; 

const TeacherLogin = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'user') {
            setUser(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:5000/TeacherLogin', {
                TeacherID: user,
                TeacherPassword: password,
            });
    
            
            const teacherId = response.data.teacherId;
    
            
            if (teacherId) {
                localStorage.setItem("teacherId", teacherId); 
                window.location.href = "/TeacherDashboard"; 
                alert("Login successful!");
                localStorage.setItem('role', 'teacher'); 
            } else {
                alert(response.data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Error logging in", error);
            alert("An error occurred during login. Please try again later.");
        }
    };
    
    
    

    return (
        <div className="Teachermain">
            <div className="Teachersubmain">
                <form onSubmit={handleLogin}>
                    <div className="TeacherTitle">
                        <img src={teacherIcon} alt="Teacher Icon" />
                        <h2>Teacher Login</h2>
                    </div>
                    <div className="inputfield">
                        <input
                            type="text"
                            name="user"
                            placeholder="Enter Teacher ID"
                            value={user}
                            required
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={password}
                            required
                            onChange={handleChange}
                        />
                        <button type="submit">LOGIN</button>
                        <p className='p'>Forgot password? Contact <a href="mailto:admin@spa.com">admin@spa.com</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeacherLogin;
