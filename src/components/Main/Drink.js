import classes from "./Drink.module.css";
const Drink = (props) => {
  const {
    name,
    ingredients,
    properties,
    flavours,
    garnish,
    image,
    preperation,
    receipt,
    served,
    strength,
  } = props.drink;

  return (
    <div className={classes.drink}>
      <p>Start with {name}</p>
      <img src={image} alt={name}></img>
      <div>
        {ingredients.map((ingredient) => (
          <span>{ingredient}</span>
        ))}
      </div>

      <div>
        <span>strength{strength}</span>
      </div>

      <div>
        {flavours.map((flavour) => (
          <span>{flavour}</span>
        ))}
      </div>

      <div>
        {properties.map((prop) => (
          <span>{prop}</span>
        ))}
      </div>

      <div>
        {receipt.map((item) => (
          <span>{item}</span>
        ))}
      </div>

      <div>{garnish}</div>
      <div>{preperation}</div>

      <div>{served}</div>
    </div>
  );
};

export default Drink;
