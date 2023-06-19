const { Router } = require("express");
const {getDietHandler} = require("../handlers/dietHandler")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dietRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
dietRouter.get("/", getDietHandler);

module.exports = dietRouter;
