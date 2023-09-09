require("dotenv").config()
const { API_KEY } = process.env;
const axios = require("axios");
const {Videogame, Genres} = require("../db.js");

const getGamesById = async(id)=>{
   const numericId = !isNaN(+id)//verificamos si es number o no
  if (numericId) {//si es verdadero hace la peticion
    const fetchedGame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`, {
      headers: {
        "Accept-Encoding": "null",// para desabilitar la codificacion automatica
      },    
    });
    const fetchedGameArray = [fetchedGame.data];//guardo el juego obtenido en la variable
    const modifiedGame = fetchedGameArray.map(game => ({//devuelve un nuevo objeto con las props indicadas
      id:game.id,
      name: game.name,
      description: game.description,
      platforms: game.platforms,
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres
  }))
  
  return modifiedGame;
  }

  //si numericId es false buscara el id en la base de datos en formato "e118a594-303c-401e-b965-0fd490f55203"
  const detail = await Videogame.findOne({
    where: { id },
    include: Genres //debe incluir los generos asociados en la consulta
  });
  if (!detail) throw { message: "Not Found!" };
  return [detail];
};


module.exports = {
    getGamesById
}