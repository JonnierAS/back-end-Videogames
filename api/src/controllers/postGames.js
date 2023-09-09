const { Videogame } = require("../db.js");
const { getGenres } = require("../controllers/getGenres.js")

const postGames = async (name, description, platforms, background_image, released, rating, genres) => {
    
    if (!name || !description || !platforms) {
        throw {
            status: false,
            message: 'Missing required information.'
        }
    }

    const gameAlreadyExist = await Videogame.findOne({
        where: { name }
    })
    if (gameAlreadyExist) {
        throw {
            status: false,
            message: 'The game already exist! Choose another name.'
        }
    }
    const newGame = await Videogame.create({
        name, description, released, rating, platforms, background_image
    })
    const allGenres = await getGenres();
    
    const filteredGenres = genres.map(genre => (
        allGenres.find(g => g.name === genre)
        ))
        // console.log(filteredGenres);
    newGame.addGenres(filteredGenres)
    return {
        status: 'done',
        message: "New game added successfully!",
        game: newGame
    }
    
};


module.exports = {
    postGames
}