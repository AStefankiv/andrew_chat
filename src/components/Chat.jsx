import React from "react";
import camera from "../img/camera.png";
import add_friend from "../img/add-friend.png";
import more from "../img/more.png";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Linh</span>
        <div className="chatIcons">
          <img src={camera} alt="camera" />
          <img src={add_friend} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      <Messages />
    </div>
  )
}

export default Chat;