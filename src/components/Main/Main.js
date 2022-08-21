import classes from "./Main.module.css";

import Drink from "./Drink";
const Main = () => {
  return (
    <section id="main" className={classes.main}>
      <Drink />
      <Drink />
      <Drink />
      <Drink />
    </section>
  );
};

export default Main;
