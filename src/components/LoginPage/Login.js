import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
const Login = () => {
  return (
    <section>
      <Box component="form" >
        <TextField
        sx={{width:300}}
          label="Username"
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
        sx={{width:300}}
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle-password-visibility" edge="end">
                  <Visibility />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box>
        <Button type="submit" variant="contained" sx={{width:300}}>Login</Button>
      </Box>
    </section>
  );
};

export default Login;
