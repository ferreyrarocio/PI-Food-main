import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import CardsContainer from "../components/CardsContainer";
import style from "./Home.module.css";
import Paging from "./Paging/Paging";
import {
  filterReset,
  getRecipes,
  filterByDiets,
  orderByName,
  orderByHealthScore,
  filterByOrigin,
} from "../redux/actions";

//cuando se monta => useEffect() se monta y dsp imprime
//que haga el dispatch => useDispatch()

const Home = () => {
  const dispatch = useDispatch();

  const allRecipes = useSelector((state) => state.recipes);

  const [search, setSearch] = useState("");
  const [orden, setOrden] = useState("");
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexLastRecipe = currentPage * recipesPerPage;
  const indexFirstRecipe = indexLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

  const webPaging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  function handleClick(e) {
    //para resetear las recetas
    e.preventDefault(); //para que no se rompa
    dispatch(filterReset());
    setCurrentPage(1);
    document.getElementById("orderByName").selectedIndex = 0;
    document.getElementById("orderByHealth").selectedIndex = 0;
    document.getElementById("filteredByDiets").selectedIndex = 0;
    document.getElementById("filteredCreated").selectedIndex = 0;
  }

  function handleDiets(e) {
    e.preventDefault();
    dispatch(filterByDiets(e.target.value));
    setCurrentPage(1);
    document.getElementById("filteredCreated").selectedIndex = 0;
  }

  function handleabc(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Sorted ${e.target.value}`);
  }

  function handleHealthScore(e) {
    e.preventDefault();
    dispatch(orderByHealthScore(e.target.value));
    setCurrentPage(1);
    setOrder(`Sorted ${e.target.value}`);
  }

  function handlerFilteredCreated(e) {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value)); //recordar esto es el payload lo del select
    document.getElementById("filteredByDiets").selectedIndex = 0;
    setCurrentPage(1);
  }

  return (
    <div className={style.container}>
      <NavBar />

      <div className="site-bg">
        <div className="wrapper">
          <div>
            <Paging
              recipesPerPage={recipesPerPage}
              allRecipes={allRecipes.length}
              pagingFunc={webPaging}
            />
          </div>
          <div className={style.cards}>
            <CardsContainer />
          </div>
        </div>
        <div>
          <button
            onClick={(e) => {
              handleClick(e);
            }}
            className={style.botonfind}
          >
            Reset Filters
          </button>
        </div>
        <div>
          <select
            id="orderByName"
            onChange={(e) => handleabc(e)}
            className={style.filters}
          >
            <option value="All">sort by alphabetical order </option>
            <option value="asc">Sort A-Z</option>
            <option value="des">Sort Z-A</option>
          </select>
        </div>
        <div>
          <select
            id="orderByHealth"
            onChange={(e) => handleHealthScore(e)}
            className={style.filters}
          >
            <option value="All">Filter by health score</option>
            <option value="mayorcincuenta">healthy</option>
            <option value="menorcincuenta">junk</option>
          </select>
        </div>
        <div>
          <select
            id="filteredByDiets"
            onChange={(e) => handleDiets(e)}
            className={style.filters}
          >
            <option value="All">Filter by diet</option>
            <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="dairy free">Dairy Free</option>
            <option value="lacto-vegetarian">Lacto-Vegetarian</option>
            <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="whole 30">Whole 30</option>
            <option value="fodmap friendly">Fodmap Friendly</option>
            <option value="dairy free">Dairy Free</option>
          </select>

          <select
            id="filteredCreated"
            onChange={(e) => handlerFilteredCreated(e)}
            className={style.filters}
          >
            <option value="All">Filter by Origin</option>
            <option value="Db">Created</option>
            <option value="Api">API</option>
          </select>
        </div>

        <Link to="/home">
          <button className={style.botonfind}>
            {" "}
            Find the perfect recipe!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
