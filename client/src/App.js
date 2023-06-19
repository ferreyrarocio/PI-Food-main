import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import { Detail, Form, Home, Landing } from "./views/index";
import { useState } from "react";
import NavBar from "./components/NavBar";
import style from "./App.module.css";
import axios from "axios";
const { API_KEY } = process.env;

function App() {
  const [recipes, setRecipes] = useState([]);

  const location = useLocation();

  const onSearch = async (title) => {
    try {
      const { data } = await axios(
        `http://localhost:3001/recipes/?title=${title}`
      );
      if (data.title) {
        setRecipes((oldRecipes) => [...oldRecipes, data]);
      }
    } catch (error) {
      alert("There's no recipes with that name!");
    }
  };

  return (
    <BrowserRouter>
      <div className={style.App}>
        {/* {location.pathname !== "/" ? <NavBar  /> : null} */}

        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/newrecipe" render={() => <Form />} />
        <Route path="/detail/:detailId" element={<Detail />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
