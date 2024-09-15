import React, { useContext, useState } from "react";
import camera from "../img/camera.png";
import add_friend from "../img/add-friend.png";
import more from "../img/more.png";
import light from "../img/light.png";
import dark from "../img/dark.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import CameraReflection from "./CameraReflection";

const Chat = ({ onToggleBackground, bgColor }) => {
  const { data } = useContext(ChatContext);
  const [showCamera, setShowCamera] = useState(false);

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <button onClick={onToggleBackground}>
            {bgColor === "#180161" ? (
              <img src={light} alt="light" />
            ) : (
              <img src={dark} alt="dark" />
            )}
          </button>
          <img src={camera} alt="camera" onClick={handleOpenCamera} />
          <img src={add_friend} alt="add-friend" />
          <img src={more} alt="more" />
        </div>
      </div>

      <Messages />
      <Input />

      {showCamera && <CameraReflection onClose={handleCloseCamera} />}
    </div>
  );
};

export default Chat;
