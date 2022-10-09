import { useSelector } from "react-redux";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import classes from "./Main.module.css";
import Properties from "./Properties";
import Drink from "./Drink";
const Main = (props) => {
  const isGenerated = useSelector((state) => state.menu.generated);
  const dataBase = useSelector((state) => state.dataBase.dataBase);
  const cocktailsToShow = useSelector(
    (state) => state.dataBase.cocktailsToShow
  );

  let arr = [];
  let imgesList = [];
  dataBase.forEach((dbElement) => {
    arr.push(dbElement.cocktail);
    arr.forEach((cocktailElement) => {
      console.log(cocktailElement.cocktail);
      for (const item in cocktailElement) {
        imgesList.push(cocktailElement[item].image);
      }
    });
  });
  // Shuffle array
const shuffled = imgesList.sort(() => 0.5 - Math.random());

// Get sub-array of first n elements after shuffled
let selected = shuffled.slice(0, 6);
  console.log(selected);

  const mapCocktails = cocktailsToShow.map((element) => (
    <Drink key={element.name} drink={element} />
  ));
  return (
    <section id="main" className={classes.main}>
      {isGenerated && <Properties />}
      {isGenerated ? (
        <div>{mapCocktails}</div>
      ) : (
        <>
         <ListSubheader component="div">What Would You Like to Drink Tonight?</ListSubheader>
          <ImageList sx={{  height: 150, mx:2 }} cols={6} rowHeight="150"
          variant="standard ">
            {selected.map((item, index) => (
              <ImageListItem key={index}>
                <img 
                  src={`${item}?w=14&h=164&fit=crop&auto=format`}
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={"random cocktails"}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      )}
    </section>
  );
};

export default Main;
