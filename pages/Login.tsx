import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useAuthState } from "react-firebase-hooks/auth";
function Login() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };
  return (
    <div className="sign-in-container">
      {!user && (
        <>
          <p className="sign-in-text">Sign In With Google to Continue</p>
          <button className="google-sign-in-button" onClick={signInWithGoogle}>
            Sign In With Google
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
