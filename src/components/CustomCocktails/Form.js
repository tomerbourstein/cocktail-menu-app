import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Button from '@mui/material/Button';

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

const Form = () => {
  return (
    <Box >
      <TextField sx={{m:1}}  label="Main Liqueur" variant="standard" />
      <TextField sx={{m:1}}  label="Cocktail Name" variant="standard" />
      <TextField sx={{m:1}}  label="Ingredients" variant="standard" />
      <TextField sx={{m:1}}  label="Flavours" variant="standard" />
      <TextField sx={{m:1}}  label="Properties" variant="standard" />
      <TextField sx={{m:1}}  label="Reciept" variant="standard" />
      <TextField sx={{m:1}}  label="Preperation" variant="standard" />
      <TextField sx={{m:1}}  label="Served" variant="standard" />
      <TextField sx={{m:1}}  label="Garnish" variant="standard" />
      <TextField sx={{m:1}}  label="Image Link" variant="standard"  placeholder="720*720"/>

   
      <Slider sx={{width:300}}
        aria-label="Strength"
        defaultValue={0}
        step={1}
        marks={marks}
        min={0}
        max={3}
        />
 <Button variant="contained">
    Publish Cocktail
 </Button>
    </Box>
  );
};

export default Form;
