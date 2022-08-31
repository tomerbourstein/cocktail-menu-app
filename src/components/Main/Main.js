import { useSelector, useDispatch } from "react-redux";
import { menuActions } from "../../store/menu-slice";
import classes from "./Main.module.css";
import Drink from "./Drink";
import { useEffect,  } from "react";

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
      ingredients: "",
      properties: "",
      flavours: "",
      garnish: "",
      image: "",
      preperation: "Not Enough Data!",
      receipt: "",
      served: "",
      strength: "",
    };

    function getRandomCocktails(amount, strengths) {
      let relevantCocktails = filteredByLiquer;
      if (strengths) {
        relevantCocktails = filteredByLiquer.filter((cocktail) =>
          strengths.includes(cocktail.strength)
        );
      }
      const shuffle = relevantCocktails.sort(() => 0.5 - Math.random());
      return shuffle.slice(0, amount);
    }
    /////////// if preferredAmount is "1", a random index is chosen and dispatched to replaceCocktailsToShow.
    // function random(num) {
    //   Math.floor(Math.random() * num);
    //   return num;
    // }

    // function oneRandomCocktail() {
    //   const random1 = random(filteredByLiquer.length);
    //   const randomCocktailOne = filteredByLiquer[random1];
    //   dispatch(menuActions.replaceCocktailsToShow(randomCocktailOne));
    // }

    ////////// if preferredAmount is "2", filter to get a new array of "Light" cocktails, then choose one random.
    ////////// and filter to get a new array of "Strong" cocktails, then choose one random.
    ////////// push them both into "cart" and dispatch cart to addCocktailsToShow.
    // function twoRandomCocktails() {
    //   const foundAlcoholLight = filteredByLiquer.filter(
    //     (element) => element.strength <= 2
    //   );
    //   const random2Light = Math.floor(Math.random() * foundAlcoholLight.length);
    //   const randomCocktailTwoLight = foundAlcoholLight[random2Light];
    //   cart.push(randomCocktailTwoLight);

    //   const foundAlcoholStrong = filteredByLiquer.filter(
    //     (element) => element.strength === 3
    //   );

    //   ////////// if there are no foundAlcohol then create an empty values object and push to cart and dispatch.
    // if (foundAlcoholStrong.length === 0) {
    //   cart.push({
    // key: "empty",
    // name: "",
    // ingredients: "",
    // properties: "",
    // flavours: "",
    // garnish: "",
    // image: "",
    // preperation: "Not Enough Data!",
    // receipt: "",
    // served: "",
    // strength: "",
    //   });
    //   dispatch(menuActions.addCocktailsToShow(cart));
    //   return;
    //   }

    //   const random2Strong = Math.floor(
    //     Math.random() * foundAlcoholStrong.length
    //   );
    //   const randomCocktailTwoStrong = foundAlcoholStrong[random2Strong];
    //   cart.push(randomCocktailTwoStrong);
    //   dispatch(menuActions.addCocktailsToShow(cart));
    // }
    if (preferences.preferredAmount === 1) {
      cart = getRandomCocktails(1, [1, 2]);
      if (cart.length === 0) {
        cart = [
          {
            emptyCocktail,
          },
        ];
      }
      dispatch(menuActions.replaceCocktailsToShow(cart));
    } else if (preferences.preferredAmount === 2) {
      cart = getRandomCocktails(1, [1, 2]);
      cart = cart.concat(getRandomCocktails(1, [3]));
      if (cart.length === 0) {
        cart = [
          {
            emptyCocktail,
          },
        ];
      }
      dispatch(menuActions.replaceCocktailsToShow(cart));
    }
    console.log(getRandomCocktails(1, [3]));
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
