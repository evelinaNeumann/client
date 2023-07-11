import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import PetImg2 from "../../images/petsimage.png"
// import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [preference, setPreference] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePreference = (e) => setPreference(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, preference };

    // Send a request to the server using axios

    // const authToken = localStorage.getItem("authToken");
    // axios.post(
    //   `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
    //   requestBody, 
    //   { headers: { Authorization: `Bearer ${authToken}` },
    // })
    // .then((response) => {})


    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">

      <div className="min-h-screen py-40" style={{ backgroundImage: "linear-gradient(115deg, rgb(237, 135, 51), rgb(255, 175, 128))" }}>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">


            <div className="w-full lg:w-1/2 flex flex-col items-center  p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${PetImg2})`, objectFit: "scale-down" }}>
              <h1 style={{ color: "rgb(63, 98, 18)" }} className="text-3xl mb-3 font-bold">Welcome</h1>
              <div>
                <p style={{ color: "rgb(63, 98, 18)" }} className="mb-3 font-semibold text-black">Welcome to the Friends furr-ever app! Search for your perfect match, change your life <br /> <a href="#" className="font-bold" style={{ color: "rgb(63, 98, 18)" }}>Learn more</a></p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4">Register</h2>
              <p className="mb-4">
                Are you planning on adopting a pet? Create your account.
              </p>
              <form onSubmit={handleSignupSubmit}>

                <div className="grid grid-cols-2 gap-5">
                  <input className="border border-gray-400 py-1 px-2" type="email" name="email" value={email} onChange={handleEmail} placeholder="Enter your email" />
                  <input className="border border-gray-400 py-1 px-2" type="password" name="password" value={password} onChange={handlePassword} placeholder="Enter a password" />
                </div>

                <div className="mt-5">
                  <input className="border border-gray-400 py-1 px-2 w-full" type="text" name="name" value={name} onChange={handleName} placeholder="Enter your name" />
                </div>

                <div className="mt-5">
                  <label>What are you looking for?</label>
                  <select className="border border-gray-400 py-1 px-2 w-full" value={preference} onChange={handlePreference}>
                    <option disabled hidden style={{ display: 'none' }}></option>
                    <option value="Dogs">Dogs</option>
                    <option value="Cats">Cats</option>
                    <option value="Small Pets">Small Pets</option>
                    <option value="All Pets">All Pets</option>
                  </select>
                </div>

                <div className="mt-5">

                </div>
                <button className="w-full py-3 text-center text-white" style={{ backgroundColor: "rgb(63, 98, 18)" }} type="submit">Sign Up</button>
              </form>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <p>Already have account?</p>
              <Link style={{ color: "rgb(63, 98, 18)" }} to={"/login"} className="font-bold" > Login</Link>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default SignupPage;