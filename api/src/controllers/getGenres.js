require('dotenv').config();
const axios = require("axios");
const { Genres } = require("../db.js");

const { API_KEY } = process.env;

const getGenres = async () => {
    const storedGenres = await Genres.findAll()
    if (storedGenres.length) {
        return storedGenres
    }
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`, {
        headers: {
            "Accept-Encoding": "null",
        },
    })
    const { results } = response.data
    const genres = results.map(genre => ({
        id: genre.id,
        name: genre.name
    }))
    return await Genres.bulkCreate(genres)
};


module.exports = {
    getGenres
}