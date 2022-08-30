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
  const preferences = useSelector((state) => state.dataBase.preferences);

  /////////// When filteredByLiquer reducer changes, if preferences.amount is "1",
  /////////// a random index is chosen and dispatched to replaceCocktailsToShow.
  useEffect(() => {
    if (preferences.preferredAmount === 1) {
      let randomOne = Math.floor(Math.random() * filteredByLiquer.length);
      const randomCocktailOne = filteredByLiquer[randomOne];
      dispatch(menuActions.replaceCocktailsToShow(randomCocktailOne));
    } else if (preferences.preferredAmount === 2) {
      const foundAlcoholLight = filteredByLiquer.filter(
        (element) => element.strength <= 2
      );
      let randomTwoLight = Math.floor(Math.random() * foundAlcoholLight.length);
      const randomCocktailTwoLight = foundAlcoholLight[randomTwoLight];
      dispatch(menuActions.addCocktailsToShow(randomCocktailTwoLight));


      const foundAlcoholStrong = filteredByLiquer.filter(
        (element) => element.strength > 2
      );
      let randomTwoStrong = Math.floor(Math.random() * foundAlcoholStrong.length);
      const randomCocktailTwoStrong = foundAlcoholLight[randomTwoStrong];
      dispatch(menuActions.addCocktailsToShow(randomCocktailTwoStrong));
      
    }
  }, [filteredByLiquer, dispatch, preferences]);
  
  console.log(cocktailsToShow);
  const mapCocktails = cocktailsToShow.map((element) => (
    <Drink
      key={Math.random()}
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
