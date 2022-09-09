import { useDispatch } from "react-redux";
import { menuActions } from "../../store/menu-slice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  ////////// On click dispatch toggleFavorites on and off.
  const showFavoritesHandler = () => {
    dispatch(menuActions.toggleFavorites());
  };
  return (
    <Box className={classes.navigation}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            aria-label="favorite"
            onClick={showFavoritesHandler}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton>
            <PlaylistAddIcon 
            size="large" 
            aria-label="custom-cocktail" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
