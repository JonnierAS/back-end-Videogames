const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,//combinacion de numeros,letras y guiones/Alfanumerico
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4//se ocupara de crear esa combinacion aleatoria
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    background_image: {
      type: DataTypes.STRING,
    },
    released: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.FLOAT
    },
    created:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: false,
  });
};
