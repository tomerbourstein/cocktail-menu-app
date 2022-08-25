import { useDispatch, useSelector } from "react-redux/";
import { inputActions } from "../../store/input-slice";
import { menuActions } from "../../store/menu-slice";
import classes from "./Input.module.css";
const Input = () => {
  const alcohol = useSelector((state) => state.input.alcohol);
  const amount = useSelector((state) => state.input.amount);
  const dispatch = useDispatch();

  ///////////// Changing the Alcohol input, and dispatch to redux store to save state.
  const enterAlcoholInputHandler = (event) => {
    const enteredAlcohol = event.target.value;
    dispatch(inputActions.enterAlcohol({ alcohol: enteredAlcohol }));
  };

  /////////////// Changing the Amount input, and dispatch to redux store to save state.
  const enterAmountInputHandler = (event) => {
    const enteredAmount = event.target.value;
    dispatch(inputActions.enterAmount({ amount: enteredAmount }));
  };

  /////////////// On button click change the initial generated state to true.
  const generateMenuHandler = (event) => {
    dispatch(menuActions.toggleGenerated());
  };

  return (
    <div className={classes.inputField}>
      <div>
        <label>I Love to drink</label>
        <input
          value={alcohol}
          onChange={enterAlcoholInputHandler}
          type="text"
          placeholder="enter preference"
        ></input>
      </div>
      <div>
        <label>How many drinks</label>
        <input
          value={amount}
          onChange={enterAmountInputHandler}
          type="text"
          placeholder="enter a number"
        ></input>
      </div>
      <button onClick={generateMenuHandler} type="button">
        Generate
      </button>
    </div>
  );
};

export default Input;
