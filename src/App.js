import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cocktailsListActions } from "./store/cocktails-list-slice";
import Header from "./components/Header/Header";
import Input from "./components/Input/Input";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleFetchData = async () => {
      const response = await fetch(
        "https://cocktail-menu-app-default-rtdb.firebaseio.com/db.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch data!");
      }
      const data = await response.json();
      const cocktailsList = [];
      const liquers = [];
      for (const key in data) {
        cocktailsList.push({
          id: key,
          main_liquier: key,
          cocktail: data[key],
        });
        liquers.push(key);
      }
      dispatch(cocktailsListActions.fetchData({ cocktailsList, liquers }));
      // dispatch(cocktailsListActions.fetchData(liquers));
    };
    handleFetchData();
  }, [dispatch]);
  return (
    <div className="App">
      <Fragment>
        <Header />
        <Input />
        <Main />
        <Footer />
      </Fragment>
    </div>
  );
}

export default App;
