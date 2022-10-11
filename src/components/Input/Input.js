import * as React from "react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux/";
import { inputActions } from "../../store/input-slice";
import { menuActions } from "../../store/menu-slice";
import { dataBaseActions } from "../../store/dataBase-slice";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import classes from "./Input.module.css";

const Input = () => {
  const alcohol = useSelector((state) => state.input.onChangeAlcohol);
  const amount = useSelector((state) => state.input.onChangeAmount);
  const liquers = useSelector((state) => state.dataBase.liquers);
  const error = useSelector((state) => state.input.error);
  const cocktailsToShow = useSelector(
    (state) => state.dataBase.cocktailsToShow
  );
  const dispatch = useDispatch();

  const [switchIsChecked, setSwitchIsChecked] = useState(false);

  ///////////// To re-render the properties list everytime cocktailsToShow changes.
  useEffect(() => {
    dispatch(dataBaseActions.setPropsList());
  }, [dispatch, cocktailsToShow]);

  ///////////// Changing the Alcohol input, and dispatch to redux store to save state.
  const enterAlcoholInputHandler = (event, newValue) => {
    dispatch(inputActions.setError(false));
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
  /////////////// dispatch preferences to set the filtered array cocktails.
  const generateMenuHandler = (event) => {
    event.preventDefault();
    if (alcohol === "" || alcohol === null) {
      dispatch(inputActions.setError(true));
      return;
    }

    dispatch(menuActions.toggleGenerated(true));
    if (amount === "") {
      dispatch(
        dataBaseActions.setPreference({
          preferredAlcohol: alcohol,
          preferredAmount: 1,
        })
      );
    } else {
      dispatch(
        dataBaseActions.setPreference({
          preferredAlcohol: alcohol,
          preferredAmount: amount,
        })
      );
    }
    dispatch(
      dataBaseActions.filterByLiquer({
        alcohol: alcohol,
        switchIsChecked: switchIsChecked,
      })
    );
    dispatch(dataBaseActions.setCocktailsToShow());
  };

  ////////////// On button click dispatch increment by 1 reducer.
  const plusButtonHandler = () => {
    dispatch(inputActions.increment());
  };

  ////////////// On button click dispatch decrement by 1 reducer.
  const minusButtonHandler = () => {
    dispatch(inputActions.decrement());
  };

  const includeCustomCocktailsHandler = (event) => {
    setSwitchIsChecked(event.target.checked);
  };
  return (
    <Card className={classes.inputCard}>
      <form onSubmit={generateMenuHandler} className={classes.inputField}>
        <Box sx={{ width: 210, margin: "auto" }}>
          <Autocomplete
            id="combo-box-demo"
            options={liquers}
            autoHighlight
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) =>
              typeof option === "string" || option instanceof String
                ? option
                : ""
            }
            onChange={enterAlcoholInputHandler}
            renderInput={(params) => (
              <TextField
                error={error.isError}
                {...params}
                label={error.message}
              />
            )}
          />
        </Box>

        <Box className={classes.quantityButtons}>
          <IconButton onClick={minusButtonHandler}>
            <RemoveIcon />
          </IconButton>

          <TextField
            placeholder="1"
            autoComplete="off"
            id="outlined-basic"
            label=""
            variant="outlined"
            value={amount}
            onChange={enterAmountInputHandler}
          />

          <IconButton onClick={plusButtonHandler}>
            <AddIcon />
          </IconButton>
        </Box>

        <Box className={classes.customSwitch}>
          <span>Ours</span>

          <Switch
            color="error"
            checked={switchIsChecked}
            onChange={includeCustomCocktailsHandler}
          />
          <span>Yours</span>
        </Box>

        <Button
          className={classes.generateButton}
          disableElevation
          variant="contained"
          type="submit"
        >
          Generate
        </Button>
      </form>
    </Card>
  );
};

export default Input;
