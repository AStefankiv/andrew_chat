import React, { useState, useContext } from "react";
import add from "../img/add.png";
import attach from "../img/attach.png";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { arrayUnion, updateDoc, doc, Timestamp, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [ text, setText ] = useState("");
  const [ img, setImg ] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (!data?.chatId) {
      console.log('Chat Id is null. Cannot send message');
      console.log('Chat data:', data);
      return;
    }
    
    try {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.log('Error uploading:', error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text: text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
        }),
      })
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".userInfo.lastMessage"]: {
        text: text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".userInfo.lastMessage"]: {
        text: text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    
    setText("");
    setImg(null);
  } catch (error) {
    console.log('Error sending message:', error);
  }
}

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleSend();
  }
};

  return (
    <div className="input">
      <input type="text"
      placeholder="Type a message..."
      onChange={e=>setText(e.target.value)}
      value={text}
      onKeyDown={handleKeyDown}
      />
      <div className="send">
        <label htmlFor="file">
          <img src={attach} alt="" />
        </label>
        <input type="file"
        style={{display: "none"}}
        id="file"
        onChange={e=>setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={add} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input;