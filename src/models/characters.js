
const { STRING, VARCHAR } = require('mysql/lib/protocol/constants/types')
const { DataTypes } = require('sequelize')
const db = require('../db/db')

const characters = db.define("Characters", {
    id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
     
    },
  
    abilities: {
        type: DataTypes.STRING,
        allowNull: false,


    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,

    }

})
module.exports = characters


