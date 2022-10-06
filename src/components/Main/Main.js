import { useSelector } from "react-redux";

import classes from "./Main.module.css";
import Properties from "./Properties";
import Drink from "./Drink";
const Main = (props) => {
  const isGenerated = useSelector((state) => state.menu.generated);
  const dataBase = useSelector(state=> state.dataBase.dataBase);
  const cocktailsToShow = useSelector(
    (state) => state.dataBase.cocktailsToShow
  );

  let arr = []
  for(const key in dataBase[2]) {
    arr.push({cocktail:dataBase[2].cocktail})
  }
  console.log(arr);
  const mapCocktails = cocktailsToShow.map((element) => (
    <Drink key={element.name} drink={element} />
  ));
  return (
    <section id="main" className={classes.main}>
      {isGenerated && <Properties />}
      {isGenerated ? (
        <div>{mapCocktails}</div>
      ) : (
        <p>What Would You Like to Drink Tonight?</p>
      )}
    </section>
  );
};

export default Main;
