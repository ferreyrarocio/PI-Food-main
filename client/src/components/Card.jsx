import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

//este componente debe mostrar la info de c/ receta mapeada, also darnos un link para ir al detalle

const Card = ({ id, title, image, diets, healthScore }) => {
  return (
    <Link to={`/detail/${id}`} style={{ textDecoration: 'none' }}>
      <div className={style.carta}>
   
        <div className={style.letras}>
          <h2>{title}</h2>

          <div >
          <img src={image} alt="" />
        </div>
        
          <p>Health Score: {healthScore}</p>
          <div className={style.diets}>
            <p id={style.diets}>
              {diets?.map((diet) => (
                <span className={style.span}>{diet.name}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default Card;
