import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";

const Chats = () => {
  const [chats, setChats] = useState([]);
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
      {Object.entries(chats)?.map(([chat]) => (
        <div className="userChat" key={chat[0]}>
          <img src={chat[1].userInfo.photoURL} alt="user" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].userInfo.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
