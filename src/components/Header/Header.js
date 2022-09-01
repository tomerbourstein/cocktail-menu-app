import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import classes from "./Header.module.css";

const Header = () => {
  return <Box className={classes.navigation}>
    <AppBar position="static" color="transparent">
        <Toolbar>
            <IconButton size="large" aria-label="favorite">
                <FavoriteIcon />
            </IconButton>
        </Toolbar>
     </AppBar>
  </Box>;
};

export default Header;
