const { Router } = require("express");
const {
  getRecipeByIdHandler,
  getRecipeByNameHandler,
  postRecipeHandler,
  getAllRecipesHandler,
} = require("../handlers/recipeHandlers");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipeRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
recipeRouter.get("/:id", getRecipeByIdHandler),

// recipeRouter.get('/title?="..."', getRecipeByNameHandler),
  
recipeRouter.get("/", getAllRecipesHandler);

recipeRouter.post("/", postRecipeHandler);

module.exports = recipeRouter;
