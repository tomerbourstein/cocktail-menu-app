import { createSlice, current } from "@reduxjs/toolkit";

const dataBaseSlice = createSlice({
  name: "dataBase",
  initialState: {
    dataBase: [],
    liquers: [],
    preferences: "",
    filteredByLiquer: [],
    cocktailsToShow: [],
    properties: [],
  },
  reducers: {
    fetchData(state, action) {
      state.dataBase = action.payload.dataBase;
      state.liquers = action.payload.liquers.map((element) => {
        return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
      });
    },
    setPreference(state, action) {
      state.preferences = action.payload;
    },
    filterByLiquer(state, action) {
      let foundAlcohol = state.dataBase.find(
        (element) => element.main_liquer === action.payload.toLowerCase()
      );
      state.filteredByLiquer.length = 0;
      for (const key in foundAlcohol.cocktail) {
        state.filteredByLiquer.push(foundAlcohol.cocktail[key]);
      }
    },
    setCocktailsToShow(state) {
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
      function getRandomCocktails(amount, strengths) {
        let relevantCocktails = state.filteredByLiquer;
        if (strengths) {
          relevantCocktails = state.filteredByLiquer.filter((cocktail) =>
            strengths.includes(cocktail.strength)
          );
        }
        const shuffle = relevantCocktails.sort(() => 0.5 - Math.random());
        let random = shuffle.slice(0, amount);
        if (random.length === 0) {
          random.push(emptyCocktail);
          return random;
        }
        return random;
      }

      /////////// if preferredAmount is "1", set cart to getRandomCocktails, amount, array of strengths.
      /////////// then dispatch to replaceCocktailsToShow.
      if (state.preferences.preferredAmount === 1) {
        state.cocktailsToShow = getRandomCocktails(1, [1, 2, 3]);
      }

      /////////// if preferredAmount is "2", set first and second to getRandomCocktails, amount, array of strengths.
      /////////// set cart with concat() to add those arrays.
      /////////// then dispatch to replaceCocktailsToShow.
      else if (state.preferences.preferredAmount === 2) {
        let first = getRandomCocktails(1, [1, 2]);
        let second = getRandomCocktails(1, [3]);
        state.cocktailsToShow = first.concat(second);
      }

      /////////// if preferredAmount is "3", set first, second and third to getRandomCocktails, amount, array of strengths.
      /////////// set cart with concat() to add those arrays.
      /////////// then dispatch to replaceCocktailsToShow.
      else if (state.preferences.preferredAmount === 3) {
        let first = getRandomCocktails(1, [1]);
        let second = getRandomCocktails(1, [2]);
        let third = getRandomCocktails(1, [3]);
        state.cocktailsToShow = first.concat(second, third);
      }

      /////////// if preferredAmount is "4", set first, second_third and fourth to getRandomCocktails, amount, array of strengths.
      /////////// set cart with concat() to add those arrays.
      /////////// then dispatch to replaceCocktailsToShow.
      else if (state.preferences.preferredAmount === 4) {
        let first = getRandomCocktails(1, [1]);
        let second_third = getRandomCocktails(2, [2]);
        let fourth = getRandomCocktails(1, [3]);
        state.cocktailsToShow = first.concat(second_third, fourth);
      }
    },
    setPropsList(state, action) {
      state.properties = [];
      for (const key in state.cocktailsToShow) {
        let flavours = state.cocktailsToShow[key].flavours;
        let props = state.cocktailsToShow[key].properties;
        if (!flavours.includes("") && !props.includes("")) {
          let flavoursAndProps = state.properties.concat(flavours, props);

          state.properties = [...new Set([...flavoursAndProps])];
        }
      }
    },
    filterCocktails(state, action) {
      let removedProp = action.payload;
      let removedCocktails = state.cocktailsToShow.filter(
        (cocktail) =>
          cocktail.flavours.includes(removedProp) ||
          cocktail.properties.includes(removedProp)
      );
      let remainingCocktails = state.cocktailsToShow.filter(
        (cocktail) =>
          !cocktail.flavours.includes(removedProp) &&
          !cocktail.properties.includes(removedProp)
      );

      function getRandomCocktails(amount, strengths) {
        let relevantCocktails = state.filteredByLiquer;
        if (strengths) {
          relevantCocktails = state.filteredByLiquer.filter(
            (cocktail) => strengths === cocktail.strength
          );
        }
        let newRelevant = relevantCocktails.filter(
          (cocktail) =>
            !relevantCocktails.includes(removedCocktails) &&
            !relevantCocktails.includes(remainingCocktails)
        );
        const shuffle = newRelevant.sort(() => 0.5 - Math.random());
        let random = shuffle.slice(0, amount);

        return random;
      }

      let arr = [];
      for (const cocktail in removedCocktails) {
        let foundStrength = removedCocktails[cocktail].strength;
        let newCocktail = getRandomCocktails(1, foundStrength);
        arr = arr.concat(newCocktail);
      }

      state.cocktailsToShow = remainingCocktails.concat(arr);
    },
  },
});

export const dataBaseActions = dataBaseSlice.actions;
export default dataBaseSlice;
