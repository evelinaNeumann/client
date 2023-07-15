import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Logo from "../../images/Logo2.png";


function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const handleChatClick = () => {
    // Implement the logic for opening the live chat window
    // e.g., using a chat library or triggering a chat modal
    console.log("Open live chat");
  };

  return (

    <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center ">
        <span className="text-2xl font-[Poppins] cursor-pointer">
        <img className="h-10 inline" src={Logo} alt="Friends Furr-ever" />
        </span>

        <span className="text-3xl cursor-pointer mx-2 md:hidden block">
          <ion-icon nameName="menu" onclick="Menu(this)"></ion-icon>
        </span>
      </div>

      {isLoggedIn && (
        <>
          <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
            <li className="mx-4 my-6 md:my-0">
              <Link to="/home" className="text-xl hover:text-white duration-500 hover:bg-lime-800  hover:p-2 hover:rounded-lg">
                Home
              </Link>
            </li>

            <li className="mx-4 my-6 md:my-0">
              <Link to="/guidelines" className="text-xl hover:text-white duration-500 hover:bg-lime-800  hover:p-2 hover:rounded-lg">
                Guidelines
              </Link>
            </li>

            <li className="mx-4 my-6 md:my-0">
              <Link to="/shop" className="text-xl hover:text-white duration-500 hover:bg-lime-800  hover:p-2 hover:rounded-lg">
                Shop
              </Link>
            </li>
            <li className="mx-4 my-6 md:my-0">
              <Link to="/profile" className="text-xl  hover:text-white duration-500 hover:bg-lime-800  hover:p-2 hover:rounded-lg">
                Profile
              </Link>
            </li>
            <li className="mx-4 my-6 md:my-0">
              <button onClick={handleChatClick} className="text-xl  hover:text-white duration-500 hover:bg-lime-800  hover:p-2 hover:rounded-lg">
                Live Chat
              </button>
            </li>
            <li className="mx-4 my-6 md:my-0">
              <button onClick={logOutUser} className="text-xl  hover:text-white duration-500 hover:bg-red-500  hover:p-2 hover:rounded-lg">
                Logout
              </button>
            </li>
            <span>{user && user.name}</span>
          </ul>
        </>
      )}

      {!isLoggedIn && (
        <>
          <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">

            <li className="mx-4 my-6 md:my-0">
              <Link to="/home" className="text-xl hover:text-white duration-500 hover:bg-lime-800  hover:p-2 hover:rounded-lg">
                Home
              </Link>
            </li>

            <li className="mx-4 my-6 md:my-0">
              <Link to="/guidelines" className="text-xl hover:text-white duration-500 hover:bg-lime-800  hover:p-2 hover:rounded-lg">
                Guidelines
              </Link>
            </li>

            <li className="mx-4 my-6 md:my-0">
              <Link to="/" className="text-xl hover:text-white duration-500 hover:bg-lime-800  hover:p-2 hover:rounded-lg">
                Login
              </Link>
            </li>

            <li className="mx-4 my-6 md:my-0">
              <Link to="/shop" className="text-xl hover:text-white duration-500 hover:bg-lime-800  hover:p-2 hover:rounded-lg">
                Shop
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
}

export default Navbar;
