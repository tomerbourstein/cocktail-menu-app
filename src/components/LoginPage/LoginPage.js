import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileActions } from "../../store/profile-slice";
import { menuActions } from "../../store/menu-slice";
import Login from "./Login";
import Register from "./Register";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isRegisterForm = useSelector((state) => state.profile.isRegisterForm);

  useEffect(() => {
    dispatch(profileActions.resetRegisterForm());
  }, [dispatch]);
  const toggleRegisterFormHandler = () => {
    dispatch(profileActions.toggleRegisterForm());
  };

  const submitHandler = async (email, password) => {
    dispatch(menuActions.openMenu());
    if (!isRegisterForm) {
    } else {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMi_EzPtLxG-9zjQl34XoqQPGwqGs__wU",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
        if(response.ok) {
            // ....
        } else {
            // show error modal
            console.log(data);
        }
    }
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
