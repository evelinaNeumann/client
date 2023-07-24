import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import catIcon from "../../images/cat-profile.jpg";
import bgImg from "../../images/bg-landing-2.jpg";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [preference, setPreference] = useState("");


  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");


  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    // Pre-fill the input fields with existing user information
    setEmail(user.email || "");
    setName(user.name || "");
    setPreference(user.preference || "");

    setOwnerEmail(user.ownerEmail || "");
    setOwnerName(user.ownerName || "");
    setOwnerPhone(user.ownerPhone || "");
    setCity(user.city || "");
    setZip(user.zip || "");
    setCountry(user.country || "");

  }, [user]);

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, name, preference };

    authService
      .editprofile(requestBody)
      .then((response) => {
        // Show the success alert to the user
        alert("User updated successfully! Login again to see the changes");
        // Redirect to the profile page
        navigate("/profile");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleEditOwnerProfileSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ownerName, ownerEmail, ownerPhone, city, zip, country };

    authService
      .editownerprofile(requestBody)
      .then((response) => {
        // Show the success alert to the user
        alert("User updated successfully! Login again to see the changes");
        // Redirect to the profile page
        navigate("/profile");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };



  return (
    <div style={{ backgroundImage: `url(${bgImg})`, objectFit: "scale-down" }}>
      <div className="flex justify-center py-12 px-6">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {user.name && (
            <form
            onSubmit={handleEditProfileSubmit}
            className="items-center pb-10 grid grid-cols justify-center"
          >
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg m-4"
              src={catIcon}
              alt="Profile"
            />
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              placeholder="Full Name"
              name="name"
              className="mb-1 text-2xl font-medium text-gray-900 dark:text-white border border-gray-400 py-1 px-2 m-1"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
              placeholder="Email Address"
              className="text-sm text-gray-500 dark:text-gray-400 py-3 border border-gray-400 px-2 m-1"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 py-3">
              I'm currently looking for
              <select
                onChange={(e) => setPreference(e.target.value)}
                className="border border-gray-400 py-1 px-2 w-full"
                value={preference}
              >
                <option disabled hidden style={{ display: "none" }}></option>
                <option value="Dogs">Dogs</option>
                <option value="Cats">Cats</option>
                <option value="Small Pets">Small Pets</option>
                <option value="All Pets">All Pets</option>
              </select>
            </span>

            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Change my profile
              </button>
            </div>
            </form>
          )}

          {user.ownerName && (
            <form
            onSubmit={handleEditOwnerProfileSubmit}
            className="items-center pb-10 grid grid-cols justify-center"
          >
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg m-4"
              src={catIcon}
              alt="Profile"
            />
            <input
              onChange={(e) => setOwnerName(e.target.value)}
              type="text"
              value={ownerName}
              placeholder="Full Name"
              name="name"
              className="mb-1 text-2xl font-medium text-gray-900 dark:text-white border border-gray-400 py-1 px-2 m-1"
            />
            <input
              onChange={(e) => setOwnerEmail(e.target.value)}
              name="email"
              value={ownerEmail}
              placeholder="Email Address"
              className="text-sm text-gray-500 dark:text-gray-400 py-3 border border-gray-400 px-2 m-1"
            />

            <input
              onChange={(e) => setOwnerPhone(e.target.value)}
              name="ownerPhone"
              value={ownerPhone}
              placeholder="Phone number"
              className="text-sm text-gray-500 dark:text-gray-400 py-3 border border-gray-400 px-2 m-1"
            />

            <input
              onChange={(e) => setCity(e.target.value)}
              name="city"
              value={city}
              placeholder="City"
              className="text-sm text-gray-500 dark:text-gray-400 py-3 border border-gray-400 px-2 m-1"
            />

            <input
              onChange={(e) => setZip(e.target.value)}
              name="zip"
              value={zip}
              placeholder="Zip"
              className="text-sm text-gray-500 dark:text-gray-400 py-3 border border-gray-400 px-2 m-1"
            />

            <input
              onChange={(e) => setCountry(e.target.value)}
              name="country"
              value={country}
              placeholder="Country"
              className="text-sm text-gray-500 dark:text-gray-400 py-3 border border-gray-400 px-2 m-1"
            />

            <div className="flex mt-4 space-x-3 md:mt-6">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Change my profile
              </button>
            </div>
          </form>
          )}
          
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
