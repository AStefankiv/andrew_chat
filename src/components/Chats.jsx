import React from "react";

const Chats = () => {
  return (
    <div className="chats">
      <div className="userChat">
        <img src="https://hackspirit.com/wp-content/uploads/2021/06/Copy-of-Rustic-Female-Teen-Magazine-Cover.jpg" alt="user" />
        <div className="userChatInfo">
          <span>Linh</span>
          <p>Hey, how are you?</p>
        </div>
      </div>
      <div className="userChat">
        <img src="https://hackspirit.com/wp-content/uploads/2021/06/Copy-of-Rustic-Female-Teen-Magazine-Cover.jpg" alt="user" />
        <div className="userChatInfo">
          <span>Linh</span>
          <p>What's up, Andrew?</p>
        </div>
      </div>
      <div className="userChat">
        <img src="https://hackspirit.com/wp-content/uploads/2021/06/Copy-of-Rustic-Female-Teen-Magazine-Cover.jpg" alt="user" />
        <div className="userChatInfo">
          <span>Linh</span>
          <p>No, I didn't.</p>
        </div>
      </div>
    </div>
  )
}

export default Chats;