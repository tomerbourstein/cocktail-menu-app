import { useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import classes from "./Favorites.module.css";

const Favorites = () => {
  const favoritesList = useSelector((state) => state.menu.favoritesList);
  
  function strengthTransform (strength) {
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

  return (
    <section className={classes.favorites}>
      <ImageList col={1}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">My Favorite Cocktails</ListSubheader>
        </ImageListItem>
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
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${fav.name}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
        {/* {favoritesList.length === 0 ? (
            <p>Nothing to Show</p>
        ) :  */}
        {/* {favoritesList.map((fav) => (
          <ImageListItem 
          
          alt={fav.name} src={fav.image}>
                <ImageListItem/>
                
                ))} */}
        {/* } */}
      </ImageList>
    </section>
  );
};

export default Favorites;
