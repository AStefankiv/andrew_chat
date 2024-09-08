import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";

const Chats = () => {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      if (!currentUser?.uid) return; // Ensure currentUser is defined

      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          setChats(doc.data());
        } else {
          setChats({}); // Set an empty object if no chats exist
        }
      });

      return () => {
        unsub();
      };
    };

    getChats();
  }, [currentUser]);

  return (
    <div className="chats">
      {Object.entries(chats).map(([id, chat]) => (
        <div className="userChat" key={id}>
          <img src={chat.userInfo.photoURL} alt="user" />
          <div className="userChatInfo">
            <span>{chat.userInfo.displayName}</span>
            <p>{chat.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
