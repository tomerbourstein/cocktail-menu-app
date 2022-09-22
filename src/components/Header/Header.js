import { useDispatch } from "react-redux";
import { menuActions } from "../../store/menu-slice";
import { profileActions } from "../../store/profile-slice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const user = email ? email.substring(0, email.indexOf("@")) : "";
  const profileUsername = email ? email.substring(0, 1).toUpperCase() : "";
  let disableButtons;
  if (email) {
    disableButtons = true;
  } else {
    disableButtons = false;
  }

  ////////// On click dispatch open Favorites.
  const showFavoritesHandler = () => {
    dispatch(menuActions.openFavorites());
  };

  ////////// On click dispatch open Menu.
  const showMenuHandler = () => {
    dispatch(menuActions.openMenu());
  };

  ////////// On click dispatch open CustomCocktails.
  const showCustomCocktailsHandler = () => {
    dispatch(menuActions.openCustomCocktails());
  };

  const showLoginPageHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    dispatch(menuActions.openLoginPage());
    dispatch(menuActions.toggleGenerated(false));
    dispatch(profileActions.logout());
  };
  return (
    <Box className={classes.navigation}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ display: "flex", justifyContent: "start" }}>
          <IconButton
            size="large"
            aria-label="menu-page"
            disabled={!disableButtons}
            onClick={showMenuHandler}
          >
            <MenuBookIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="favorite"
            disabled={!disableButtons}
            onClick={showFavoritesHandler}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="custom-cocktail"
            disabled={!disableButtons}
            onClick={showCustomCocktailsHandler}
          >
            <PlaylistAddIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="logout"
            disabled={!disableButtons}
            onClick={showLoginPageHandler}
          >
            <LogoutIcon />
          </IconButton>
          <Avatar src="" alt={user === "" ? null : user}>
            {profileUsername === "" ? null : profileUsername}
          </Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
