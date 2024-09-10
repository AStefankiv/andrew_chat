import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  if (!currentUser?.uid) {
    console.log('No current user found');
    return null;
  }

  useEffect(() => {
    const getChats = () => {

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

    currentUser.uid && getChats();
  }, [currentUser]);

  console.log("Current user in Chats:", currentUser);
  console.log("Chats:", chats);

  const handleSelect = (u) => {
    console.log('Selected user:', u);
    if (!u || !u.uid) {
      console.log('User UID is missing');
      return;
    }
    dispatch({ type: "CHANGE_USER", payload: u });
  }

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a, b)=>b[1].date - a[1].date).map(([id, chat]) => {
        // console.log('Chattttttttt:', chat.userInfo);
        if (!chat?.userInfo) {
          console.log(`Chat ${id} is missing userInfo`);
          return null;
        }
        return (
        <div className="userChat" key={id} onClick={() => handleSelect(chat.userInfo)}>
          <img src={chat.userInfo.photoURL} alt="user" />
          <div className="userChatInfo">
            <span>{chat.userInfo.displayName}</span>
            <p>{chat.lastMessage?.text}</p>
          </div>
        </div>
        );
      })}
    </div>
  );
};

export default Chats;
