import { createSlice } from "@reduxjs/toolkit";

const dataBaseSlice = createSlice({
  name: "dataBase",
  initialState: {
    dataBase: [],
    liquers: [],
    userCustomCocktails: [],
    preferences: "",
    filteredByLiquer: [],
    cocktailsToShow: [],
    properties: [],
    filteredByProps: [],
    updatedCustomDb: false,
  },
  reducers: {
    fetchData(state, action) {
      /// sace the database from backend and list of liqueurs.
      state.dataBase = action.payload.dataBase;
      state.liquers = action.payload.liquers.map((element) => {
        return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
      });
    },
    setPreference(state, action) {
      /// save the preferred alcohol set by the user.
      state.preferences = action.payload;
    },
    setUserCustomCocktails(state, action) {
      /// save the entered custom cocktails the user published.
      state.userCustomCocktails = action.payload;
    },
    addCustomCocktails(state) {
      /// adding the custom cocktail list of the user into the db to shuffle drink from.
      state.updatedCustomDb = !state.updatedCustomDb;
    },
    filterByLiquer(state, action) {
      /// filter the db by preferred alcohol to shuffle from.
      let foundAlcohol = state.dataBase.find(
        (element) =>
          element.main_liquer === action.payload.alcohol.toLowerCase()
      );
      let foundCustomAlcohol = state.userCustomCocktails.find(
        (element) =>
          element.main_liquer === action.payload.alcohol.toLowerCase()
      );
      state.filteredByLiquer.length = 0;
      for (const key in foundAlcohol.cocktail) {
        state.filteredByLiquer.push(foundAlcohol.cocktail[key]);
      }
      if (action.payload.switchIsChecked) {
        if (foundCustomAlcohol) {
          for (const key in foundCustomAlcohol.cocktail) {
            state.filteredByLiquer.push(foundCustomAlcohol.cocktail[key]);
          }
        }
      }
    },
    setCocktailsToShow(state) {
      state.cocktailsToShow = [];
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
    setPropsList(state) {
      /// create new list of properties for chip in main menu.
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
      let removedProperty = action.payload;
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
      const filterRemoved = state.cocktailsToShow.filter(
        (i) =>
          i.flavours.includes(removedProperty) ||
          i.properties.includes(removedProperty)
      );
      const filterRemaining = state.cocktailsToShow.filter(
        (i) =>
          !i.flavours.includes(removedProperty) &&
          !i.properties.includes(removedProperty)
      );

      // 1. filter filteredByLiquer to delete cocktailsToShow.
      const filterNotShown = state.filteredByLiquer.filter(
        (i) => !state.cocktailsToShow.includes(i)
      );

      // 2. filter filterNotShown to delete elements equals to property deleted.
      const filterNoProperty = filterNotShown.filter(
        (i) =>
          !i.flavours.includes(removedProperty) &&
          !i.properties.includes(removedProperty)
      );

      // 3. create a function that filter if the elements deleted match their strength with new cocktail.strength.
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

      // 4. from filterNoProperty get the amount of cocktails deleted that are equals to the deleted cocktails strengths.
      let arr = [];
      for (const c in filterRemoved) {
        let foundStrength = filterRemoved[c].strength;
        let newCocktail = getRandomCocktails(1, foundStrength);
        if (newCocktail.length === 0) {
          newCocktail = [emptyCocktail];
        }
        arr = arr.concat(newCocktail);
      }
      // 5. add all to one array and sort it by strength.
      let newCocktailsToShow = [...filterRemaining, ...arr];
      let sortedCocktailsToShow = newCocktailsToShow.sort(function (a, b) {
        if (a.strength === "") return 1;
        else if (b.strength === "") return -1;
        else return a.strength - b.strength;
      });
      sortedCocktailsToShow = [...new Set([...sortedCocktailsToShow])];

      // 6. change real cocktailsToShow to the filtered one.
      state.cocktailsToShow = sortedCocktailsToShow;
    },
  },
});

export const dataBaseActions = dataBaseSlice.actions;
export default dataBaseSlice;
