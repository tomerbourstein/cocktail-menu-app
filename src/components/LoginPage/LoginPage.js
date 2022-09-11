import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileActions } from "../../store/profile-slice";
import Login from "./Login";
import Register from "./Register";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const LoginPage = () => {
    const dispatch = useDispatch();
    const registerForm = useSelector(state => state.profile.registerForm);

  const createAccountHandler = () => {
    dispatch(profileActions.showRegisterForm(true));
  }
  return (
    <Box sx={{ width: 300, m: "auto" }}>
      {!registerForm && (
        <>
          <Login />
          <Divider sx={{ my: 2 }}>or</Divider>
          <Button variant="contained" type="button" sx={{ width: 300 }} onClick={createAccountHandler}>
            Create an Account
          </Button>
        </>
      )}
      {registerForm &&
      <Register />
      }
    </Box>
  );
};
export default LoginPage;
