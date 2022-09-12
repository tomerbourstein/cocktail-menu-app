import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function getUsernames() {
      const response = await fetch(
        `https://cocktail-menu-app-default-rtdb.firebaseio.com/users.json`
      );
      if (!response.ok) {
        throw new Error("Could not fetch data!");
      }
      const data = await response.json();
      const usernameList = [];
      for (const key in data) {
        usernameList.push({
          id: key,
          username: data[key].username,
          password: data[key].password,
        });
      }
      console.log(usernameList);
    }
    getUsernames();
  }, []);
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section>
      <Box component="form">
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
          Login
        </Button>
      </Box>
    </section>
  );
};

export default Login;
