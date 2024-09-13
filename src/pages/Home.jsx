import React , { useState } from 'react';
import SideBar from '../components/SideBar';
import Chat from '../components/Chat';

const Home = () => {

  const [bgColor, setBgColor] = useState("#180161");

  const toggleBackgroundColor = () => {
    setBgColor((prev) => prev === "#180161" ? "#f0f0f0" : "#180161");
  };

  return (
    <div className="home" style={{ backgroundColor: bgColor }}>
      <div className="container">
        <SideBar />
        <Chat onToggleBackground={toggleBackgroundColor} bgColor={bgColor} />
      </div>
    </div>
  );
}

export default Home;