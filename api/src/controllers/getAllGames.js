require("dotenv").config();
const axios = require("axios");
const { Videogame, Genres } = require("../db.js");
const { API_KEY } = process.env;

const getAllGames = async () => {
    const customGames = await Videogame.findAll({
        include: Genres
    });

    let apiGames = [];
    let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
    // gets the first 100 results, default page-size = 20 results
    let i = 0;
    while (i < 5) {
        const response = await axios.get(apiUrl, {
            headers: {
                "Accept-Encoding": "null",
            },
        });
        const { data } = response;
        apiGames = apiGames.concat(data.results)
        apiUrl = data.next;
        i++;
    }
    //-----------------------------------------------------------

    return apiGames.concat(customGames)

};


module.exports = {
    getAllGames
}