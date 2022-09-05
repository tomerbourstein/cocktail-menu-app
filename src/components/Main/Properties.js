import { useSelector, useDispatch } from "react-redux";
import { dataBaseActions } from "../../store/dataBase-slice";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const Properties = (props) => {
  const dispatch = useDispatch();
  const propsToShow = useSelector((state) => state.dataBase.properties);
  const filteredByLiquer = useSelector(
    (state) => state.dataBase.filteredByLiquer
  );
  const cocktailsToShow = useSelector(
    (state) => state.dataBase.cocktailsToShow
  );

  const handleDelete = (removedProperty) => {
    console.info(`You clicked the delete ${removedProperty} icon.`);
    const emptyCocktail = {
      key: "empty",
      name: "",
      ingredients: [""],
      properties: [""],
      flavours: [""],
      garnish: [""],
      image: "",
      preperation: "Not Enough Data!",
      receipt: [""],
      served: "",
      strength: "",
    };
    // 0. find removed and remaining from cocktailsToShow that has the matching deleted property.
    const filterRemoved = cocktailsToShow.filter(
      (i) =>
        i.flavours.includes(removedProperty) ||
        i.properties.includes(removedProperty)
    );
    const filterRemaining = cocktailsToShow.filter(
      (i) =>
        !i.flavours.includes(removedProperty) &&
        !i.properties.includes(removedProperty)
    );

    // 1. filter filteredByLiquer to delete cocktailsToShow.
    const filterNotShown = filteredByLiquer.filter(
      (i) => !cocktailsToShow.includes(i)
    );

    // 2. filter filerredByLiquier to delete elements equals to property deleted.
    const filterNoProperty = filterNotShown.filter(
      (i) =>
        !i.flavours.includes(removedProperty) &&
        !i.properties.includes(removedProperty)
    );

    // 3. from new filterNoProperty get the amount of cocktails deleted that are equals to the deleted cocktails strengths.
    let arr = [];
    for (const c in filterRemoved) {
      let foundStrength = filterRemoved[c].strength;
      let newCocktail = getRandomCocktails(1, foundStrength);
      if (newCocktail.length === 0) {
        newCocktail = [emptyCocktail];
      }
      arr = arr.concat(newCocktail);
    }

    // 4. add all to one array and sort it by strength.
    let newCocktailsToShow = [...filterRemaining, ...arr]
    let sortedCocktailsToShow = newCocktailsToShow.sort(function(a, b) {
        if (a.strength === "") return 1;
         else if(b.strength === "") return -1;    
         else return a.strength - b.strength;
    });
    console.log(newCocktailsToShow);
    console.log(sortedCocktailsToShow);

    // 5. change real cocktailsToShow to the filtered one.
    dispatch(dataBaseActions.filterCocktails(sortedCocktailsToShow));

    function getRandomCocktails(amount, strengths) {
      let relevantCocktails = filterNoProperty;
      if (strengths) {
        relevantCocktails = filterNoProperty.filter(
          (cocktail) => strengths === cocktail.strength
        );
      }
      const shuffle = relevantCocktails.sort(() => 0.5 - Math.random());
      let random = shuffle.slice(0, amount);
      return random;
    }
  };

  return (
    <Box
      sx={{
        width: 350,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        mx: "auto",
        mb: 2,
      }}
    >
      {propsToShow.map((property) => (
        <Chip
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
