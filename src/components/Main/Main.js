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
    const emptyCocktail = {
      key: "empty",
      name: "",
      ingredients: [""],
      properties: [""],
      flavours: [""],
      garnish: [""],
      image: "",
      preperation: "Not Enough Data!",
      receipt: [""],
      served: "",
      strength: "",
    };
    ////////// get random cocktail from filteredByLiquer array, depends on amount and strengths.
    ///////// the functions shuffles the items in the array every time.
    ////////// if the return is empty, and empty object is returned.
    function getRandomCocktails(amount, strengths) {
      let relevantCocktails = filteredByLiquer;
      if (strengths) {
        relevantCocktails = filteredByLiquer.filter((cocktail) =>
          strengths.includes(cocktail.strength)
        );
      }
      const shuffle = relevantCocktails.sort(() => 0.5 - Math.random());
      let random = shuffle.slice(0, amount);
      if (random.length === 0) {
        random.push(emptyCocktail);
        return random;
      }
      return random;
    }

    /////////// if preferredAmount is "1", set cart to getRandomCocktails, amount, array of strengths.
    /////////// then dispatch to replaceCocktailsToShow.
    if (preferences.preferredAmount === 1) {
      cart = getRandomCocktails(1, [1, 2, 3]);
      dispatch(menuActions.replaceCocktailsToShow(cart));
    }

    /////////// if preferredAmount is "2", set first and second to getRandomCocktails, amount, array of strengths.
    /////////// set cart with concat() to add those arrays.
    /////////// then dispatch to replaceCocktailsToShow.
    else if (preferences.preferredAmount === 2) {
      let first = getRandomCocktails(1, [1, 2]);
      let second = getRandomCocktails(1, [3]);
      cart = first.concat(second);
      dispatch(menuActions.replaceCocktailsToShow(cart));
    }
    /////////// if preferredAmount is "3", set first, second and third to getRandomCocktails, amount, array of strengths.
    /////////// set cart with concat() to add those arrays.
    /////////// then dispatch to replaceCocktailsToShow.
    else if (preferences.preferredAmount === 3) {
      let first = getRandomCocktails(1, [1]);
      let second = getRandomCocktails(1, [2]);
      let third = getRandomCocktails(1, [3]);
      cart = first.concat(second, third);
      dispatch(menuActions.replaceCocktailsToShow(cart));
    }
    /////////// if preferredAmount is "4", set first, second_third and fourth to getRandomCocktails, amount, array of strengths.
    /////////// set cart with concat() to add those arrays.
    /////////// then dispatch to replaceCocktailsToShow.
    else if (preferences.preferredAmount === 4) {
      let first = getRandomCocktails(1, [1]);
      let second_third = getRandomCocktails(2, [2]);
      let fourth = getRandomCocktails(1, [3]);
      cart = first.concat(second_third, fourth);
      dispatch(menuActions.replaceCocktailsToShow(cart));
    }
  }, [filteredByLiquer, dispatch, preferences]);

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
