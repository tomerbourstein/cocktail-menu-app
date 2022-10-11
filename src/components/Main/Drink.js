import { useDispatch, useSelector } from "react-redux";
import { menuActions } from "../../store/menu-slice";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Avatar from "@mui/material/Avatar";
import classes from "./Drink.module.css";

const Drink = (props) => {
  const dispatch = useDispatch();
  const favoritesList = useSelector((state) => state.menu.favoritesList);

  const {
    name,
    ingredients,
    properties,
    flavours,
    garnish,
    image,
    preperation,
    receipt,
    served,
    strength,
  } = props.drink;

  let checked = false;
  let cocktailStrength = "";

  /////// to change the strength number into a string
  if (strength === 3) {
    cocktailStrength = "Strong";
  } else if (strength === 2) {
    cocktailStrength = "Medium";
  } else if (strength === 1) {
    cocktailStrength = "Light";
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

  /////// to check if theres already a specific cocktail inside favoritesList
  const checkFavorites = () => {
    let foundCocktail = favoritesList.find((element) => element.name === name);
    if (foundCocktail) {
      checked = true;
    }
  };

  /////// to add cocktails into favorites and
  const addToFavoritesHandler = (event) => {
    let checked = event.target.checked;
    if (checked) {
      dispatch(
        menuActions.addToFavorites({
          name,
          ingredients,
          properties,
          flavours,
          garnish,
          image,
          preperation,
          receipt,
          served,
          strength,
        })
      );
    } else {
      dispatch(menuActions.removeFromFavorites(name));
    }
  };

  checkFavorites();
  return (
    <Card className={classes.drink}>
      <CardHeader
        className={classes.cardHeader}
        title={transformText(name)}
        subheader={cocktailStrength}
        avatar={
          <Avatar
            src={image}
            alt={name}
            sx={{ width: 80, height: 80 }}
          ></Avatar>
        }
      />
      <CardContent className={classes.drinkInfo}>
        <div className={classes.rows}>
          <div>
            {receipt.map((item, index) => (
              <span key={index}>{transformText(item)}</span>
            ))}
          </div>
        </div>

        <hr />
        <div className={classes.preperation}>{`${preperation}${"."}`}</div>
        <hr />

        <div className={classes.rows}>
          <div>
            <p>Served</p>
            <div>{transformText(served)}</div>
          </div>

          <div>
            <p>Garnish with one</p>
            <div>
              {garnish.map((item, index) => (
                <span key={index}>{transformText(item)}</span>
              ))}
            </div>
          </div>
        </div>

        {name !== "" ? (
          <div>
            <Checkbox
            className={classes.checkbox}
              style={{
                color: "#F47C7C",
              }}
              checked={checked}
              icon={<FavoriteBorderIcon />}
              checkedIcon={<FavoriteIcon />}
              onChange={addToFavoritesHandler}
            ></Checkbox>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default Drink;
