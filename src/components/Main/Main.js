import { useSelector } from "react-redux";
import classes from "./Main.module.css";
import Drink from "./Drink";

const Main = () => {
  const database = useSelector((state) => state.dataBase.dataBase);
  const preferences = useSelector((state) => state.input.preferences);
  const isGenerated = useSelector((state) => state.menu.generated);

  for (const key in database) {
    console.log(database[key].id);
      if (String(database[key].id) === String(preferences.preferredAlcohol)) {
        console.log("yes");
      }
  }

  return (
    <section id="main" className={classes.main}>
      {isGenerated ? <Drink /> : <p>What Would You Like to Drink Tonight?</p>}
    </section>
  );
};

export default Main;
