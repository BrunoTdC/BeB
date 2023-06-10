const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category")

const Orcamentos = connection.define('orcamentos',{
    codigo:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    empresa:{
        type: Sequelize.STRING,
        allowNull: false
    },
    contato:{
        type: Sequelize.STRING,
        allowNull: false
    }
})
Orcamentos.belongsTo(Category)
//Orcamentos.sync({force:true})
module.exports = Orcamentos;