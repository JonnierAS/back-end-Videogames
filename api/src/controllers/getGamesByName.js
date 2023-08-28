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
    const apiGames = response.data;
    const customGames = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}`,
            },
        },
        include: Genres
    });
    if (!apiGames.results.length && !customGames.length) {
        throw {
            status: false,
            message: 'Not Found!'
        }
    }
    return [...customGames, ...apiGames.results].slice(0, 15)
};


module.exports = {
    getGamesByName
}