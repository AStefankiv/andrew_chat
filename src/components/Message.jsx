import React from "react";
import user_andrew from "../img/user_andrew.png";

const Message = () => {
  return (
    <div className="message">
      <div className="messageInfo">
      <img src={user_andrew} alt="" />
      <span>just now</span>
        <div className="messageContent">
          <p>Hey, how are you?</p>
          <img src={user_andrew} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Message;
//40 minutes