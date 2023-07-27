import React from 'react'
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import LiveChat from "../../components/LiveChat/LiveChat";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5005");

const LiveChatPage = () => {
    const { user} = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    console.log(username, room);
    if (username !== "" && room !== "") socket.emit("join_room", room);
    setShowChat(true);
  };

  return (
    <div>
     {!showChat ? (
            <div className="">
              <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Contact me</h3>
              <div className="grid grid-col px-7">
                <input type="text" value={user.name} onChange={(event) => { setUsername(event.target.value); }} className="joinChatInput" />
                <input type="text" value={user._id} onChange={(event) => { setRoom(event.target.value) }} className="joinChatInput" />
                <button onClick={joinRoom} className="bg-lime-800 text-white p-2 rounded border hover:bg-orange-500">
                  Join a room
                </button>
              </div>
            </div>) : (
                <>
    <LiveChat socket={socket} username={username} room={room} /></>
   )} </div>
  )
}

export default LiveChatPage