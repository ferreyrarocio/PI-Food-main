import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import validation from "./Validation";
import style from "./Form.module.css";
import { Link } from "react-router-dom";
import { addRecipe, getDiets } from "../redux/actions";

// esto es para AGREGAR UNA RECETA

const Form = ({ save }) => {
  const formRef = useRef(null); //*Hook para referencia el form
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.typeDiets);
  const [stepDescription, setStepDescription] = useState("");

  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: 50,
    image: "",
    steps: [],
    diets: [],
    numSteps: 0,
  });
  const [errors, setErrors] = useState({});

  //*cuando se renderiza el formulario cargo los tipos de dietas ejecutando la actions
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function handlerCheckbox(event) {
    if (event.target.checked) {
      setForm({
        ...form,
        diets: [...form.diets, event.target.value],
      });
    } else {
      setForm({
        ...form,
        diets: form.diets.map((r) => r !== event.target.value),
      });
    }
  }

  //handler q captura info d los input y realiza las validaciones
  const handleChange = (event) => {
    setErrors(validation({ ...form, [event.target.name]: event.target.value }));
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  //handler q envia la info de la receta nueva
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      form.title &&
      form.summary &&
      form.image &&
      form.diets.length &&
      form.steps.length &&
      !Object.keys(errors).length
    ) {
      console.log(recipe);
      dispatch(addRecipe(recipe));

      alert("Recipe successfully Created");
      setRecipe({
        title: "",
        summary: "",
        healthScore: 50,
        image: "",
        steps: [],
        diets: [],
        numSteps: 0,
      });
      formRef.current.reset();
    } else {
      alert("All fields are required");
    }
  };

  const changeHandler = (event) => {
    //esta funcion tiene q leer lo q escribi y guardarlo en el estado q corresponda
    const property = event.target.name;
    const value = event.target.value;
    validate({ ...form, [property]: value });
    if (event.target.checked) {
      setForm({ ...form, diets: [...form.diets, value] });
    } else {
      setForm({
        ...form,
        diets: form.diets.filter((x) => x !== value),
      });
    }
    // validate1({ ...form, [property]: value });
    setForm({ ...form, [property]: value });
  };

  //* Funcion handler para capturar los tipos de dieta que son chequeadas

  // es requisito que el formulario de creación esté validado sólo con JavaScript.

  const validate = (form) => {
    if (/^([^0-9]*)$/.test(form.title)) {
      setErrors({ ...errors, title: "" });
    } else {
      setErrors({ ...errors, title: "Numbers are not allowed" });
    }
  };

  // const validate1 = (form) => {
  //   if (/^[1-9]?[0-9]{1}$|^100$/.test(form.healthScore)) {
  //     setErrors({ ...errors, healthScore: "" });
  //   } else {
  //     setErrors({
  //       ...errors,
  //       healthScore: "Choose a number between 1 and 100!",
  //     });
  //   }
  // };

  const handleDelete = (event) => {
    console.log(event.target.value);
    event.preventDefault();
    setForm({
      ...form,
      steps: [],
    });
  };

  function handleChangeStep(event) {
    setStepDescription(event.target.value);
  }

  function handleStep(event) {
    event.preventDefault();
    if (stepDescription !== "") {
      setForm({
        ...form,
        numSteps: form.numSteps + 1,
        steps: [
          ...form.steps,
          { number: form.numSteps + 1, step: stepDescription },
        ],
      });
      setStepDescription("");
    } else {
      alert("please put a step");
    }
  }

  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit} className={style.formulario} ref={formRef}>
        <Link
          to="/home"
          className={style.back}
          style={{ textDecoration: "none" }}
        >
          Back to Home
        </Link>

        <div>
          <label>Title: </label>
          <input
            className={style.input}
            type="text"
            value={form.title}
            onChange={changeHandler}
            name="title"
          />
          {errors.title && <span>{errors.title}</span>}
        </div>

        <div>
          <label>Summary: </label>
          <input
            className={style.input}
            type="text"
            value={form.summary}
            onChange={changeHandler}
            maxLength="150"
            name="summary"
          />
        </div>

        <div>
          <label>Health Score: </label>
          <input
            className={style.input}
            type="range"
            min="0"
            max="100"
            value={form.healthScore}
            onChange={changeHandler}
            name="healthScore"
          />
          <output id="rangevalue">{form.healthScore}</output>
          {/* {errors.healthScore && <span>{errors.healthScore}</span>} */}
        </div>

        <div>
          <label>Instructions: </label>
          <textarea
            className={style.input}
            type="text"
            name="steps"
            maxLength="500"
            value={stepDescription}
            onChange={handleChangeStep}
          />
          <div>
            <button onClick={handleStep} className={style.pasos}>
              Next step
            </button>
            <button className={style.pasos} onClick={handleDelete}>
              Reset steps
            </button>
          </div>
          <ul>
            {form.steps.map((event, idx) => {
              return (
                <p key={idx} className={style.listSteps}>
                  {event.number} : {event.step}
                </p>
              );
            })}
          </ul>
        </div>

        <div>
          <label>Image: </label>
          <input
            className={style.input}
            type="url"
            value={form.image}
            onChange={changeHandler}
            name="image"
          />
        </div>

        <div className={style.inputDietas}>
          <legend>Choose one or more diets: </legend>
          {allDiets?.map((x) => {
            return (
              <div key={x.id}>
                <label htmlFor="">
                  <input
                    className={style.input}
                    type="checkbox"
                    onChange={changeHandlerDiets}
                    name="diets"
                    value={x.name}
                  />
                  {x.name}
                </label>
              </div>
            );
          })}
        </div>

        <button type="submit" className={style.back}>
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default Form;


// Posibilidad de seleccionar/agregar varios tipos de dieta en simultáneo?

