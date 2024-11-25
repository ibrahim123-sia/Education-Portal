import React from "react";
import "./Footer.css";
import footer_logo from "./logo.png";
import whatsapp from "./whatsapp.png";
import facebook from "./facebook.png";
import instagram from "./instagram.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icon-container">
          <img src={whatsapp} alt="" />
        </div>
        <div className="footer-icon-container">
          <img src={facebook} alt="" />
        </div>
        <div className="footer-icon-container">
          <img src={instagram} alt="" />
        </div>
      </div>
      <div className="footer-copy-right">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
