// import React from "react";
// import Navbar from "./NavBar";
// import Search from "./Search";
// import Chats from "./Chats";

// const SideBar = () => {
//   return (
//     <div className="sidebar">
//       <Navbar />
//       <Search />
//       <Chats />
//     </div>
//   )
// }

// export default SideBar;



import React, { useState } from "react";
import Navbar from "./NavBar";
import Search from "./Search";
import Chats from "./Chats";

const SideBar = () => {
  const [width, setWidth] = useState(300); // Initial sidebar width

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth > 200 && newWidth < 600) { // Set minimum and maximum width
        setWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="sidebar" style={{ width: `${width}px` }}>
      <Navbar />
      <Search />
      <Chats />
      <div
        className="resizer"
        onMouseDown={handleMouseDown}
        style={{ cursor: 'col-resize', width: '5px', height: '100%', background: 'transparent' }}
      ></div>
    </div>
  );
};

export default SideBar;
