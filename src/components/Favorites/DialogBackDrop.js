import { useDispatch, useSelector } from "react-redux";
import { menuActions } from "../../store/menu-slice";
import Dialog from "@mui/material/Dialog";

import Drink from "../Main/Drink";
import classes from "./DialogBackDrop.module.css";

const DialogBackDrop = (props) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.menu.dialog);

  function handleClose() {
    dispatch(menuActions.toggleDialog());
  }
  return (
    <Dialog
      PaperComponent="none"
      className={classes.drink}
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="cocktail-name"
      aria-describedby="cocktail-receipt"
    >
      <Drink drink={props.cocktail} />
    </Dialog>
  );
};

export default DialogBackDrop;
