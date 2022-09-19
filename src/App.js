import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataBaseActions } from "./store/dataBase-slice";
import { profileActions } from "./store/profile-slice";
import { menuActions } from "./store/menu-slice";
import Header from "./components/Header/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import Input from "./components/Input/Input";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import CustomCocktails from "./components/CustomCocktails/CustomCocktails";
import Favorites from "./components/Favorites/Favorites";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const menuShow = useSelector((state) => state.menu.menuShow);
  const favoritesShow = useSelector((state) => state.menu.favoritesShow);
  const customCocktailShow = useSelector(
    (state) => state.menu.customCocktailShow
  );
  const loginPageShow = useSelector((state) => state.menu.loginPageShow);

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
      dispatch(profileActions.login({ token: initialToken, loggedIn: true }));
      dispatch(menuActions.openMenu());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Fragment>
        <Header />
        {loginPageShow ? <LoginPage /> : null}
        {menuShow ? (
          <>
            <Input />
            <Main />
          </>
        ) : null}
        {favoritesShow ? <Favorites /> : null}

        {!customCocktailShow ? null : <CustomCocktails />}
        <Footer />
      </Fragment>
    </div>
  );
}

export default App;
