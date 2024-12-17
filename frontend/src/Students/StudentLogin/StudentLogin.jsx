import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentLogin.css'; 
import studentIcon from './student.png'; 

const StudentLogin = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
            const response = await axios.post('http://localhost:5000/StudentLogin', {
                StudentID: user,
                StudentPassword: password,
            });

            if (response.data && response.data.message === "Login successful") {
                alert("Login successful!");
                navigate('/StudentDashboard');
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error logging in", error);
            alert("An error occurred during login");
        } 
    };

    return (
        <div className="Studentmain">
            <div className="Studentsubmain">
                <form onSubmit={handleLogin}>
                    <div className="StudentTitle">
                        <img src={studentIcon} alt="Student Icon" />
                        <h2>Student Login</h2>
                    </div>
                    <div className="inputfield">
                        <input
                            type="text"
                            name="user"
                            placeholder="Enter Student ID"
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
                        <p className='p'>Forgot password? Contact <a href="mailto:support@spa.com">support@spa.com</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentLogin;
