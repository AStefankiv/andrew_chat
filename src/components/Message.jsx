import React from "react";
import user_andrew from "../img/user_andrew.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({message}) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  console.log('Message:', message);
  return (
    <div className="message owner">
      {/* <div className="messageInfo">
        <img src=
        alt=""
        />
        <span>just now</span>
        </div>
      <div className="messageContent">
          <p>Hey, how are you?</p>
          <img src={user_andrew} alt="" />
      </div> */}
    </div>
  )
}

export default Message;