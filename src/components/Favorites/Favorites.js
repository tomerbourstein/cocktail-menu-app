import React, { Fragment, useEffect, useState } from "react";
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
import Dialog from "./DialogBackDrop";
import classes from "./Favorites.module.css";

const Favorites = () => {
  const [favorite, setFavorite] = useState("");
//   const visible = useSelector((state) => state.menu.visible);
  const favoritesList = useSelector((state) => state.menu.favoritesList);
  const dispatch = useDispatch();
  const email = useSelector(state => state.profile.profileEmail);
  const user = email.substring(0,email.indexOf("@"));
  let checked = false;
 console.log(email);
//   const fade = !visible ? classes.fadeOut : classes.noFade;
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

  function removeFavoritesHandler(cocktail) {
    checked = true;
    // dispatch(menuActions.fadeFavorites(cocktail));
    // const timeout = setTimeout(
      dispatch(menuActions.removeFromFavorites(cocktail))
    //   ,
    //   5000
    // );
    // clearTimeout(timeout);
  }

  function handleOpen(cocktail) {
    setFavorite(cocktail);
    dispatch(menuActions.toggleDialog());
  }



  useEffect(()=>{
    const handleFetchData = async () => {
      const response = await fetch(
        `https://cocktail-menu-app-default-rtdb.firebaseio.com/USERS/${user}/favorites.json`
      );
      if (!response.ok) {
        throw new Error("Could not fetch data!");
      }
      const data = await response.json();
      const fetchedFavorites = [];
      for (const key in data) {
        fetchedFavorites.push({
          id: key,
          cocktail: data[key],
        });
      }
      dispatch(menuActions.replaceFavorites(fetchedFavorites));
    };
    handleFetchData();
  },[dispatch, user])
  return (
    <section className={classes.favorites}>
      <ImageList col={1}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">My Favorite Cocktails</ListSubheader>
        </ImageListItem>
        <Fragment>
          {favoritesList.map((fav) => (
            <ImageListItem key={fav.image}>
              <img
                src={`${fav.image}?w=248&fit=crop&auto=format`}
                srcSet={`${fav.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={fav.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={fav.name}
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
          ))}
          <Dialog cocktail={favorite} />
        </Fragment>
      </ImageList>
    </section>
  );
};

export default Favorites;
