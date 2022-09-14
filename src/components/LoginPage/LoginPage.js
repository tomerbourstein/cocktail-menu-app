import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileActions } from "../../store/profile-slice";
import { menuActions } from "../../store/menu-slice";
import Login from "./Login";
import Register from "./Register";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isRegisterForm = useSelector((state) => state.profile.isRegisterForm);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(profileActions.resetRegisterForm());
  }, [dispatch]);
  const toggleRegisterFormHandler = () => {
    dispatch(profileActions.toggleRegisterForm());
  };

  const submitHandler = async (email, password) => {
    let url;
    setIsLoading(true);

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
    setIsLoading(false);
    if (!response.ok) {
      // ....
      alert(data.error.message);
    } else {
      dispatch(profileActions.login(data.idToken));
      localStorage.setItem('token', data.idToken)
      console.log(data);
      dispatch(menuActions.openMenu());
    }
    // let errorMesage = "Authentication Failed!";
    // if (data && data.error & data.error.message) {
    //   errorMesage = data.error.message;
    // }
    // show error modal
  };
  return (
    <Box sx={{ width: 300, m: "auto" }}>
      <Typography variant="h3">
        {!isRegisterForm ? "Login" : "Register"}
      </Typography>
      {!isRegisterForm ? (
        <Login submitHandler={submitHandler} />
      ) : (
        <Register submitHandler={submitHandler} />
      )}
      {isLoading && (
        <Stack spacing={1}>
          <Skeleton variant="rounded" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
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
