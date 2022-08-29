import { useDispatch, useSelector } from "react-redux/";
import { inputActions } from "../../store/input-slice";
import { menuActions } from "../../store/menu-slice";
import { dataBaseActions } from "../../store/dataBase-slice";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import classes from "./Input.module.css";
const Input = () => {
  const alcohol = useSelector(state => state.input.onChangeAlcohol)
  const amount = useSelector((state) => state.input.onChangeAmount);
  const liquers = useSelector((state) => state.dataBase.liquers);
  const dispatch = useDispatch();

  ///////////// Changing the Alcohol input, and dispatch to redux store to save state.
  const enterAlcoholInputHandler = (event, newValue) => {
    dispatch(inputActions.enterAlcohol({ alcohol: newValue }));
  };

  /////////////// Changing the Amount input, Check if the input is smaller then 1
  /////////////// Check if the input is nuperic and not empty
  /////////////// dispatch to redux store to save state.
  const enterAmountInputHandler = (event) => {
    const regex = /^[0-4\b]+$/;
    const enteredAmount = event.target.value;
    if (enteredAmount.length <= 1) {
      if (enteredAmount === "" || regex.test(enteredAmount)) {
        dispatch(inputActions.enterAmount({ amount: enteredAmount }));
      }
    }
  };

  /////////////// On button click change the initial generated state to true.
  const generateMenuHandler = (event) => {
    event.preventDefault();
    dispatch(menuActions.toggleGenerated());
    dispatch(dataBaseActions.setPreference({preferredAlcohol: alcohol, preferredAmount: amount}))
    dispatch(dataBaseActions.filterByLiquer(alcohol));
  };

  ////////////// On button click dispatch increment by 1 reducer.
  const plusButtonHandler = () => {
    dispatch(inputActions.increment());
  };

  ////////////// On button click dispatch decrement by 1 reducer.
  const minusButtonHandler = () => {
    dispatch(inputActions.decrement());
  };
  return (
    <form onSubmit={generateMenuHandler} className={classes.inputField}>
      <Box sx={{ width: 210, margin: "auto" }}>
        <Autocomplete
          id="combo-box-demo"
          options={liquers}
          autoHighlight
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) =>
            typeof option === "string" || option instanceof String ? option : ""
          }
          onChange={enterAlcoholInputHandler}
          renderInput={(params) => <TextField {...params} label="Liquer" />}
        />
      </Box>
      <div>
        <button type="button" onClick={minusButtonHandler}>
          -
        </button>
        <TextField
          autoComplete="off"
          id="outlined-basic"
          label="How Many?"
          variant="outlined"
          value={amount}
          onChange={enterAmountInputHandler}
        />
        <button type="button" onClick={plusButtonHandler}>
          +
        </button>
      </div>
      <button type="submit">Generate</button>
    </form>
  );
};

export default Input;
