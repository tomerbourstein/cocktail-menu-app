import Header from "./components/Header/Header";
import Input from "./components/Input/Input";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { Fragment } from "react";

function App() {
  return <div className="App">
    <Fragment>

    <Header />
    <Input />
    <Footer />
    </Fragment>
  </div>;
}

export default App;
