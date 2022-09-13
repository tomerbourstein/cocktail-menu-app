import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileActions } from "../../store/profile-slice";
import Login from "./Login";
import Register from "./Register";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isRegisterForm = useSelector((state) => state.profile.isRegisterForm);

  useEffect(() => {
    dispatch(profileActions.resetRegisterForm());
  }, [dispatch]);
  const toggleRegisterFormHandler = () => {
    dispatch(profileActions.toggleRegisterForm());
  };
  return (
    <Box sx={{ width: 300, m: "auto" }}>
      {!isRegisterForm ? <Login /> : <Register />}
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
