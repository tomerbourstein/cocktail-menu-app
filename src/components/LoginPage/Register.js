import { useDispatch } from "react-redux";
import { profileActions } from "../../store/profile-slice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
const Register = () => {
    const dispatch = useDispatch()
    const cancelSignUpHandler = () => {
        dispatch(profileActions.showRegisterForm(false));
    }
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
        <Button type="submit" variant="contained" sx={{width:300}}>Create Account</Button>
        <Button type="submit" variant="outlined" sx={{width:300}} onClick={cancelSignUpHandler}>Go Back</Button>

      </Box>
    </section>
  );
};

export default Register;
