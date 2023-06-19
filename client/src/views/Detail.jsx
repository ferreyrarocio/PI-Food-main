import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navLink, Link, useParams } from "react-router-dom";
import { getRecipeById } from "../redux/actions";
import style from "./Detail.css";
import carganding from "./carganding.png";
import axios from "axios";

export default function Detail() {
  const { detailId } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const recipe = await axios(`/recipes/${detailId}`);
      const recipeDet = recipe.data;
      setRecipeDetail(recipeDet);
      setIsLoading(false);
      // ...
    }
    fetchData();
  }, [detailId]); // Or [] if effect doesn't need props or state

  function removerCaracteres(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <div className={style.detailSection}>
      <Link
        to="/home"
        className={style.back}
        style={{ textDecoration: "none" }}
      >
        Back to Home
      </Link>

      {isLoading ? (
        <div className={style.loading}>
          <img src={carganding} alt="Loading..." />
        </div>
      ) : (
        <div>
          <div className={style.overlay} />
          <div className={style.title}>
            <h2>{recipeDetail.title}</h2>
          </div>

          <div className={style.recipeDetail}>
            <div>
              <div className={style.infoContainer}>
                <div className={style.diets}>
                  <p id={style.diets}>
                    {recipeDetail.diets &&
                      recipeDetail.diets.map((diet, ind) => (
                        <span key={ind} className={style.span}>
                          {diet.name}
                        </span>
                      ))}
                  </p>
                </div>
                <p>ID: {recipeDetail.id}</p>
                <p>
                  {recipeDetail.summary &&
                    removerCaracteres(recipeDetail.summary)}
                </p>
                <p>Health Score: {recipeDetail.healthScore}</p>
              </div>
              <div className={style.img}>
                <img src={recipeDetail.image} alt="" />
              </div>
            </div>
            <h2>steps:</h2>
            <div className={style.liststeps}>
              <ul>
                {recipeDetail.steps &&
                  recipeDetail.steps.map((x, index) => (
                    <li key={index}>
                      {x.number}: {x.step}
                    </li>
                  ))}
              </ul>
            </div>
            <Link to="/home">
              <button className="btn">Back to Home </button>{" "}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
