const Sequelize = require("sequelize");
const connection = require("../database/database")

const User = connection.define('user',{
    usuario:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

//User.sync({force:true})
module.exports = User