import "./StudentLogin.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import studentIcon from './student.png';

const StudentLogin = () => {
    const navigate = useNavigate();
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
            const response = await axios.post('http://localhost:5000/StudentLogin', {
                StudentID: user,
                StudentPassword: password,
            });

            const studentId = response.data.studentId;

            if (studentId) {
                localStorage.setItem("studentId", studentId);
                alert("Login successful!");
                localStorage.setItem('role', 'student');
                navigate("/StudentDashboard");
            } else {
                alert(response.data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Error logging in", error);
            alert("An error occurred during login. Please try again later.");
        }
    };

    return (
        <div className="Adminmain">
            <div className="Adminsubmain">
                <form onSubmit={handleLogin}>
                    <div className="AdminTitle">
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
                        <p className="HelpText">
                            Forgot password? Contact <a href="mailto:support@spa.com">support@spa.com</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentLogin;
