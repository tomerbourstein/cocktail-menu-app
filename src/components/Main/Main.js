import { useSelector } from "react-redux";

import classes from "./Main.module.css";
import Drink from "./Drink";

const Main = (props) => {
  const isGenerated = useSelector((state) => state.menu.generated);
  const cocktailsToShow = useSelector(
    (state) => state.dataBase.cocktailsToShow
  );

  const mapCocktails = cocktailsToShow.map((element) => (
    <Drink key={element.name} drink={element} />
  ));
  return (
    <section id="main" className={classes.main}>
      {isGenerated ? (
        <div>{mapCocktails}</div>
      ) : (
        <p>What Would You Like to Drink Tonight?</p>
      )}
    </section>
  );
};

export default Main;
