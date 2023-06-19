// const { Recipe } = require("../db");
// const axios = require("axios");
// const { API_KEY } = process.env;
// const { cleanArray } = require("./getAllRecipes");
// const { Op } = require("sequelize");
// require("dotenv").config();

// const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true&number=100`;

// // const getRecipeByName = async (name)=> {
// //     const lowerCaseName = name.toLowerCase();
// //     const dataBaseRecipe = await Recipe.findAll({where: {name: {[Op.iLike]: `%${name}%`}}});
// //     const apiR = (await axios.get(`${URL}`)).data;
// //     const apiRecipes = cleanArray(apiR.results);
// //     const filteredApi = apiRecipes.filter((Recipe) => Recipe.name.toLowerCase().includes(lowerCaseName));
// //     return [...filteredApi, ...dataBaseRecipe]
// // }

// const getRecipeByName = async (name) => {
//   const lowerCaseName = name.toLowerCase();

//   const apiResponse = await axios.get(
//     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
//   );
//   const { data } = apiResponse;
//   const { results } = data;

//   const filteredApi = results.filter((recipe) =>
//     recipe.name.toLowerCase().includes(lowerCaseName)
//   );
//   const nameRecipes = filteredApi.map((recipe) => ({
//     id: recipe.id,
//     title: recipe.title,
//     image: recipe.image,
//     summary: recipe.summary,
//     healthScore: recipe.healthScore,
//     diets: recipe.diets,
//   }));
//   return nameRecipes;
// };

// module.exports = { getRecipeByName };
