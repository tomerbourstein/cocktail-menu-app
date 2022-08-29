import { useSelector, useDispatch } from "react-redux";
import { menuActions } from "../../store/menu-slice";
import classes from "./Main.module.css";
import Drink from "./Drink";
import { useEffect } from "react";

const Main = () => {
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


  const mapCocktails = cocktailsToShow.map(element => <Drink name={element.name} image={element.image}/>);
  return (
    <section id="main" className={classes.main}>
      {isGenerated ? {mapCocktails} : <p>What Would You Like to Drink Tonight?</p>}
    </section>
  );
};

export default Main;
