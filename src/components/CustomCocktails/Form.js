import { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

const Form = () => {
  const main_liqueur = useRef(null);
  const name = useRef(null);
  const ingredients = useRef(null);
  const flavours = useRef(null);
  const properties = useRef(null);
  const preperation = useRef(null);
  const reciept = useRef(null);
  const served = useRef(null);
  const garnish = useRef(null);
  const image = useRef(null);
  const [strength, setStrength] = useState(0);

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

  // useEffect(()=> {
  //    garnishRef.current;

  // },[])

  const sliderChangeHandler = (event) => {
    setStrength(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const liqueur = main_liqueur.current.value;
    const data = {
      liqueur,
      name: name.current.value,
      ingredients: ingredients.current.value,
      flavours: flavours.current.value,
      properties: properties.current.value,
      preperation: preperation.current.value,
      receipt: reciept.current.value,
      served: served.current.value,
      garnish: garnish.current.value,
      image: image.current.value,
      strength,
    };
    console.log(data);
  };
  return (
    <Box>
      <form onSubmit={submitHandler}>
        <TextField
          sx={{ m: 1 }}
          label="Main Liqueur"
          variant="standard"
          inputRef={main_liqueur}
        />
        <TextField
          sx={{ m: 1 }}
          label="Cocktail Name"
          variant="standard"
          inputRef={name}
        />
        <TextField
          sx={{ m: 1 }}
          label="Ingredients"
          variant="standard"
          inputRef={ingredients}
        />
        <TextField
          sx={{ m: 1 }}
          label="Flavours"
          variant="standard"
          inputRef={flavours}
        />
        <TextField
          sx={{ m: 1 }}
          label="Properties"
          variant="standard"
          inputRef={properties}
        />
        <TextField
          sx={{ m: 1 }}
          label="Reciept"
          variant="standard"
          inputRef={preperation}
        />
        <TextField
          sx={{ m: 1 }}
          label="Preperation"
          variant="standard"
          inputRef={reciept}
        />
        <TextField
          sx={{ m: 1 }}
          label="Served"
          variant="standard"
          inputRef={served}
        />
        <TextField
          sx={{ m: 1 }}
          label="Garnish"
          variant="standard"
          inputRef={garnish}
        />
        <TextField
          sx={{ m: 1 }}
          label="Image Link"
          variant="standard"
          placeholder="720*720"
          inputRef={image}
        />

        <Slider
          sx={{ width: 300 }}
          aria-label="Strength"
          defaultValue={0}
          step={1}
          marks={marks}
          min={0}
          max={3}
          onChange={sliderChangeHandler}
          value={strength}
        />
        <Button type="submit" variant="contained">
          Publish Cocktail
        </Button>
      </form>
    </Box>
  );
};

export default Form;
