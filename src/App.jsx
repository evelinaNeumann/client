//doing the very first commit test
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react"; // Import useState hook
import { useContext } from "react";
import { AuthContext } from "../../client/src/context/auth.context";

import io from "socket.io-client";

import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import GuidelinesPage from "./pages/GuidelinesPage/GuidelinesPage";
import ShopHomePage from "./pages/ShopHomePage/ShopHomePage";
import OwnerSignupPage from "./pages/OwnerSignupPage/OwnerSignupPage";
import OwnerLoginPage from "./pages/OwnerLoginPage/OwnerLoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import CartPage from "./pages/CartPage/CatPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import LiveChat from "./components/LiveChat/LiveChat";

const socket = io.connect("http://localhost:5005");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const joinRoom = () => {
    console.log(username, room);
    if (username !== "" && room !== "") socket.emit("join_room", room);
    setShowChat(true);
  };

  return (
    <div className="App">
      {!showChat ? (
        <>
       
          <><Navbar /></>
       
          
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />

            <Route path="/guidelines" element={<GuidelinesPage />} />
            <Route path="/shop" element={<ShopHomePage />} />
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/cart" element={<CartPage />} />

            <Route
              path="/profile"
              element={
                <IsPrivate>
                  <ProfilePage />
                </IsPrivate>
              }
            />

            <Route
              path="/signup"
              element={
                <IsAnon>
                  <SignupPage />
                </IsAnon>
              }
            />

            <Route
              path="/ownersignup"
              element={
                <IsAnon>
                  <OwnerSignupPage />
                </IsAnon>
              }
            />

            <Route
              path="/ownerlogin"
              element={
                <IsAnon>
                  <OwnerLoginPage />
                </IsAnon>
              }
            />

            <Route
              path="/login"
              element={
                <IsAnon>
                  <LoginPage />
                </IsAnon>
              }
            />
          </Routes>

          <div className="joinChatContainer">
            <h3 className="joinChatHeader">Join a chat</h3>
            <input
              type="text"
              placeholder="Name..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              className="joinChatInput"
            />
            <input
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
              className="joinChatInput"
            />
            <button onClick={joinRoom} className="joinChatButton">
              Join a room
            </button>
          </div>
        </>
      ) : (
        <LiveChat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
