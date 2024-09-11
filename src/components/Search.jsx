import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
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
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
            });
          } catch (error) {
            setErr(true);
          }
        }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    const combinedId =
    currentUser.uid > user.uid
    ? currentUser.uid + user.uid
    : user.uid + currentUser.uid;

    console.log('Combined chat ID:', combinedId);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc (db, "chats", combinedId), {messages: []});

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId+".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId+".userInfo"]: {
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
    // setUser(null);
    setUsername("");
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e)=>setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="user" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;











// import React, { useContext, useState, useEffect } from "react";
// import {
//   collection,
//   query,
//   getDocs,
//   serverTimestamp,
//   getDoc,
//   setDoc,
//   updateDoc,
//   doc
// } from "firebase/firestore";
// import { db } from "../firebase";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";

// const Search = () => {
//   const [username, setUsername] = useState(""); // For search input
//   const [users, setUsers] = useState([]); // Stores all users
//   const [filteredUsers, setFilteredUsers] = useState([]); // Stores filtered users based on search
//   const [err, setErr] = useState(false);

//   const { currentUser } = useContext(AuthContext); // Logged-in user
//   const { dispatch } = useContext(ChatContext);

//   // Fetch all users when the component mounts
//   useEffect(() => {
//     const fetchAllUsers = async () => {
//       try {
//         const q = query(collection(db, "users"));
//         const querySnapshot = await getDocs(q);
//         const allUsers = [];
//         querySnapshot.forEach((doc) => {
//           const userData = doc.data();
//           // Exclude the current logged-in user
//           if (userData.uid !== currentUser.uid) {
//             allUsers.push(userData);
//           }
//         });
//         setUsers(allUsers); // Store all users except the logged-in user
//         setFilteredUsers(allUsers); // Set initial state for filtered users
//       } catch (error) {
//         setErr(true);
//         console.log("Error fetching users:", error);
//       }
//     };

//     fetchAllUsers();
//   }, [currentUser.uid]);

//   // Filter users based on the search input
//   useEffect(() => {
//     if (username === "") {
//       setFilteredUsers(users); // Show all users except the logged-in user if search input is empty
//     } else {
//       setFilteredUsers(
//         users.filter((user) =>
//           user.displayName.toLowerCase().includes(username.toLowerCase())
//         )
//       );
//     }
//   }, [username, users]);

//   const handleSelect = async (user) => {
//     const combinedId =
//       currentUser.uid > user.uid
//         ? currentUser.uid + user.uid
//         : user.uid + currentUser.uid;

//     try {
//       const res = await getDoc(doc(db, "chats", combinedId));

//       if (!res.exists()) {
//         // Create a new chat in Firestore if it doesn't exist
//         await setDoc(doc(db, "chats", combinedId), { messages: [] });

//         await updateDoc(doc(db, "userChats", currentUser.uid), {
//           [combinedId + ".userInfo"]: {
//             uid: user.uid,
//             displayName: user.displayName,
//             photoURL: user.photoURL,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         });

//         await updateDoc(doc(db, "userChats", user.uid), {
//           [combinedId + ".userInfo"]: {
//             uid: currentUser.uid,
//             displayName: currentUser.displayName,
//             photoURL: currentUser.photoURL,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         });
//       }

//       // Dispatch action to change the chat user
//       dispatch({ type: "CHANGE_USER", payload: user });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="search">
//       <div className="searchForm">
//         <input
//           type="text"
//           placeholder="Find a user"
//           onChange={(e) => setUsername(e.target.value)}
//           value={username}
//         />
//       </div>
//       {err && <span>User not found!</span>}

//       {filteredUsers.length > 0 ? (
//         filteredUsers.map((user) => (
//           <div className="userChat" key={user.uid} onClick={() => handleSelect(user)}>
//             <img src={user.photoURL} alt="user" />
//             <div className="userChatInfo">
//               <span>{user.displayName}</span>
//             </div>
//           </div>
//         ))
//       ) : (
//         <span>No users found!</span>
//       )}
//     </div>
//   );
// };

// export default Search;