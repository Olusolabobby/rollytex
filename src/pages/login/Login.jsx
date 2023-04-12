import "./login.scss";
import React, {useContext, useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";




const Login = () => {

    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const {dispatch} = useContext(AuthContext)

    const userLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // console.log(user);
                dispatch({type: "LOGIN", payload:user});
                navigate("/");
            })
            .catch((error) => {
                setError(true)
            });

    }

    const handleLogin = (e) => {
        e.preventDefault();
        userLogin();

    }

  return (
    <div className="login">
        <div clasName="loginBox">
            <form onSubmit={handleLogin}>
                <h2>RollyTex</h2>
                <p>please login below</p>
                <input type="email" placeholder="email" onChange={ e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={ e => setPassword (e.target.value)}/>
                <button type="submit">Login</button>
                {error && <span>Wrong Email or Password!</span>}
            </form>
        </div>
    </div>
  );
};

export default Login