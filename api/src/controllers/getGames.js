const {Videogame} = require("../db.js");

const getGames = (req, res)=>{

    res.json("Todos los games")
};


module.exports = {
    getGames
}