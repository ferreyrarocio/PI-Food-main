const { Recipe, Diet } = require("../db");

const postRecipe = async ({
  title,
  summary,
  healthScore,
  steps,
  image,
  diets,
}) => {
  const newRecipe = await Recipe.create({
    title,
    image,
    summary,
    healthScore,
    steps,
  });

  let dietsdb = await Diet.findAll({
    where: { name: diets },
  });

  await newRecipe.addDiet(dietsdb);

  return newRecipe;
};
// relacionar la nueva receta con las dietas

module.exports = { postRecipe };
