import React from "react";
import userAndrew from "../img/user_andrew.png";
import { signOut } from "firebase/auth";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Realtime chat</span>
      <div className="user">
        <img src={userAndrew} alt="user" />
        <span>Andrew</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar;