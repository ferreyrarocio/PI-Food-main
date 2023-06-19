import axios from "axios";

export const FILTER_RESET = "FILTER_RESET";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const GET_BY_NAME = "GET_BY_NAME";

export const GET_DIETS = "GET_DIETS";

export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_HEALTHSCORE = "ORDER_BY_HEALTHSCORE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const ADD_RECIPE = "ADD_RECIPE";


export const filterReset = () => {
  return {
    type: FILTER_RESET,
  };
};

export const addRecipe = (recipe) => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/recipes", recipe);
    return dispatch({
      type: ADD_RECIPE,
      payload: response.data,
    });
  };
};

export const getRecipes = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: GET_RECIPES,
      payload: response.data,
    });
  };
};

export const getRecipeById = (idecipe) => {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/recipes/${idecipe}`
    );
    return dispatch({
      type: GET_RECIPE_BY_ID,
      payload: response.data,
    });
  };
};

export function getRecipesByName(title) {
  return async function (dispatch) {
    await axios
      .get(`http://localhost:3001/recipes/?title=${title}`)
      .then((response) => {
        return dispatch({ type: GET_BY_NAME, payload: response.data });
      })
      .catch((error) => {
        alert("Recipe not found");
      });
  };
}

export function getDiets() {
  return async function (dispatch) {
    var response = await axios.get(`http://localhost:3001/recipes/types`);
    return dispatch({
      type: GET_DIETS,
      payload: response.data,
    });
  };
}

export function postRecipes(payload) {
  const endpoint = "http://localhost:3001/recipes";
  return async function (dispatch) {
    var response = await axios.post(endpoint, payload);
    return response;
  };
}

export const filterByDiets = (payload) => {
  return {
    type: FILTER_BY_DIETS,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByHealthScore = (payload) => {
  return {
    type: ORDER_BY_HEALTHSCORE,
    payload,
  };
};

export const filterByOrigin = (payload) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };


};
