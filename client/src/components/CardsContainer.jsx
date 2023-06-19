import Card from "./Card";
import style from "./CardsContainer.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../redux/actions";

//este componente debe tomar un array de recetas y por cada receta renderizar un componente card
const CardsContainer = () => {
  const recipes = useSelector((state) => state.recipes);

  return (
    <div className={style.cartas}>
      {recipes.map((reci) => {
        return (
          <Card
            id={reci.id}
            title={reci.title}
            image={reci.image}
            summary={reci.summary}
            healthScore={reci.healthScore}
            steps={reci.steps}
            diets={reci.diets}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
