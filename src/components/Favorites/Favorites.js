import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { menuActions } from "../../store/menu-slice";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import DialogDialogBackDrop from "./DialogBackDrop";

import classes from "./Favorites.module.css";

const Favorites = () => {
  const [favorite, setFavorite] = useState("");
  const [itemIndex, setItemIndex] = useState(null);
  const favoritesList = useSelector((state) => state.menu.favoritesList);
  const dispatch = useDispatch();
  let checked = false;

  /////// to change the strength number into a string
  function strengthTransform(strength) {
    let cocktailStrength = "";

    if (strength === 3) {
      cocktailStrength = "Strong";
    } else if (strength === 2) {
      cocktailStrength = "Medium";
    } else if (strength === 1) {
      cocktailStrength = "Light";
    }
    return cocktailStrength;
  }

  /////// replace underscores to spaces and change first letter to uppercase.
  const transformText = (element) => {
    let transformElement = element.replaceAll("_", " ");
    const newStr = transformElement
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
      .join(" ");
    return newStr;
  };

  /////// remove from favorites and add fade out onChange dynamically.
  function removeFavoritesHandler(cocktail) {
    checked = true;
    setItemIndex(favoritesList.findIndex((i) => i.name === cocktail));
    setTimeout(() => {
      dispatch(menuActions.removeFromFavorites(cocktail));
      setItemIndex("");
    }, 500);
  }

  /////// open the modal for each cocktails
  function handleOpen(cocktail) {
    setFavorite(cocktail);
    dispatch(menuActions.toggleDialog());
  }

  return (
    <section className={classes.favorites}>
      <ImageList col={1}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">My Favorite Cocktails</ListSubheader>
        </ImageListItem>
        {favoritesList === undefined || favoritesList.length === 0 ? (
          <p>No Favoties to Show!</p>
        ) : (
          favoritesList.map((fav, index) => (
            <ImageListItem
              key={fav.image}
              className={`${itemIndex === index ? classes.fadeOut : null}`}
            >
              <img
                src={`${fav.image}?w=248&fit=crop&auto=format`}
                srcSet={`${fav.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={fav.name}
                loading="lazy"
              />

              <ImageListItemBar
                title={transformText(fav.name)}
                subtitle={strengthTransform(fav.strength)}
                actionIcon={
                  <>
                    <Checkbox
                      color={"success"}
                      icon={<FavoriteIcon color={"error"} />}
                      checkedIcon={<FavoriteBorderIcon />}
                      checked={checked}
                      onChange={() => removeFavoritesHandler(fav.name)}
                    ></Checkbox>
                    <IconButton
                      onClick={() => handleOpen(fav)}
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${fav.name}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  </>
                }
              />
            </ImageListItem>
          ))
        )}

        <DialogDialogBackDrop cocktail={favorite} />
 
      </ImageList>
    </section>
  );
};

export default Favorites;
