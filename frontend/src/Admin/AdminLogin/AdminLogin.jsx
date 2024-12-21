import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";
import adminImage from "../AdminAssets/admin.png";

const AdminLogin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/Adminlogin", {
        AdminUserID: user,
        AdminPassword: password,
      });

      if (response.data.adminId) {
        localStorage.setItem("adminId", response.data.adminId);
        alert("Login successful!");
        localStorage.setItem('role', 'admin');
        navigate("/AdminDashboard");
      } else {
        alert(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className="Adminmain">
      <div className="Adminsubmain">
        <form onSubmit={handleLogin}>
          <div className="AdminTitle">
            <img src={adminImage} alt="Admin" />
            <h2>Admin Login</h2>
          </div>
          <div className="inputfield">
            <input
              type="text"
              name="user"
              placeholder="Enter user name"
              value={user}
              required
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">LOGIN</button>
            <p className="p">
              Forgot password? Contact{" "}
              <a href="mailto:superadmin@spa.com">superadmin@spa.com</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
