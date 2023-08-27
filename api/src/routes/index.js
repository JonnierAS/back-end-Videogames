const router = require("express").Router();
const {getGames} = require("../controllers/getGames");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getGames);
router.get("/videogames/:id");

router.get("/videogames/name?=");

router.post("/videogames");
router.get("/genres");

module.exports = router;
