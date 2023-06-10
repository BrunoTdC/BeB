const Sequelize = require("sequelize");
const connection = require("../database/database");
const Orcamentos = require("../orcamentos/Orcamentos");
const Category = require("../categories/Category");

const Orcamento = connection.define("orcamento_detalhes",{
    decricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valorunitario:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    valortotal:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
})
Orcamento.belongsTo(Category)
Orcamento.belongsTo(Orcamentos)
//Orcamento.sync({force:true})


module.exports = Orcamento;