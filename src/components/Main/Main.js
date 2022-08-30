import { useSelector, useDispatch } from "react-redux";
import { menuActions } from "../../store/menu-slice";
import classes from "./Main.module.css";
import Drink from "./Drink";
import { useEffect } from "react";

const Main = (props) => {
  const dispatch = useDispatch();
  const isGenerated = useSelector((state) => state.menu.generated);
  const filteredByLiquer = useSelector(
    (state) => state.dataBase.filteredByLiquer
  );
  const cocktailsToShow = useSelector((state) => state.menu.cocktailsToShow);

  /////////// When filteredByLiquer reducer changes, if preferences.amount is "1",
  /////////// a random index is chosen and dispatched to replaceCocktailsToShow.
  useEffect(() => {
    let random = Math.floor(Math.random() * filteredByLiquer.length);
    const randomCocktail = filteredByLiquer[random];
    dispatch(menuActions.replaceCocktailsToShow(randomCocktail));
  }, [filteredByLiquer, dispatch]);

  const mapCocktails = cocktailsToShow.map((element) => (
    <Drink
      drink={element}
      // key={element.name}
      // name={element.name}
      // ingredients={element.ingredients}
      // properties={element.properties}
      // flavours={element.flavours}
      // garnish={element.garnish}
      // image={element.image}
      // preperation={element.preperation}
      // receipt={element.receipt}
      // served={element.served}
      // strength={element.strength}
    />
  ));
  // console.log(cocktailsToShow);
  // console.log(mapCocktails);
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
