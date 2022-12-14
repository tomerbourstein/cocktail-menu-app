import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataBaseActions } from "./store/dataBase-slice";
import { profileActions } from "./store/profile-slice";
import { menuActions } from "./store/menu-slice";

import Loading from "./components/Main/Loading";

import Header from "./components/Header/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import Input from "./components/Input/Input";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import CustomCocktails from "./components/CustomCocktails/CustomCocktails";
import Favorites from "./components/Favorites/Favorites";
import classes from "./App.module.css";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const menuShow = useSelector((state) => state.menu.menuShow);
  const favoritesShow = useSelector((state) => state.menu.favoritesShow);
  const customCocktailShow = useSelector(
    (state) => state.menu.customCocktailShow
  );
  const loginPageShow = useSelector((state) => state.menu.loginPageShow);
  const favoritesList = useSelector((state) => state.menu.favoritesList);
  const isChanged = useSelector((state) => state.menu.changed);
  const updatedCustomDb = useSelector(
    (state) => state.dataBase.updatedCustomDb
  );
  const isLoading = useSelector((state) => state.menu.isLoading);
  const playAnimation = useSelector((state) => state.menu.playAnimation);

  const email = localStorage.getItem("email");
  const user = email ? email.substring(0, email.indexOf("@")) : "";

  ////////// Only when page is loaded fetch the data from firebase. then create two arrays
  ////////// 1. Contains the liquers in the db. 2. the entire db.
  useEffect(() => {
    const handleFetchData = async () => {
      const response = await fetch(
        "https://cocktail-menu-app-default-rtdb.firebaseio.com/db.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch data!");
      }
      const data = await response.json();
      const dataBase = [];
      const liquers = [];
      for (const key in data) {
        dataBase.push({
          id: key,
          main_liquer: key,
          cocktail: data[key],
        });
        liquers.push(key);
      }
      dispatch(dataBaseActions.fetchData({ dataBase, liquers }));
    };
    handleFetchData();
    const initialToken = localStorage.getItem("token");
    if (initialToken) {
      dispatch(
        profileActions.login({
          token: initialToken,
          email: email,
          loggedIn: true,
        })
      );
      dispatch(menuActions.openMenu());
    }
  }, [dispatch, email]);

  ////////// Post favorites everytime the list changes for each user.
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (isChanged) {
      async function postFavorites(enteredData) {
        const requestOptions = {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(enteredData),
        };

        const response = await fetch(
          `https://cocktail-menu-app-default-rtdb.firebaseio.com/USERS/${user}/favorites.json`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Something Went Wrong!");
        }
      }
      postFavorites(favoritesList);
    }
  }, [favoritesList, user, isChanged]);

  ////////// For every reload of the page the custom cocktails and favorites of each user will be saved and rendered.
  useEffect(() => {
    const handleFetchData = async () => {
      const response = await fetch(
        `https://cocktail-menu-app-default-rtdb.firebaseio.com/USERS/${user}.json`
      );
      if (!response.ok) {
        throw new Error("Could not fetch data!");
      }
      const data = await response.json();
      let customCocktails = [];
      if (data === null) {
        return;
      } else {
        if (data.custom !== undefined || data.favorites !== undefined) {
          for (const key in data.custom) {
            customCocktails.push({
              id: key,
              main_liquer: key,
              cocktail: data.custom[key],
            });
          }
          if (data.favorites !== undefined || data.custom !== undefined) {
            dispatch(menuActions.replaceFavorites(data.favorites));
          }
        }
      }
      dispatch(dataBaseActions.setUserCustomCocktails(customCocktails));
    };
    handleFetchData();
  }, [dispatch, user, updatedCustomDb]);

  return (
    <div className="App">
      <Fragment>
        {!loginPageShow && <Header />}
        <div className={playAnimation && classes.animateContent}>
          {isLoading && <Loading />}
          {loginPageShow ? <LoginPage /> : null}
          {menuShow ? (
            <>
              <Input />
              <Main />
            </>
          ) : null}
          {favoritesShow ? <Favorites /> : null}

          {!customCocktailShow ? null : <CustomCocktails />}
        </div>
        {!loginPageShow && <Footer />}
      </Fragment>
    </div>
  );
}

export default App;
