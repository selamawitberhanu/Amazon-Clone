import React from "react";
import { Link, useNavigate, useLocation, redirect } from "react-router-dom";
import classes from "./Auth.module.css";
import { auth} from "../../Utility/firebase";
import { useState, useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { ClipLoader } from "react-spinners";

import { DataContext } from "../../Components/DataProvider/DataProvider";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {state , dispatch} = useContext(DataContext);
  const {user} = state;
  const navigate = useNavigate();
  const navStateData = useLocation();
   console.log(navStateData);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name === "signin") {
      if (!email || !password) {
        setError("Please fill in all fields.");
        return;
      }

      setLoading({ ...loading, signIn: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch({
            type: "SET_USER_KEY",
            user: userCredential.user,
          });

          setLoading({ ...loading, signIn: false });
                navigate(navStateData?.state?.redirect ||"/");

        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      if (!email || !password) {
        setError("Please fill in all fields.");
        return;
      }
      setLoading({ ...loading, signUp: true });
     

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch({
            type: "SET_USER_KEY",
            user: userCredential.user,
          });

          setLoading({ ...loading, signUp: false });
           navigate(navStateData?.state?.redirect ||"/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
        <Link to="/">
          <img
            src="https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png"
            alt="amazon-logo"
          />
        </Link>
    

      <div className={classes.login_container}>
        <div>        
          {navStateData?.state?.msg && (
            <small 
            className={classes.msg}>
              {navStateData?.state?.msg}
          </small>)}
          <h1>Sign-In</h1>
        
        </div>
        <form action="">
          <div>
            <label htmlFor="email">Email : </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <br />

          <div>
            <label htmlFor="password">Password : </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </div>
          <div>
            <button
              className={classes.login_signInButton}
              name="signin"
              type="submit"
              onClick={authHandler}
            >
              {loading.signIn ? <ClipLoader color="#fff" size={20} /> : null}
              Sign in
            </button>
          </div>
        </form>
        <p>By signing-in you agree to the AMAZON FAKE CLONE conditions of use & sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice </p>
      
                <button
          onClick={authHandler}
          type="submit"
          name="signup"
          className={classes.login_registerButton}
        >
          {loading.signUp ? (<ClipLoader color="#fff" size={20} /> ): null}
          create your amazone acount
        </button>

        {error && (
          <p
            style={{
              paddingTop:"5px",
              color: "red",
              fontSize: "14px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

export default Auth;