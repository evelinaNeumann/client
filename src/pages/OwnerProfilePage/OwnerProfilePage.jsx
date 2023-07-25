// OwnerProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context";
import catIcon from "../../images/cat-profile.jpg";
import bgImg from "../../images/bg-landing-2.jpg";


import io from "socket.io-client";
const socket = io.connect("http://localhost:5005");

function OwnerProfilePage() {
  const { user} = useContext(AuthContext);
  const { ownerId } = useParams();
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  
  const [username, setUsername] = useState("");
  const [owner, setOwner] = useState(null);


  const joinRoom = () => {
    if (username !== "" && room !== "") socket.emit("join_room", room);
    setShowChat(true);
  };

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const res = await fetch(`http://localhost:5005/api/owner/${ownerId}`);
        const data = await res.json();
        setOwner(data);
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };
    fetchOwnerData();
  }, [ownerId]);

  if (!owner) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{backgroundImage: `url(${bgImg})`, objectFit: "scale-down" }}>

<div className="flex justify-center py-12 px-6">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={catIcon} alt="Profile picture"/>
          <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{owner.ownerName}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400 py-3">{owner.zip} , {owner.city} , {owner.country}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 py-3"><span className="font-bold">Email:</span> {owner.ownerEmail}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 py-3">Phone: <span className="font-bold">{owner.ownerPhone}</span></span>

      </div>
      
      <div className="">
                <h3 className="joinChatHeader">Join a chat</h3>
                <input type="text" value={user.name} onChange={(event) => {setUsername(event.target.value);}} className="joinChatInput"/>
                <input type="text" value={owner._id} onChange={(event) => {setRoom(event.target.value)}} className="joinChatInput" />
                <button onClick={joinRoom} className="joinChatButton">
                  Join a room
                </button>
      </div>
  </div>
      </div>


    </div>
  );
}

export default OwnerProfilePage;

