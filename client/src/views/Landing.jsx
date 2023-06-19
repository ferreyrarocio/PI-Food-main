import style from "./Landing.module.css";
import { NavLink, useLocation  } from "react-router-dom";
import NavBar from "../components/NavBar";

const Landing = () => {
    const location = useLocation();
  return (
    <div className={style.land}>
      <div className={style.titulo}>
        <h1>Are you hungry? Let's cook!</h1>
      </div>
      <div >
        <NavLink to="/home">
          <button className={style.landi}>
            ♥ DISCOVER NEW RECIPES ♥
          </button>
        </NavLink>
        {location.pathname !== "/" && <NavBar/>}
      </div>
    </div>
  );
};

export default Landing;
