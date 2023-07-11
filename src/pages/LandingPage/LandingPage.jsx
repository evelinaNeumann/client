import { Link, useNavigate } from "react-router-dom";
function LandingPage(props) {
    const navigate = useNavigate();
    return (
        <div>
        <p>Have you found a pet and are now looking for a shelter?
      <Link to={"/ownersignup"}> Sign Up as an owner</Link> or <Link to="/ownerlogin">Login</Link> here
      </p>
      <p>Or are you looking for a pet friend to give it a deserving home?
      <Link to={"/signup"}> Sign Up</Link> or <Link to="/login">Login</Link> here
      </p>
    </div>
    )
}
export default LandingPage;