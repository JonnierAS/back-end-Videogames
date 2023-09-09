require("dotenv").config();
const axios = require("axios");
const { Videogame, Genres } = require("../db.js");
const { API_KEY } = process.env;

const getAllGames = async () => {
    const customGames = await Videogame.findAll({
        attributes: ["name", "description", "platforms", "background_image", "released", "rating", "id", "created"],
        include: Genres
    });

    let apiGames = [];
    let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
    // gets the first 60 results, default page-size = 15 results
    let i = 0;
    while (i < 6) {
        const response = await axios.get(apiUrl);
/* 
        {
            headers: {
                "Accept-Encoding": "null",// para desabilitar la codificacion automatica
            },
        } */
        const { data } = response;
        let games = data.results;

        games = games.map(game => ({//devuelve un nuevo objeto con las propiedades que necesito
            id: game.id,
            name: game.name,
            description: game.description,
            platforms: game.platforms,
            background_image: game.background_image,
            released: game.released,
            rating: game.rating,
            genres: game.genres
        }))

        apiGames = apiGames.concat(games);
        apiUrl = data.next;//url de la siguiente página de resultados de la API
        i++;
    }

    return customGames.concat(apiGames)

};


module.exports = {
    getAllGames
}