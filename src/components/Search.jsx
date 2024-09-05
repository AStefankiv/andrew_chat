import React, { useState } from "react";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = () => {};

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" onKeyDown={handleKey} onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div className="userChat">
          <img src="https://hackspirit.com/wp-content/uploads/2021/06/Copy-of-Rustic-Female-Teen-Magazine-Cover.jpg" alt="user" />
        <div className="userChatInfo">
          <span>Linh</span>
          </div>
        </div>
    </div>
  )
}

export default Search;