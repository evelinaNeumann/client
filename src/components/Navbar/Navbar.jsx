import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const handleChatClick = () => {
    // Implement the logic for opening the live chat window
    // e.g., using a chat library or triggering a chat modal
    console.log("Open live chat");
  };

  return (
    <nav className="flex justify-end space-x-2 mt-2 mr-2">
      <Link to="/home" className="px-4 py-2 rounded bg-lime-800 text-white hover:bg-lime-800">
        Home
      </Link>

      {isLoggedIn && (
        <>
          <button onClick={logOutUser} className="px-4 py-2 rounded bg-lime-800 text-white hover:bg-lime-800">
            Logout
          </button>

          <Link to="/profile" className="px-4 py-2 rounded bg-lime-800 text-white hover:bg-lime-800">
            Profile
          </Link>

          <Link to="/guidelines" className="px-4 py-2 rounded bg-lime-800 text-white hover:bg-lime-800">
            Guidelines
          </Link>

          <Link to="/shop" className="px-4 py-2 rounded bg-lime-800 text-white hover:bg-lime-800">
            Shop
          </Link>

          <button onClick={handleChatClick} className="px-4 py-2 rounded bg-lime-800 text-white bg-lime-800">
            Live Chat
          </button>

          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup" className="px-4 py-2 rounded bg-lime-800 text-white hover:bg-lime-800">
            Sign Up
          </Link>

          <Link to="/login" className="px-4 py-2 rounded bg-lime-800 text-white hover:bg-lime-800">
            Login
          </Link>

          <Link to="/guidelines" className="px-4 py-2 rounded bg-lime-800 text-white hover:bg-lime-800">
            Guidelines
          </Link>

          <Link to="/shop" className="px-4 py-2 rounded bg-lime-800 text-white hover:bg-lime-800">
            Shop
          </Link>

          <button onClick={handleChatClick} className="px-4 py-2 rounded bg-lime-800 text-white hover:bg-lime-800">
            Live Chat
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
