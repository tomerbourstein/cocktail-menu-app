import { useDispatch, useSelector } from "react-redux";
import { menuActions } from "../../store/menu-slice";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
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

  if (strength === 3) {
    cocktailStrength = "Strong";
  } else if (strength === 2) {
    cocktailStrength = "Medium";
  } else if (strength === 1) {
    cocktailStrength = "Light";
  }

  const checkFavorites = () => {
    let foundCocktail = favoritesList.find((element) => element.name === name);
    if (foundCocktail) {
      checked = true;
    }
  };

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
        title={name}
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
            {ingredients.map((ingredient) => (
              <span key={ingredient.length}>{ingredient}</span>
            ))}
          </div>

          <div>
            {receipt.map((item) => (
              <span key={item.length}>{item}</span>
            ))}
          </div>
        </div>
        {/* <div>
          {flavours.map((flavour) => (
            <span>{flavour}</span>
          ))}
        </div> */}

        {/* <div>
          {properties.map((prop) => (
            <span>{prop}</span>
          ))}
        </div> */}

        <div className={classes.preperation}>{preperation}</div>

        <div>{served}</div>

        <div>
          <div className={classes.check}>{garnish}</div>
        </div>
        {(name !== "") ? 
        (<div>
          <Checkbox
            checked={checked}
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteIcon />}
            onChange={addToFavoritesHandler}
          ></Checkbox>
        </div>)
        : null
      }
      </CardContent>
    </Card>
  );
};

export default Drink;
