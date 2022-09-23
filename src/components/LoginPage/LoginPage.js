import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileActions } from "../../store/profile-slice";
import { menuActions } from "../../store/menu-slice";
import Login from "./Login";
import Register from "./Register";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isRegisterForm = useSelector((state) => state.profile.isRegisterForm);
  const [playAnimation, setPlayAnimation] = useState(null);

  /////// To render the Login instead of Register form when the user logout.
  useEffect(() => {
    dispatch(profileActions.resetRegisterForm());
  }, [dispatch]);

  /////// To toggle the form from Login to Register with blur animation.
  const toggleRegisterFormHandler = (event) => {
    setPlayAnimation(true);

    setTimeout(() => {
      dispatch(profileActions.toggleRegisterForm());
    }, 200);

    setTimeout(() => {
      setPlayAnimation(null);
    }, 1100);
  };

  /////// to set the "token" and "email" to local storage and logout in a deleyed time.
  const loginHandler = (token, email, expirationTime) => {
    dispatch(
      profileActions.login({ token: token, email: email, loggedIn: true })
    );
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);

    const remainingTime = calculateRemainingTime(expirationTime);
    dispatch(menuActions.openMenu());
    setTimeout(dispatch(profileActions.logout()), remainingTime);
  };

  /////// to get the time remaining for the created token when logged in.
  const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
  };

  /////// To get a "token" from database if logging in or signing up.
  const submitHandler = async (email, password) => {
    let url;
    dispatch(menuActions.setLoadingState(true));

    if (!isRegisterForm) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMi_EzPtLxG-9zjQl34XoqQPGwqGs__wU";
      //.....
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMi_EzPtLxG-9zjQl34XoqQPGwqGs__wU";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    const expirationTime = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );

    setTimeout(() => {
      dispatch(menuActions.setLoadingState(false));
    }, 1200);
    if (!response.ok) {
      // ....
      alert(data.error.message);
    } else {
      loginHandler(data.idToken, data.email, expirationTime.toISOString());
    }
    // let errorMesage = "Authentication Failed!";
    // if (data && data.error & data.error.message) {
    //   errorMesage = data.error.message;
    // }
    // show error modal
  };
  return (
    <Box
      sx={{ width: 300, m: "auto" }}
      className={playAnimation && classes.blurSignIn}
    >
      <Typography variant="h3">
        {!isRegisterForm ? "Login" : "Register"}
      </Typography>
      {!isRegisterForm ? (
        <Login submitHandler={submitHandler} />
      ) : (
        <Register submitHandler={submitHandler} />
      )}
      <Divider sx={{ my: 2 }}>or</Divider>
      <Button
        variant="outlined"
        type="button"
        sx={{ width: 300 }}
        onClick={toggleRegisterFormHandler}
      >
        {!isRegisterForm ? "Create an Account" : "Go Back"}
      </Button>
    </Box>
  );
};
export default LoginPage;
