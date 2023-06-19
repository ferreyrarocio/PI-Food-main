import {
  GET_RECIPES,
  GET_RECIPE_BY_ID,
  GET_BY_NAME,
  GET_DIETS,
  ORDER_BY_NAME,
  ORDER_BY_HEALTHSCORE,
  FILTER_BY_DIETS,
  FILTER_BY_ORIGIN
} from "./actions";

const initialState = {
  recipes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, recipes: action.payload };
    default:
      return { ...state };

    case GET_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };

    case GET_RECIPE_BY_ID:
      return {
        ...state,
        details: action.payload,
      };

    case GET_DIETS:
      return {
        ...state,
        diet: action.payload,
      };

    case FILTER_BY_DIETS:
      const allRec = state.allRecipes;

      const typeDietFilter =
        action.payload === "All"
          ? allRec
          : allRec.filter((t) => t.diet.find((e) => e.name === action.payload));
      if (action.payload === "createdInDb") {
        const typeDietFilter = allRec.filter((t) => t.createdInDb === true);
        return {
          ...state,
          recipes: typeDietFilter,
        };
      }
      return {
        ...state,
        recipes: typeDietFilter,
      };

    case ORDER_BY_NAME: // Order_by_title
      let order =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return -1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: order,
      };

    case ORDER_BY_HEALTHSCORE:
      let orderpunt =
        action.payload === "menormayor"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      if (action.payload === "mayorcincuenta") {
        const orderpunt = state.recipes.filter((t) => t.healthScore >= 50);
        return {
          ...state,
          recipes: orderpunt,
        };
      }
      if (action.payload === "menorcincuenta") {
        const orderpunt = state.recipes.filter((t) => t.healthScore <= 50);
        return {
          ...state,
          recipes: orderpunt,
        };
      }
      return {
        ...state,
        recipes: orderpunt,
      };
      
      case FILTER_BY_ORIGIN:
        let recipesFilter = [];
        if (action.payload === "All") {
          recipesFilter = state.recipes;
        } else if (action.payload === "Db") {
          recipesFilter = state.recipes.filter((e) => e.createDb);
        } else if (action.payload === "Api") {
          recipesFilter = state.recipes.filter((e) => !e.createDb);
        }
  
        return {
          ...state,
          recipes: recipesFilter,
        };
  }
};

export default reducer;
