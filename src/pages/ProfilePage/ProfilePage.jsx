
import React, {  useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
//import io from "socket.io-client";
import catIcon from "../../images/cat-profile.jpg";
import bgImg from "../../images/bg-landing-2.jpg";


const ProfilePage = () => {
    const { user} = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

console.log(user);
  return (
    <div style={{backgroundImage: `url(${bgImg})`, objectFit: "scale-down" }}>

<div className="flex justify-center py-12 px-6">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            onClick={toggleDropdown}
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>

          <div
            id="dropdown"
            className={`${
              isDropdownOpen ? "block" : "hidden"
            } z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
              <Link to="/editprofile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                 Edit my profile
               </Link>
              </li>
            </ul>
          </div>
        </div>

      <div className="flex flex-col items-center pb-10">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={catIcon} alt={user.name || "Profile picture"}/>

          {user.name &&(
            <>
          <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400 py-3"><span className="font-bold">Email:</span> {user.email}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 py-3">I'm currently looking for <span className="font-bold">{user.preference}</span></span>
          </>
          )}
          

          {user.ownerName && (
            <>
            <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{user.ownerName}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400 py-3"><span className="font-bold">Email:</span> {user.ownerEmail}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 py-3"><span className="font-bold">Phone:</span> {user.ownerPhone}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 py-3">{user.zip} , {user.city} , {user.country}</span>
            </>
          )}

      </div>
  </div>
      </div>

    </div>
    
  )
}

export default ProfilePage