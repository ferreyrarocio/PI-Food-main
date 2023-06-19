const { Diet } = require("../db/");

const loaderDiets = async () => {
  const diets = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto-vegetarian",
    "lacto ovo vegetarian",
    "vegan",
    "pescatarian",
    "paleolithic",
    "primal",
    "whole 30",
    "fodmap friendly",
    "dairy free",
  ];

  //*obtengo un array de findorcreate por cada dieta, esto se me convierte en un array de promesas
  let allDiets = diets.map((e) => Diet.findOrCreate({ where: { name: e } }));
  //* resuelvo todas las promesas y una vez realizado devuel un string que se cargaron las dietas
  try {
    Promise.all(allDiets).then((e) => console.log("Loaded Diets..."));
  } catch (error) {
    throw new Error(error.message);
  }
  /*     
    
    diets.forEach(async (element) => await Diet.create({ name: element }));
 */
};

module.exports = {loaderDiets};
