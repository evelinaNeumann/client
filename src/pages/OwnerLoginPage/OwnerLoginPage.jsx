import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function OwnerLoginPage() {
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleOwnerEmail = (e) => setOwnerEmail(e.target.value);
  const handleOwnerPassword = (e) => setOwnerPassword(e.target.value);

  const handleOwnerLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ownerEmail, ownerPassword };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .ownerlogin(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleOwnerLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="ownerEmail" value={ownerEmail} onChange={handleOwnerEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="ownerPassword"
          value={ownerPassword}
          onChange={handleOwnerPassword}
        />

        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/ownersignup"}> Sign Up</Link>
    </div>
  );
}

export default OwnerLoginPage;
