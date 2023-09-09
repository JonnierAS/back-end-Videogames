require("dotenv").config();
const axios = require("axios")
const { Op } = require("sequelize");
const { Videogame, Genres } = require("../db.js");
const { API_KEY } = process.env;

const getGamesByName = async (name) => {
    const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`, {
        headers: {
            "Accept-Encoding": "null",
        },
    });
    const { data } = response;
    const apiGames = data.results;
    const modifiedApiGames = apiGames.map(game => ({ 
        id: game.id,
        name: game.name,
        description: game.description,
        platforms: game.platforms,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        genres: game.genres
    }))
    const customGames = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}`,//busca el nombre sin importar mayus o minus
            },
        },
        include: Genres
        
    });
    if (!apiGames.length && !customGames.length) {
        throw {
            status: false,
            message: 'Not Found!'
        }
    }
    return [...customGames, ...modifiedApiGames].slice(0, 15)
};


module.exports = {
    getGamesByName
}