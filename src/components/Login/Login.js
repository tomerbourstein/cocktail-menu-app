import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Login = () => {
  return (
    <Box>
      <TextField
        label="Username"
        InputProps={{
          startAdorment: (
            <InputAdornment position="end">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Login;
