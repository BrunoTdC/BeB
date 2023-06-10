const Sequelize = require("sequelize")

const connection = new Sequelize('beb','root','3015',{
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        dateStrings: true
      }
});

module.exports = connection