import React, { useContext } from "react";
import { Context } from "../Context/Context";
import "./Navbar.css";
import searchicon from "../AdminAssets/searchicon.png";
const Navbar = () => {
  const { username } = useContext(Context);

  return (
    <div className="">
      {/* <div class="search-container">
        <input type="text" placeholder="Search..." class="search-input" />
        <img src={searchicon} alt="" className="search-icon" />
      </div>

      <div className="username">
        <p>Welcome {username}</p>
      </div> */}
    </div>
  );
};

export default Navbar;
