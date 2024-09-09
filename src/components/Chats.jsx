import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext"

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if (!currentUser?.uid) return;

      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          setChats(doc.data());
        } else {
          setChats({});
        }
      });

      return () => {
        unsub();
      };
    };

    getChats();
  }, [currentUser]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  }

  return (
    <div className="chats">
      {Object.entries(chats)?.map(([id, chat]) => (
      // {Object.entries(chats)?.map(([chat]) => (
        <div className="userChat" key={id} onClick={() => {handleSelect(chat.userInfo)}}>
        {/* <div className="userChat" key={chat[0]} onClick={() => {handleSelect(chat[1].userInfo)}}> */}
          <img src={chat.userInfo.photoURL} alt="user" />
          {/* <img src={chat[1].userInfo.photoURL} alt="user" /> */}
          <div className="userChatInfo">
            <span>{chat.userInfo.displayName}</span>
            {/* <span>{chat[1].userInfo.displayName}</span> */}
            <p>{chat.userInfo.lastMessage?.text}</p>
            {/* <p>{chat[1].userInfo.lastMessage?.text}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
