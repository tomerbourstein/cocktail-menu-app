import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import classes from "./Drink.module.css";
const Drink = (props) => {
  const {
    name,
    ingredients,
    // properties,
    // flavours,
    garnish,
    image,
    preperation,
    receipt,
    served,
    strength,
  } = props.drink;

  let cocktailStrength = "";

  if (strength === 3) {
    cocktailStrength = "Strong";
  } else if (strength === 2) {
    cocktailStrength = "Medium";
  } else if (strength === 1) {
    cocktailStrength = "Light";
  }

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
              <span>{ingredient}</span>
            ))}
          </div>

          <div>
            {receipt.map((item) => (
              <span>{item}</span>
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

        <div>{garnish}</div>
      </CardContent>
    </Card>
  );
};

export default Drink;
