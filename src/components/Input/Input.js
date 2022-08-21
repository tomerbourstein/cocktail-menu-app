import classes from "./Input.module.css";

const Input = () => {
  return (
    <div className={classes.inputField}>
        <div>

      <label>I Love to drink</label>
      <input type="text" placeholder="enter preference"></input>
        </div>
        <div>

      <label>How many drinks</label>
      <input type="text" placeholder="enter a number">
      </input>
        </div>
        <button>Generate</button>
    </div>
  );
};

export default Input;
