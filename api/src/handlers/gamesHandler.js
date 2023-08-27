
//Hara 2 cosas nos traera los games o Los games por Name
// a travez de /videogames/?name="Fortnite"
const getGamesHandler = (req, res)=>{//query
    const {name} = req.query;
    if(name) res.status(200).send(`Aqui esta el game ${name}`)
    res.json("Todos los games")
};




const getGamesByIdHandler = (req, res)=>{//params

    res.json("Games por Id")
};


const createGamesHandler = (req, res)=>{//body
    const {name, date} = req.body;
    res.status(200).json(`Game ${name} lanzado el ${date}`)
};

module.exports = {
    getGamesHandler,
    getGamesByIdHandler,
    createGamesHandler
}