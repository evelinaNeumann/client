import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5005");

const ProfilePage = () => {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    console.log(username, room);
    if (username !== "" && room !== "") socket.emit("join_room", room);
    setShowChat(true);
  };

console.log(user);
  return (
    <div>
<p>{user.name}</p>
<div className="joinChatContainer">
              <h3 className="joinChatHeader">Join a chat</h3>
              <input
                type="text"
                value={user.name}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                className="joinChatInput"
              />
              <input type="text" value={user._id} onChange={(event) => {setRoom(event.target.value)}} className="joinChatInput" />
              <button onClick={joinRoom} className="joinChatButton">
                Join a room
              </button>
            </div>
    </div>
  )
}

export default ProfilePage