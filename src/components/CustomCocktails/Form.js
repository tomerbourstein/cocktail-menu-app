import { useState } from "react";
import useInput from "../../hooks/use-input";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";

import classes from "./CustomCocktails.module.css";

const Form = (props) => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [flavoursList, setFlavoursList] = useState([]);
  const [propertiesList, setPropertiesList] = useState([]);
  const [receiptList, setReceiptList] = useState([]);
  const [garnishList, setGarnishList] = useState([]);
  //// using imported custom hook for form validation.
  const {
    value: enteredMainLiqueur,
    isValid: mainLiqueurIsValid,
    hasError: mainLiqueurHasError,
    valueChangeHandler: mainLiqueurChangeHandler,
    valueBlurHandler: mainLiqueurBlurHandler,
    reset: mainLiqueurResetHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameResetHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredIngredients,
    isValid: ingredientsIsValid,
    hasError: ingredientsHasError,
    valueChangeHandler: ingredientsChangeHandler,
    valueBlurHandler: ingredientsBlurHandler,
    reset: ingredientsResetHandler,
  } = useInput((value) => ingredientsList.length !== 0);

  const {
    value: enteredFlavours,
    isValid: flavoursIsValid,
    hasError: flavoursHasError,
    valueChangeHandler: flavoursChangeHandler,
    valueBlurHandler: flavoursBlurHandler,
    reset: flavoursResetHandler,
  } = useInput((value) => flavoursList.length !== 0);

  const {
    value: enteredProperties,
    isValid: propertiesIsValid,
    hasError: propertiesHasError,
    valueChangeHandler: propertiesChangeHandler,
    valueBlurHandler: propertiesBlurHandler,
    reset: propertiesResetHandler,
  } = useInput((value) => propertiesList.length !== 0);

  const {
    value: enteredServed,
    isValid: servedIsValid,
    hasError: servedHasError,
    valueChangeHandler: servedChangeHandler,
    valueBlurHandler: servedBlurHandler,
    reset: servedResetHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredReceipt,
    isValid: receiptIsValid,
    hasError: receiptHasError,
    valueChangeHandler: receiptChangeHandler,
    valueBlurHandler: receiptBlurHandler,
    reset: receiptResetHandler,
  } = useInput((value) => ingredientsList.length !== 0);

  const {
    value: enteredPreperation,
    isValid: preperationIsValid,
    hasError: preperationHasError,
    valueChangeHandler: preperationChangeHandler,
    valueBlurHandler: preperationBlurHandler,
    reset: preperationResetHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredGarnish,
    isValid: garnishIsValid,
    hasError: garnishHasError,
    valueChangeHandler: garnishChangeHandler,
    valueBlurHandler: garnishBlurHandler,
    reset: garnishResetHandler,
  } = useInput((value) => value.trim() !== "" || garnishList.length !== 0);

  const {
    value: enteredImage,
    isValid: imageIsValid,
    hasError: imageHasError,
    valueChangeHandler: imageChangeHandler,
    valueBlurHandler: imageBlurHandler,
    reset: imageResetHandler,
  } = useInput(
    (value) =>
      //eslint-disable-next-line
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/.test(
        value
      ) && value.trim() !== ""
  );

  const [strength, setStrength] = useState(2);

  ///// to make the submit button disabled if the form is invalid.
  let formIsValid = false;
  if (
    mainLiqueurIsValid &&
    nameIsValid &&
    ingredientsIsValid &&
    flavoursIsValid &&
    propertiesIsValid &&
    receiptIsValid &&
    preperationIsValid &&
    servedIsValid &&
    garnishIsValid &&
    imageIsValid
  ) {
    formIsValid = true;
  }

  //// dynmic helper text for input is invalid or untouched.
  const mainLiqueurHelper = !mainLiqueurHasError
    ? "Cocktail's main spirit"
    : "Enter Something";
  const nameHelper = !nameHasError ? "How do you call it?" : "Enter Something";
  const ingredientsHelper = !ingredientsHasError
    ? "What would you use?"
    : "Enter Something";
  const flavoursHelper = !flavoursHasError
    ? "How does it tastes like?"
    : "Enter Something";
  const propertiesHelper = !propertiesHasError
    ? "How would you describe it?"
    : "Enter Something";
  const receiptHelper = !receiptHasError ? "In oz" : "In oz";
  const preperationHelper = !preperationHasError
    ? "What are the steps for making this amazing cocktail?"
    : "Enter Something";
  const servedHelper = !servedHasError
    ? "On The Rocks? Straight Up?"
    : "Enter Something";
  const garnishHelper = !garnishHasError
    ? "How To Decorate?"
    : "Enter Something";
  const imageHelper = !imageHasError
    ? "Image Should be 720*720"
    : "Enter Something";

  /// slider marks values.
  const marks = [
    {
      value: 0,
      label: "Virgin",
    },
    {
      value: 1,
      label: "Light",
    },
    {
      value: 2,
      label: "Medium",
    },
    {
      value: 3,
      label: "Strong",
    },
  ];

  /// slider change handler
  const sliderChangeHandler = (event) => {
    setStrength(event.target.value);
  };

  /// submit form handler.
  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      main_liqueur: enteredMainLiqueur,
      name: enteredName,
      ingredients: ingredientsList,
      flavours: flavoursList,
      properties: propertiesList,
      preperation: enteredPreperation,
      receipt: receiptList.map(
        (rec, index) => rec + " oz " + ingredientsList[index]
      ),
      served: enteredServed,
      garnish: garnishList,
      image: enteredImage,
      strength,
    };
    props.postHandler(data);

    mainLiqueurResetHandler();
    nameResetHandler();
    ingredientsResetHandler();
    flavoursResetHandler();
    propertiesResetHandler();
    receiptResetHandler();
    preperationResetHandler();
    servedResetHandler();
    garnishResetHandler();
    imageResetHandler();

    setIngredientsList([]);
    setFlavoursList([]);
    setPropertiesList([]);
    setReceiptList([]);
    setGarnishList([]);
  };

  /// adding chip attributes next to input.
  const handleAdd = (
    value,
    cb,
    reset,
    state,
    blur,
    value2,
    cb2,
    reset2,
    state2,
    blur2
  ) => {
    if (value !== "" && value2 !== "") {
      if (!state.includes(value)) {
        cb((prevState) => [...prevState, value]);
      }
      if (
        typeof value2 !== "undefined" &&
        typeof cb2 !== "undefined" &&
        typeof reset2 !== "undefined" &&
        typeof state2 !== "undefined"
      ) {
        cb2((prevState) => [...prevState, value2]);
        reset2();
      }
    } else {
      if (typeof blur2 !== "undefined") {
        blur();
        blur2();
        return;
      } else {
        blur();
        return;
      }
    }
    reset();
  };

  /// removing chip attributes next to input.
  const handleDelete = (item, index, list, cb) => {
    let arr = [...list];
    arr.splice(index, 1);
    console.log(item);
    cb(arr);
  };

  return (
    <Box component="form" onSubmit={submitHandler}>
      <Card className={classes.inputCard}>
        <Box className={classes.mainAndName}>
          <TextField
            sx={{ m: 1 }}
            label="Main Liqueur"
            variant="standard"
            helperText={mainLiqueurHelper}
            error={mainLiqueurHasError}
            value={enteredMainLiqueur}
            onBlur={mainLiqueurBlurHandler}
            onChange={mainLiqueurChangeHandler}
          />
          <TextField
            sx={{ m: 1 }}
            label="Cocktail Name"
            variant="standard"
            helperText={nameHelper}
            error={nameHasError}
            value={enteredName}
            onBlur={nameBlurHandler}
            onChange={nameChangeHandler}
          />
        </Box>

        <Box className={classes.inputBox}>
          <TextField
            sx={{ m: 1, width: 380 }}
            label="Image Link"
            variant="standard"
            placeholder="720*720"
            type="url"
            helperText={imageHelper}
            error={imageHasError}
            value={enteredImage}
            onBlur={imageBlurHandler}
            onChange={imageChangeHandler}
          />
        </Box>

        <Box>
          <Slider
            style={{
              color: "#EF9F9F",
            }}
            sx={{ width: 250 }}
            aria-label="Strength"
            defaultValue={0}
            step={1}
            marks={marks}
            min={0}
            max={3}
            onChange={sliderChangeHandler}
            value={strength}
          />
        </Box>
      </Card>

      <hr />

      <Card className={classes.inputCard}>
        <Box className={classes.inputBox}>
          <div>
            <TextField
              id="receipt"
              sx={{ width: 50, mr: 0.5 }}
              label="oz"
              variant="standard"
              helperText={receiptHelper}
              error={receiptHasError}
              value={enteredReceipt}
              onBlur={receiptBlurHandler}
              onChange={receiptChangeHandler}
            />
            <TextField
              sx={{ width: 142, ml: 0 }}
              label="Ingredients"
              variant="standard"
              helperText={ingredientsHelper}
              error={ingredientsHasError}
              value={enteredIngredients}
              onBlur={ingredientsBlurHandler}
              onChange={ingredientsChangeHandler}
            />

            <IconButton
              size="medium"
              aria-label="add"
              onClick={() =>
                handleAdd(
                  enteredIngredients,
                  setIngredientsList,
                  ingredientsResetHandler,
                  ingredientsList,
                  ingredientsBlurHandler,
                  enteredReceipt,
                  setReceiptList,
                  receiptResetHandler,
                  receiptList,
                  receiptBlurHandler
                )
              }
            >
              <AddIcon />
            </IconButton>
          </div>

          <div className={classes.chip}>
            {ingredientsList.map((ingredient, index) => (
              <Chip
                size="small"
                sx={{ m: 0.2 }}
                key={index}
                label={ingredient}
                onDelete={() =>
                  handleDelete(
                    ingredient,
                    index,
                    ingredientsList,
                    setIngredientsList
                  )
                }
              />
            ))}
          </div>
        </Box>

        <Box className={classes.inputBox}>
          <div>
            <TextField
              label="Flavours"
              variant="standard"
              helperText={flavoursHelper}
              error={flavoursHasError}
              value={enteredFlavours}
              onBlur={flavoursBlurHandler}
              onChange={flavoursChangeHandler}
            />

            <IconButton
              size="medium"
              color="success"
              aria-label="add"
              onClick={() =>
                handleAdd(
                  enteredFlavours,
                  setFlavoursList,
                  flavoursResetHandler,
                  flavoursList,
                  flavoursBlurHandler
                )
              }
            >
              <AddIcon />
            </IconButton>
          </div>

          <div className={classes.chip}>
            {flavoursList.map((flavour, index) => (
              <Chip
                size="small"
                sx={{ m: 0.3 }}
                key={index}
                label={flavour}
                onDelete={() =>
                  handleDelete(flavour, index, flavoursList, setFlavoursList)
                }
              />
            ))}
          </div>
        </Box>

        <Box className={classes.inputBox}>
          <div>
            <TextField
              // sx={{ m: 1 }}
              label="Properties"
              variant="standard"
              helperText={propertiesHelper}
              error={propertiesHasError}
              value={enteredProperties}
              onBlur={propertiesBlurHandler}
              onChange={propertiesChangeHandler}
            />

            <IconButton
              size="medium"
              color="success"
              aria-label="add"
              onClick={() =>
                handleAdd(
                  enteredProperties,
                  setPropertiesList,
                  propertiesResetHandler,
                  propertiesList,
                  propertiesBlurHandler
                )
              }
            >
              <AddIcon />
            </IconButton>
          </div>

          <div className={classes.chip}>
            {propertiesList.map((property, index) => (
              <Chip
                size="small"
                sx={{ m: 0.3 }}
                key={index}
                label={property}
                onDelete={() =>
                  handleDelete(
                    property,
                    index,
                    propertiesList,
                    setPropertiesList
                  )
                }
              />
            ))}
          </div>
        </Box>
      </Card>

      <hr />

      <Card className={classes.inputCard}>
        <Box className={classes.inputBox}>
          <TextField
            sx={{ width: 380 }}
            label="Preperation"
            variant="standard"
            multiline
            minRows={2}
            maxRows={5}
            helperText={preperationHelper}
            error={preperationHasError}
            value={enteredPreperation}
            onBlur={preperationBlurHandler}
            onChange={preperationChangeHandler}
          />
        </Box>
      </Card>

      <hr />

      <Card className={classes.inputCard}>
        <Box className={classes.inputBox}>
          <TextField
            sx={{ m: 1, width: 380 }}
            label="Served"
            variant="standard"
            helperText={servedHelper}
            error={servedHasError}
            value={enteredServed}
            onBlur={servedBlurHandler}
            onChange={servedChangeHandler}
          />
        </Box>

        <Box className={classes.inputBox}>
          <div>
            <TextField
              sx={{ m: 1 }}
              label="Garnish"
              variant="standard"
              helperText={garnishHelper}
              error={garnishHasError}
              onChange={garnishChangeHandler}
              value={enteredGarnish}
              onBlur={garnishBlurHandler}
            />

            <IconButton
              size="medium"
              color="success"
              aria-label="add"
              onClick={() =>
                handleAdd(
                  enteredGarnish,
                  setGarnishList,
                  garnishResetHandler,
                  garnishList,
                  garnishBlurHandler
                )
              }
            >
              <AddIcon />
            </IconButton>
          </div>

          <div className={classes.chip}>
            {garnishList.map((item, index) => (
              <Chip
                size="small"
                sx={{ m: 0.3 }}
                key={index}
                label={item}
                onDelete={() =>
                  handleDelete(item, index, garnishList, setGarnishList)
                }
              />
            ))}
          </div>
        </Box>
      </Card>

      <Box className={classes.submitBox}>
        <Button
          disabled={!formIsValid}
          type="submit"
          variant="contained"
          disableElevation
          className={classes.submitButton}
        >
          Publish Cocktail
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
