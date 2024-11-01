import React, { useState, useEffect, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          // Convert the object to array, filter valid entries, and sort by date
          const chatsArray = Object.entries(data)
            .map(([id, chat]) => ({
              id,
              ...chat
            }))
            .filter(chat => {
              // Check if chat has valid userInfo
              return chat.userInfo && 
                     chat.userInfo.uid && 
                     chat.userInfo.displayName && 
                     chat.userInfo.photoURL;
            })
            .sort((a, b) => {
              // Sort by date, handling missing dates
              const dateA = a.date?.seconds || 0;
              const dateB = b.date?.seconds || 0;
              return dateB - dateA;
            });

          setChats(chatsArray);
        }
      });

      return () => unsub();
    };

    if (currentUser?.uid) {
      getChats();
    } else {
      setChats([]); // Clear chats if no user
    }
  }, [currentUser?.uid]);

  const handleSelect = (userInfo) => {
    if (userInfo && userInfo.uid) {
      dispatch({ type: "CHANGE_USER", payload: userInfo });
    }
  };

  return (
    <div className="chats">
      {chats.map((chat) => (
        chat.userInfo && (  // Additional check before rendering
          <div
            className="userChat"
            key={chat.id}
            onClick={() => handleSelect(chat.userInfo)}
          >
            <img 
              src={chat.userInfo.photoURL} 
              alt={chat.userInfo.displayName}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "path-to-default-avatar.png"; // Add a default avatar image
              }}
            />
            <div className="userChatInfo">
              <span>{chat.userInfo.displayName}</span>
              {chat.lastMessage?.text && (
                <p>{chat.lastMessage.text.slice(0, 50)}{chat.lastMessage.text.length > 50 ? '...' : ''}</p>
              )}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default Chats;