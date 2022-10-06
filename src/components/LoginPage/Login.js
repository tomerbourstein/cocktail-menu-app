import { useState } from "react";
import useInput from "../../hooks/use-input";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

import classes from "./LoginPage.module.css";

const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: emailResetHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: passwordResetHandler,
  } = useInput((value) => value.trim() !== "");

  // useEffect(() => {
  //   async function getUsernames() {
  //     const response = await fetch(
  //       `https://cocktail-menu-app-default-rtdb.firebaseio.com/users.json`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Could not fetch data!");
  //     }
  //     const data = await response.json();
  //     for (const key in data) {
  //       usernameList.push({
  //         id: key,
  //         username: data[key].username,
  //         password: data[key].password,
  //       });
  //     }
  //     console.log(usernameList);
  //   }
  //   getUsernames();
  // }, [usernameList]);

  const loginHandler = (event) => {
    event.preventDefault();
    if (!passwordIsValid || !emailIsValid) {
      return;
    }
    props.submitHandler(enteredEmail, enteredPassword);
    emailResetHandler();
    passwordResetHandler();
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box component="form" onSubmit={loginHandler} 
    className={classes.textField}
    >
      <Box >
        <TextField
          sx={{ width: 300 }}
          label="E-Mail"
          value={enteredEmail}
          error={emailHasError}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box>
        <TextField
        className={classes.inputField}
          sx={{ width: 300 }}
          label="Password"
          value={enteredPassword}
          error={passwordHasError}
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={showPasswordHandler}
                  aria-label="toggle-password-visibility"
                  edge="end"
                >
                  {!showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <Button className={classes.buttonLoginPage} type="submit" variant="contained" sx={{ width: 300 }}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
