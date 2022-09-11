import Form from "./Form";

const CustomCocktails = () => {
  async function postHandler(enteredData) {
    const { main_liqueur } = enteredData;
    console.log(main_liqueur);
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(enteredData),
    };

    const response = await fetch(
      `https://cocktail-menu-app-default-rtdb.firebaseio.com/custom/${main_liqueur}.json`,
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
