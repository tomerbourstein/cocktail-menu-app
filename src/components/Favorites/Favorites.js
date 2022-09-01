import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import classes from "./Favorites.module.css";

const Favorites = () => {
  const favoritesList = useSelector((state) => state.menu.favoritesList);

  return (
    <section className={classes.favorites}>
      <p>My Favorite Cocktails</p>
      <Stack direction="row" spacing={2}>
        {favoritesList.map((fav) => (
          <Avatar alt={fav.name} src={fav.image} />
        ))}
      </Stack>
    </section>
  );
};

export default Favorites;
