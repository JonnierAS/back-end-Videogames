require("dotenv").config()
const { API_KEY } = process.env;
const axios = require("axios");
const {Videogame, Genres} = require("../db.js");

const getGamesById = async(id)=>{
   const numericId = !isNaN(+id)
  if (numericId) {
    const fetchedGame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`, {
      headers: {
        "Accept-Encoding": "null",
      },    
    });
    return fetchedGame.data;
  }
  const detail = await Videogame.findOne({
    where: { id },
    include: Genres
  });
  if (!detail) throw { message: "Not Found!" };
  return detail;
};


module.exports = {
    getGamesById
}