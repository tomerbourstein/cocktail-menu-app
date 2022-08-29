import { useSelector } from "react-redux";
import classes from "./Main.module.css";
import Drink from "./Drink";

const Main = () => {
  const database = useSelector((state) => state.dataBase.dataBase);
  const preferences = useSelector((state) => state.input.preferences);
  const isGenerated = useSelector((state) => state.menu.generated);

  console.log(database);
  console.log(preferences.preferredAlcohol);
  const foundAlcohol = database.find(
    (element) =>
      element.main_liquer === preferences.preferredAlcohol.toLowerCase()
  );
  console.log(foundAlcohol);
  return (
    <section id="main" className={classes.main}>
      {isGenerated ? <Drink /> : <p>What Would You Like to Drink Tonight?</p>}
    </section>
  );
};

export default Main;
