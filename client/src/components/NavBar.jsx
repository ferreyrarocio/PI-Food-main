import style from "./NavBar.module.css";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NavBar = ({ onSearch }) => {
  const dispatch = useDispatch();

  const allRecipes = useSelector((state) => state.recipes);
  const [isLoading, setIsLoading] = useState(true);

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

  function handlePageClick(page) {
    setCurrentPage(page);
  }

  return (
    <div className={style.nav}>
      <img
        className={style.logo}
        src="https://clipart-library.com/img1/1218759.gif"
      />

      <NavLink to="/newrecipe">
        <button className={style.newr}> Write down a new recipe</button>
      </NavLink>

      <SearchBar onSearch={onSearch} />
    </div>
    
  );
};

export default NavBar;
