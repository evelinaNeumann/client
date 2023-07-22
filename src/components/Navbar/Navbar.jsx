import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Logo from "../../images/Logo2.png"
import { useState } from "react"; // import state

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (
    <div className="flex items-center justify-between border-b border-lime-800 p-8">
      <a href="/">
        <img className="h-10 inline" src={Logo} alt="Friends Furr-ever" />
      </a>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
          >
            <span className="block h-0.5 w-8 animate-pulse bg-lime-800"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-lime-800"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-lime-800"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}> 
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-lime-800"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>

            {isLoggedIn ? (
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-lime-800 my-8 uppercase">
                <Link to="/home" className="text-xl duration-500">Home</Link>
              </li>
              <li className="border-b border-lime-800 my-8 uppercase">
                <Link to="/guidelines" className="text-xl duration-500">Guidelines</Link>
              </li>
              <li className="border-b border-lime-800 my-8 uppercase">
                <Link to="/shop" className="text-xl duration-500">Shop</Link>
              </li>
              <li className="border-b border-lime-800 my-8 uppercase">
                <Link to="/profile" className="text-xl duration-500">Profile</Link>
              </li>
              <li className="border-b border-lime-800 my-8 uppercase">
                <button onClick={logOutUser} className="text-xl">
                  LOGOUT
                </button>
              </li>
            </ul>) : (
              <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-lime-800 my-8 uppercase">
                <Link to="/home" className="text-xl duration-500">Home</Link>
              </li>
              <li className="border-b border-lime-800 my-8 uppercase">
                <Link to="/guidelines" className="text-xl duration-500">Guidelines</Link>
              </li>
              <li className="border-b border-lime-800 my-8 uppercase">
                <Link to="/shop" className="text-xl duration-500">Shop</Link>
              </li>
              <li className="border-b border-lime-800 my-8 uppercase">
                <Link to="/" className="text-xl duration-500">Login</Link>
              </li>
            </ul>
            )}
          </div>
        </section>

        {isLoggedIn ? (
        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
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
               <button onClick={logOutUser} className="text-xl  hover:text-white duration-500 hover:bg-red-500 hover:rounded-lg">
                 Logout
               </button>
             </li>
             <span>{user && user.name}</span>
        </ul>
        ) : (
          <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
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
               <Link to="/shop" className="text-xl  hover:text-white duration-500 hover:bg-lime-800  hover:p-2 hover:rounded-lg">
                 Shop
               </Link>
             </li>
             <li className="mx-4 my-6 md:my-0">
               <Link to="/" className="text-xl hover:text-white duration-500 hover:bg-lime-800  hover:p-2 hover:rounded-lg">
                 Login
               </Link>
             </li>

        </ul>
        )}
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}