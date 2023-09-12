const router = require("express").Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genresRouter = require("./genresRouter");
const  {videoGamesRouter} = require("./videoGamesRouter")


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videoGamesRouter);
router.use("/genres", genresRouter);

module.exports = router;
