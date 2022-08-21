import classes from "./Drink.module.css";
import BloodyMary from "../../media/bloody-mary.png";
const Drink = () => {
  return (
    <div className={classes.drink}>
      <p>Start with a Bloody Mary</p>
      <img src={BloodyMary} alt="Bloody-Mary Cocktail"></img>
      <div>
        <span>Vodka</span>
        <span>Lemon</span>
        <span>Spices</span>
        <span>Tabasco</span>
      </div>

      <div>
        <span>Medium Strength</span>
      </div>

      <div>
        <span>Sour</span>
        <span>Spicey</span>
        <span>Spiced</span>
      </div>

      <div>
        <span>Heavy</span>
        <span>Seasoned</span>
      </div>
    </div>
  );
};

export default Drink;
