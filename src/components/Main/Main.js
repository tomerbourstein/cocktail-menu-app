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

  /////////// When filteredByLiquer reducer changes useEffect chooses random cocktail for each strength depend on preferences.
  useEffect(() => {
    let cart = [];
    /////////// if preferredAmount is "1", a random index is chosen and dispatched to replaceCocktailsToShow.
    if (preferences.preferredAmount === 1) {
      const random1 = Math.floor(Math.random() * filteredByLiquer.length);
      const randomCocktailOne = filteredByLiquer[random1];
      dispatch(menuActions.replaceCocktailsToShow(randomCocktailOne));
    }
    ////////// if preferredAmount is "2", filter to get a new array of "Light" cocktails, then choose one random.
    ////////// and filtr to get a new array of "Strong" cocktails, then choose one random.
    ////////// push them both into "cart" and dispatch cart to addCocktailsToShow.
    else if (preferences.preferredAmount === 2) {
      const foundAlcoholLight = filteredByLiquer.filter(
        (element) => element.strength <= 2
      );
      const random2Light = Math.floor(Math.random() * foundAlcoholLight.length);
      const randomCocktailTwoLight = foundAlcoholLight[random2Light];
      cart.push(randomCocktailTwoLight);

      const foundAlcoholStrong = filteredByLiquer.filter(
        (element) => element.strength === 3
      );
      const random2Strong = Math.floor(
        Math.random() * foundAlcoholStrong.length
      );
      const randomCocktailTwoStrong = foundAlcoholStrong[random2Strong];
      cart.push(randomCocktailTwoStrong);
      dispatch(menuActions.addCocktailsToShow(cart));
    }
  }, [filteredByLiquer, dispatch, preferences]);

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
