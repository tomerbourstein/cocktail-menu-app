import classes from "./Main.module.css";
import BloodyMary from "../../media/bloody-mary.png";
const Main = () => {
  return (
    <section id="main" className={classes.main}>
      <div>
        <p>Start with a Bloody Mary</p>
        <img src={BloodyMary} alt="Bloody-Mary Cocktail"></img>
      </div>

      <div>
        <p>Continue with Moscow Mule</p>
        <img src={BloodyMary} alt="Bloody-Mary Cocktail"></img>
      </div>

      <div>
        <p>Next will be a Classic Martini</p>
        <img src={BloodyMary} alt="Bloody-Mary Cocktail"></img>
      </div>

      <div>
        <p>Finish with Espresso Martini</p>
        <img src={BloodyMary} alt="Bloody-Mary Cocktail"></img>
      </div>
    </section>
  );
};

export default Main;
