const {getGenres} = require("../controllers/getGenres")

const getGenresHandler = async(req, res)=>{
    try {
        res.send(await getGenres());
      } catch (error) {
        console.log(error)
        res.status(500).send(error)
      }
};


module.exports = {
    getGenresHandler
};