const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

 //  const id = 5000;
  sequelize.define('pokemon', {
    id: {
      primaryKey: true, // que se clave primaria
      type: DataTypes.UUID, // Documentacion en docs.
      defaultValue: DataTypes.UUIDV4, // Documentacion en docs.
      allowNull: false, // que no sea nulo
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    live:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    attack:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    defense:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    velocidad:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    altura:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    peso:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 100,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
  { timestamps: false}
  );
};
