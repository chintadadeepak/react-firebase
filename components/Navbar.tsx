import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/navbar.css";
function Navbar() {
  const [user] = useAuthState(auth);
  const signOutUser = async () => {
    await signOut(auth);
  };
  return (
    <div className="navbar-container">
      <div className="navbar-link">
        <Link className="navbar-link" to="/">
          Home
        </Link>
        {!user ? (
          <Link className="navbar-link" to="/login">
            Login
          </Link>
        ) : (
          <Link className="navbar-link" to="/createpost">
            Create-Post
          </Link>
        )}
      </div>
      <div className="user-info">
        {user && (
          <>
            <img
              className="user-image"
              alt="User"
              src={user?.photoURL || ""}
              height="25"
              width="25"
            />
            <p className="user-name">{user?.displayName}</p>
            <button className="logout-button" onClick={signOutUser}>
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
