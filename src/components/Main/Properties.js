import { useSelector, useDispatch } from "react-redux";
import { dataBaseActions } from "../../store/dataBase-slice";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import classes from "./Properties.module.css";
const Properties = (props) => {
  const dispatch = useDispatch();
  const propsToShow = useSelector((state) => state.dataBase.properties);

  ////////// To delete the property that was clicked so it will match the current properties list.
  const handleDelete = (removedProperty) => {
    dispatch(dataBaseActions.filterCocktails(removedProperty));
  };

  return (
    <Box className={classes.chipBox}>
      {propsToShow.map((property) => (
        <Chip
          className={classes.chip}
          key={propsToShow.indexOf(property)}
          label={property}
          size="small"
          sx={{ m: 0.3 }}
          onDelete={() => handleDelete(property)}
        />
      ))}
    </Box>
  );
};

export default Properties;
