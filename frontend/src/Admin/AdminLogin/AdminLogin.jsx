import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './AdminLogin.css';
import adminImage from '../AdminAssets/admin.png';

const AdminLogin = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
            const response = await axios.post('http://localhost:5000/Adminlogin', {
                AdminUserID: user,
                AdminPassword: password,
            });

            if (response.data && response.data.message === "Login successful") {
                alert("Login successful!");
                navigate('/AdminDashboard'); 
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error logging in", error);
            alert("An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='Adminmain'>
            <div className="Adminsubmain">
                
                <form onSubmit={handleLogin}>  
                <div className='AdminTitle'>
                    <img src={adminImage} alt="" />
                    <h1 >Admin Login</h1>                    
                </div>                  
                    <div className="inputfield">
                    <input 
                        type="text"
                        name='user'
                        placeholder='Enter user name'
                        value={user}
                        required
                        onChange={handleChange}
                    />
                    <input 
                        type="password"
                        name='password'
                        placeholder='Enter Password'
                        value={password}
                        required
                        onChange={handleChange}
                    />
                    <button type='submit' disabled={loading}>
                        {loading ? "Logging in..." : "LOGIN"}
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
