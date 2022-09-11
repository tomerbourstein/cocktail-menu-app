import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
const Register = () => {
  return (
    <section>
      <Box component="form">
        <TextField
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
        <TextField
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
        <Button type="submit">Register</Button>
      </Box>
    </section>
  );
};

export default Register;
