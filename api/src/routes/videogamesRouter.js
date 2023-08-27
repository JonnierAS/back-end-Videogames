const {Router}= require("express");
const videoGamesRouter = Router();
const {
    getGamesHandler, 
    getGamesByIdHandler, 
    createGamesHandler
} = require("../handlers/gamesHandler");


videoGamesRouter.get("/", getGamesHandler);


videoGamesRouter.get("/:id", getGamesByIdHandler);


videoGamesRouter.post("/",createGamesHandler);

module.exports = videoGamesRouter;
