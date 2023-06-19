const { getRecipeById } = require("../controllers/getRecipeById");
const { getRecipeByName } = require("../controllers/getRecipeByName");
const { postRecipe } = require("../controllers/postRecipe");
const { getAllRecipes } = require("../controllers/getAllRecipes");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

//tengo que poder darme cuenta de q tipo d id estoy hablando
//puede q llegue aca in id d algo q no existe
const getRecipeByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeById = await getRecipeById(id);
    if (!recipeById)
      return res.status(401).json({ msg: `Id ${id} not found.` });

    res.status(200).json(recipeById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRecipeByNameHandler = async (req, res) => {
  const { title } = req.query;
  try {
    const recipeByName = await getRecipeByName(title);
    res.status(200).json(recipeByName);
  } catch (error) {
    return res.status(404).send("Not found");
  }
};

const postRecipeHandler = async (req, res) => {
  const { title, summary, healthScore, steps, image, diets } = req.body;

  try {
    if (title && summary && healthScore && steps && image && diets) {
      const recipeObj = {
        title,
        summary,
        healthScore,
        steps,
        image,
        diets,
      };

      const recipe = await postRecipe(recipeObj);

      return res.status(200).json(recipe);
    }

    res.status(400).json({ msg: "Please complete all required fields" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//*todas las recetas q nos trae el controller! (db y api)
const getAllRecipesHandler = async (req, res) => {
  //*Obtenemos el nombre por query
  const { title } = req.query;
  try {
    //*Obtenemos todas las recetas que nos trae el controller que combina las de API y BD
    const recipes = await getAllRecipes();

    if (title) {
      let filterRecipe = recipes.filter((x) =>
        x.title.toLowerCase().includes(title.toLowerCase())
      );

      filterRecipe.length
        ? res.status(200).json(filterRecipe)
        : res
            .status(400)
            .json({ msg: `There is no recipes with the name "${title}"` });
    } else {
      res.status(200).json(recipes);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getRecipeByIdHandler,
  getRecipeByNameHandler,
  postRecipeHandler,
  getAllRecipesHandler,
};
