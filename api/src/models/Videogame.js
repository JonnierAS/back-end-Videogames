const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true }
    },
    platform: {
      type: DataTypes.ENUM(["PlayStation", "Xbox"]),
      allowNull: false,
      validate: { notEmpty: true },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    release_date: {
      type: DataTypes.DATEONLY(),
      allowNull: false,
      validate: { notEmpty: true },
    },
    ratings: {
      type: DataTypes.DECIMAL({ precision: 10, scale: 2 }),
      allowNull: false,
      validate: { notEmpty: true },
    }
  });
};
