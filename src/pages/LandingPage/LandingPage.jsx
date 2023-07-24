//import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
//import { useState } from "react";
import catDoodle from "../../images/cat-doodle.jpg";
import dogDoodle from "../../images/dog-doodle.jpg";
import dogDoodle1 from "../../images/dog-doodle-1.jpg";
import landingHeader from "../../images/landing-page-img-1.png";
import handsIcon from "../../images/hands-icon.jpg";
import userIcon from "../../images/user-icon.jpg";
import catThinking from "../../images/cat-thinking.png";
import paws from "../../images/paws.png";

function LandingPage(props) {
  //const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { isLoggedIn, } = useContext(AuthContext);
  //  const navigate = useNavigate();
  return (
    <div>
      {!isLoggedIn && (
        <>
          <div className="text-5xl px-8 py-8 font-bold text-lime-800">
            <h1>Welcome! Sign up or log in to start the process</h1>
          </div>
          <div className="px-12 lg:flex lg:p-10">
            <div className="lg:w-1/2">
              <div className="sm:flex sm:flex-col sm:items-center sm:p-4">
                <div className="w-40 lg:w-30">
                  <img src={catDoodle} alt="Cat" className="w-full" />
                </div>
                <p className="text-2xl py-8">
                  Have you <span className="font-bold">found a pet</span> and are
                  now looking for a shelter? <br />
                  <Link
                    className="font-bold hover:text-orange-500"
                    to="/ownersignup"
                  >
                    Sign Up as an owner
                  </Link>{" "}
                  or{" "}
                  <Link className="font-bold hover:text-lime-800" to="/ownerlogin">
                    Login
                  </Link>
                </p>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="sm:flex sm:flex-col sm:items-center sm:p-4">
                <div className="w-40 lg:w-30">
                  <img src={dogDoodle} alt="Dog" className="w-full" />
                </div>
                <p className="text-2xl py-8">
                  Or are you <span className="font-bold">looking for a pet</span> to
                  give it a deserving home? <br />
                  <Link className="font-bold hover:text-orange-500" to="/signup">
                    Sign Up
                  </Link>{" "}
                  or{" "}
                  <Link className="font-bold hover:text-lime-800" to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </>
      )}


      <div>
        <div>
          <img src={landingHeader} alt="Friends Furr-ever App Header" />
        </div>

        <div className="px-12">
          <div className="flex justify-center">
            <img className="" src={paws} alt="Paws separator" />
          </div>

          <h1 className="text-5xl py-12 font-bold text-lime-800">
            Best app for finding your ideal pet
          </h1>
          <p className="text-2xl text-justify text-zinc-400 py-4">
            Friends Furr-ever is an app designed to connect pet owners looking
            to give their pets up for adoption with potential adopters
            interested in providing a loving home. For pet owners, "Friends
            Furr-ever" offers a convenient way to find suitable adopters for
            their pets. They can create profiles for their pets, sharing details
            about their personality, age, breed, and any other relevant
            information. For those interested in adopting pets, "Friends
            Furr-ever" provides a user-friendly interface to search for their
            ideal companion. Users can browse through various categories such as
            dogs, cats, or smaller animals and explore detailed profiles with
            photos and descriptions of each pet available for adoption. They can
            reach out to pet owners directly through the app to express
            interest, ask questions, and potentially arrange a visit to meet the
            pet in person.
            <br /> <br />
            Overall, Friends Furr-ever aims to bridge the gap between pet owners
            seeking new homes for their beloved animals and individuals looking
            to provide a nurturing environment for a furry friend. It provides a
            convenient and efficient platform for connecting pet owners and
            adopters, facilitating the adoption process and bringing joy to both
            pets and their new human companions.
          </p>
        </div>

        <div>
          <h1 className="text-5xl py-12 font-bold text-lime-800">
            How does it work?
          </h1>

          <div className="px-12 lg:flex lg:p-10 py-5">
            <div className="lg:w-1/3 sm:flex sm:flex-col sm:items-center sm:p-4">
              <div>
                <img src={userIcon} alt="User Icon" />
              </div>
              <h2 className="text-3xl font-bold text-orange-500 py-4">
                Create an account
              </h2>
              <p className="text-2xl text-center text-zinc-400 py-4">
                There are two types of users: those who want to adopt and the
                owners who are giving their pets up for adoption.
              </p>
            </div>
            <div className="lg:w-1/3 sm:flex sm:flex-col sm:items-center sm:p-4">
              <div>
                <img src={dogDoodle1} alt="Dog Icon" />
              </div>
              <h2 className="text-3xl font-bold text-orange-500 py-4">
                Browse through the page
              </h2>
              <p className="text-2xl text-center text-zinc-400 py-4">
                For owners, create your pet profile. For users, look for your
                perfect match.
              </p>
            </div>
            <div className="lg:w-1/3 sm:flex sm:flex-col sm:items-center sm:p-4">
              <div>
                <img src={handsIcon} alt="Hands Icon" />
              </div>
              <h2 className="text-3xl font-bold text-orange-500 py-4">
                Close the deal
              </h2>
              <p className="text-2xl text-center text-zinc-400 py-4">
                Talk to the other party to finalize the process and welcome a
                furry friend to be your best friend.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-12">
            <img className="" src={paws} alt="Paws separator" />
          </div>
          <div className="px-12 py-8 lg:flex">
            <div className="lg:w-1/3 px-12">
              <img src={catThinking} alt="Cat Thinking" />
            </div>
            <div className="lg:px-8 sm:py-8">
              <h2 className="text-3xl font-bold text-orange-500">
                Not sure if you are ready to adopt?
              </h2>
              <p className="text-2xl text-justify text-zinc-400 py-4">
                Check out our{" "}
                <Link
                  className="font-bold hover:text-orange-500"
                  to="/guidelines"
                >
                  Guidelines
                </Link>{" "}
                page for more info
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
