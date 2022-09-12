import { useState } from "react";
import { useDispatch } from "react-redux";
import { profileActions } from "../../store/profile-slice";
import { menuActions } from "../../store/menu-slice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const cancelSignUpHandler = () => {
    dispatch(profileActions.showRegisterForm(false));
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  async function postProfileHandler(profile) {
    const { username } = profile;
    const requestOptions = {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(profile),
    };
    const response = await fetch(
      `https://cocktail-menu-app-default-rtdb.firebaseio.com/users/${username}.json`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }
    const data = await response.json();
    console.log(data);
  }
  const createAccountSubmitHandler = (event) => {
    event.preventDefault();
    const profile = {
      username,
      password,
    };
    postProfileHandler(profile);
    dispatch(profileActions.login(profile.username));
    dispatch(menuActions.openMenu());
  };
  return (
    <section>
      <Box component="form" onSubmit={createAccountSubmitHandler}>
        <Box>
          <TextField
            sx={{ width: 300 }}
            label="Username"
            value={username}
            onChange={usernameChangeHandler}
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
            value={password}
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
      <Button
        type="submit"
        variant="outlined"
        sx={{ width: 300 }}
        onClick={cancelSignUpHandler}
      >
        Go Back
      </Button>
    </section>
  );
};

export default Register;
