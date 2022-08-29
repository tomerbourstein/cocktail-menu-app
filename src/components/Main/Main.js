import { useSelector } from "react-redux";
// import { menuActions } from "../../store/menu-slice";
import classes from "./Main.module.css";
import Drink from "./Drink";

const Main = () => {
  const isGenerated = useSelector((state) => state.menu.generated);

  return (
    <section id="main" className={classes.main}>
      {isGenerated ? <Drink /> : <p>What Would You Like to Drink Tonight?</p>}
    </section>
  );
};

export default Main;
