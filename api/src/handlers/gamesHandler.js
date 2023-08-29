//Se encargara de recibir la request, unificar datos
//Devolver la respuesta
//Invocar al controller, la cual es otra funcion con logica
//------------------------------------------------------------//
const { postGames } = require("../controllers/postGames");
const {getGamesById} = require("../controllers/getGamesById");
const {getAllGames} = require("../controllers/getAllGames");
const {getGamesByName} = require("../controllers/getGamesByName");
//getGamesHandler Hara 2 cosas nos traera todos los games o Los games por Name
// a travez de /videogames/?name=Fortnite
const getGamesHandler = async(req, res) => {//query
    const { name } = req.query;
    if (name) {
      try {
      const data = await getGamesByName(name);///videogames/?name=Fortnite
      res.send(data);
      } catch (error) {
        res.status(404).send(error);
      }
    } else {
      try {
        const data = await getAllGames();//videogames
        res.send(data);
      } catch (error) {
        res.status(500).send(error)
      }
    }
};



const getGamesByIdHandler = async(req, res) => {//params
    const {id} = req.params;
    try {
        res.send(await getGamesById(id))
    } catch (error) {
        res.status(400).send(error.message)
    }
    
};


const createGamesHandler = async (req, res) => {//body
    const { name, description, platforms, background_image, released, rating, genres } = req.body;

    try {
        const response = await postGames(name, description, platforms, background_image, released, rating, genres)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = {
    getGamesHandler,
    getGamesByIdHandler,
    createGamesHandler
}