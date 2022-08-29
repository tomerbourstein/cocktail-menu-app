import { useSelector } from "react-redux";
// import { menuActions } from "../../store/menu-slice";
import classes from "./Main.module.css";
import Drink from "./Drink";

const Main = () => {
  // const dispatch = useDispatch();
  // const database = useSelector((state) => state.dataBase.dataBase);
  // const preferences = useSelector((state) => state.dataBase.preferences);
  const isGenerated = useSelector((state) => state.menu.generated);

  // const filterLiquer = () => {
  //   console.log(database);
  //   console.log(preferences.preferredAlcohol);
  //   const foundAlcohol = database.find(
  //     (element) =>
  //       element.main_liquer === preferences.preferredAlcohol.toLowerCase()
  //   );
  //   const cocktailsFilterByLiquer = foundAlcohol.cocktail;
  //   dispatch(menuActions.changeCocktailsList(cocktailsFilterByLiquer));
  //   console.log(cocktailsFilterByLiquer);
  // };

  return (
    <section id="main" className={classes.main}>
      {isGenerated ? <Drink /> : <p>What Would You Like to Drink Tonight?</p>}
    </section>
  );
};

export default Main;
