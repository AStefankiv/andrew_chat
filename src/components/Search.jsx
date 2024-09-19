import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  serverTimestamp,
  getDoc,
  setDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        const allUsers = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.uid !== currentUser.uid) {
            allUsers.push(userData);
          }
        });
        setUsers(allUsers);
        setFilteredUsers(allUsers);
      } catch (error) {
        setErr(true);
        console.log("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, [currentUser.uid]);

  useEffect(() => {
    if (username === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          user.displayName.toLowerCase().includes(username.toLowerCase())
        )
      );
    }
  }, [username, users]);

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

      dispatch({ type: "CHANGE_USER", payload: user });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}

      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div className="userChat" key={user.uid} onClick={() => handleSelect(user)}>
            <img src={user.photoURL} alt="user" />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        ))
      ) : (
        <span>No users found!</span>
      )}
    </div>
  );
};

export default Search;