import React, { useContext } from "react";
import camera from "../img/camera.png";
import add_friend from "../img/add-friend.png";
import more from "../img/more.png";
import light from "../img/light.png";
import dark from "../img/dark.png";
import Messages from "./Messages";

import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = ({ onToggleBackground, bgColor }) => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <button onClick={onToggleBackground}>{bgColor === "#180161" ? <img src={light} alt="light" /> : <img src={dark} alt="dark" />}</button>
          <img src={camera} alt="camera" />
          <img src={add_friend} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;