import { useDispatch } from "react-redux";
import { menuActions } from "../../store/menu-slice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();

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
  return (
    <Box className={classes.navigation}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton>
            <MenuBookIcon
              size="large"
              aria-label="menu-page"
              onClick={showMenuHandler}
            />
          </IconButton>
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
              aria-label="custom-cocktail"
              onClick={showCustomCocktailsHandler}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
