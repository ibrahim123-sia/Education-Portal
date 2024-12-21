import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer class="admin-footer">
  <div class="footer-left">
    <p>© 2024 School Management System. All rights reserved.</p>
  </div>
  <div class="footer-center">
    <p>Last Updated: November 20, 2024 | Portal Version: 1.0.0</p>
  </div>
  <div class="footer-right">
    <p>
      <a href="/dashboard">Dashboard</a> | 
    <a href="/settings"> Settings</a> | 
      <a href="/reports"> Reports  </a>
      Need help? <a href="mailto:it.support@schoolportal.com">Contact Support</a>
    </p>
    
  </div>
</footer>

  );
};

export default Footer;
