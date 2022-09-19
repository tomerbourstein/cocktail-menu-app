import { useSelector } from "react-redux";
import Form from "./Form";

const CustomCocktails = () => {
  const email = useSelector(state => state.profile.profileEmail);
const user = email.substring(0,email.indexOf("@"));

  async function postHandler(enteredData) {
    const { main_liqueur } = enteredData;
    console.log(main_liqueur);
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(enteredData),
    };

    const response = await fetch(
      `https://cocktail-menu-app-default-rtdb.firebaseio.com/USERS/${user}/custom/${main_liqueur}.json`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }
    const data = await response.json();
    console.log(data);
  }

  return (
    <section>
      <Form postHandler={postHandler} />
    </section>
  );
};

export default CustomCocktails;
