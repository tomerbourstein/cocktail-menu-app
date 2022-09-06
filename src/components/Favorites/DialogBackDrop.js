import { useDispatch, useSelector } from "react-redux";
import { menuActions } from "../../store/menu-slice";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// import classes from "./DialogBackDrop.module.css";

const DialogBackDrop = (props) => {
    const dispatch = useDispatch();
    const open = useSelector(state=>state.menu.dialog);
    const {
        name,
        ingredients,
        // properties,
        // flavours,
        garnish,
        // image,
        preperation,
        receipt,
        served,
        strength,
      } = props.cocktail;

      function strengthTransform(strength) {
        let cocktailStrength = "";
    
        if (strength === 3) {
          cocktailStrength = "Strong";
        } else if (strength === 2) {
          cocktailStrength = "Medium";
        } else if (strength === 1) {
          cocktailStrength = "Light";
        }
        return cocktailStrength;
      }
      
      function handleClose() {
        dispatch(menuActions.toggleDialog());
      }
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="cocktail-name"
        aria-describedby="cocktail-receipt"
      >
          <DialogTitle id="scroll-dialog-title">{name}{strengthTransform(strength)}</DialogTitle>
          <DialogContent >
              <DialogContentText>
                  {receipt}
                  {ingredients}
                  {preperation}
                  {garnish}
                  {served}
              </DialogContentText>
          </DialogContent>
      </Dialog>
    )
}

export default DialogBackDrop;