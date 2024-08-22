import React from "react";
import add from "../img/add.png";
import attach from "../img/attach.png";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type a message..." />
      <div className="send">
        <img src={attach} alt="" />
        <input type="file" style={{display: "none"}} id="file" />
        <label htmlFor="file">
          <img src={add} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input;