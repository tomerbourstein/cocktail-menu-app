import { useState } from "react";
import useInput from "../../hooks/use-input";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = (props) => {
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

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  //   async function postProfileHandler(profile) {
  //     const { username } = profile;
  //     const requestOptions = {
  //       method: "PATCH",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify(profile),
  //     };
  //     const response = await fetch(
  //       `https://cocktail-menu-app-default-rtdb.firebaseio.com/users/${username}.json`,
  //       requestOptions
  //     );

  //     if (!response.ok) {
  //       throw new Error("Something Went Wrong!");
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //   }

  const createAccountSubmitHandler = (event) => {
    event.preventDefault();
    if (!passwordIsValid || !emailIsValid) {
      return;
    }
    props.submitHandler(enteredEmail, enteredPassword);
    emailResetHandler();
    passwordResetHandler();
  };
  return (
    <Box component="form" onSubmit={createAccountSubmitHandler}>
      <Box>
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
        <Button type="submit" variant="contained" sx={{ width: 300 }}>
          Create Account
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
