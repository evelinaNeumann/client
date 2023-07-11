import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import PetImg2 from "../../images/petsimage.png"
// import axios from "axios";

function OwnerSignupPage() {
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState();
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleOwnerEmail = (e) => setOwnerEmail(e.target.value);
  const handleOwnerPassword = (e) => setOwnerPassword(e.target.value);
  const handleOwnerName = (e) => setOwnerName(e.target.value);
  const handleOwnerPhone = (e) => setOwnerPhone(e.target.value);  
  const handleCity = (e) => setCity(e.target.value);
  const handleState = (e) => setState(e.target.value);
  const handleZip = (e) => setZip(e.target.value);
  const handleCountry = (e) => setCountry(e.target.value);

  const handleOwnerSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { ownerEmail, ownerPassword, ownerName, ownerPhone, city, state, zip, country };

    // Or using a service
    authService
      .ownersignup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/ownerlogin");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="OwnerSignupPage">

      <div className="min-h-screen py-40" style={{ backgroundImage: "linear-gradient(115deg, rgb(237, 135, 51), rgb(255, 175, 128))" }}>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">


            <div className="w-full lg:w-1/2 flex flex-col items-center  p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${PetImg2})`, objectFit: "scale-down" }}>
              <h1 style={{ color: "rgb(63, 98, 18)" }} className="text-3xl mb-3 font-bold">Welcome</h1>
              <div>
                <p style={{ color: "rgb(63, 98, 18)" }} className="mb-3 font-semibold text-black">If you have a pet available for adoption, then Friends furr-ever app is for you.<br /> <a href="#" className="font-bold" style={{ color: "rgb(63, 98, 18)" }}>Learn more</a></p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4">Register</h2>
              <p className="mb-4">
                Do you want to give up a pet for adoption? <br/> Create your account.
              </p>
              <form onSubmit={handleOwnerSignupSubmit}>

                <div className="grid grid-cols-2 gap-5">
                  <input className="border border-gray-400 py-1 px-2" type="email" name="ownerEmail" value={ownerEmail} onChange={handleOwnerEmail} placeholder="Enter your email" />
                  <input className="border border-gray-400 py-1 px-2" type="password" name="ownerPassword" value={ownerPassword} onChange={handleOwnerPassword} placeholder="Enter a password" />
                </div>

                <div className="mt-5"></div>

                <div className="grid grid-cols-2 gap-5">
                  <input className="border border-gray-400 py-1 px-2" type="text" name="ownerName" value={ownerName} onChange={handleOwnerName} placeholder="Enter your name" />
                  <input className="border border-gray-400 py-1 px-2" type="number" name="ownerPhone" value={ownerPhone} onChange={handleOwnerPhone} placeholder="Enter your phone" />
                </div>

                <div className="mt-5"></div>

                <div className="grid grid-cols-2 gap-5">
                  <input className="border border-gray-400 py-1 px-2" type="text" name="city" value={city} onChange={handleCity} placeholder="City" />
                  <input className="border border-gray-400 py-1 px-2" type="text" name="state" value={state} onChange={handleState} placeholder="State" />
                </div>

                <div className="mt-5"></div>

                <div className="grid grid-cols-2 gap-5">
                  <input className="border border-gray-400 py-1 px-2" type="number" name="zip" value={zip} onChange={handleZip} placeholder="Zip" />
                  <input className="border border-gray-400 py-1 px-2" type="text" name="country" value={country} onChange={handleCountry} placeholder="Country" />
                </div>

                <div className="mt-5"></div>
                <button className="w-full py-3 text-center text-white" style={{ backgroundColor: "rgb(63, 98, 18)" }} type="submit">Sign Up</button>
                
              </form>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <p>Already have account?</p>
              <Link style={{ color: "rgb(63, 98, 18)" }} to={"/ownerlogin"} className="font-bold" >Login</Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default OwnerSignupPage;
