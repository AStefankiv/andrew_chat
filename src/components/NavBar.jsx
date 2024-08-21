import React from "react";
import userAndrew from "../img/user_andrew.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Realtime chat</span>
      <div className="user">
        <img src={userAndrew} alt="user" />
        <span>Andrew</span>
        <button>Logout</button>
        </div>
    </div>
  )
}

export default Navbar;