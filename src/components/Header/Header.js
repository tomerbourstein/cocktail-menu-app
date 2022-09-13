import { useDispatch, useSelector } from "react-redux";
import { menuActions } from "../../store/menu-slice";
import { profileActions } from "../../store/profile-slice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.profile.loggedIn);
  const token = useSelector((state) => state.profile.token);

  ////////// On click dispatch open Favorite  s.
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
    dispatch(menuActions.openLoginPage());
    dispatch(profileActions.logout());
  };
  return (
    <Box className={classes.navigation}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ display: "flex", justifyContent: "start" }}>
          {loggedIn && (
            <>
              <IconButton
                size="large"
                aria-label="menu-page"
                onClick={showMenuHandler}
              >
                <MenuBookIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="favorite"
                onClick={showFavoritesHandler}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="custom-cocktail"
                onClick={showCustomCocktailsHandler}
              >
                <PlaylistAddIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="logout"
                onClick={showLoginPageHandler}
              >
                <LogoutIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
