
const { DataTypes } = require('sequelize')
const db = require('../db/db')

 movies = db.define("Movies", {
    id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true,
    },
    name: {
        type: DataTypes.STRING,
        allownull: false,
        unique:true,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,

    },
    releaseDate:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    actors: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    }

})
module.exports=movies


