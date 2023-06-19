const getInfoApi = require("./GetInfoApi");
const getInfoDb = require("./GetInfoDb");

const getAllRecipes = async () => {
  //*obtengo la informacion a partir de la API
  const infoApi = await getInfoApi();
  //*obtengo las recetas que han sido creadas por el usuario 
  const infoDb = await getInfoDb();
  //*Creo un array con las recetas d BD y API
  const allRecipes = [...infoApi, ...infoDb];
  return allRecipes;
};

module.exports = {getAllRecipes};
