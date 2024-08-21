import React from "react";
import Navbar from "./NavBar";
import Search from "./Search";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      
    </div>
  )
}

export default SideBar;