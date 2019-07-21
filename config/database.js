const sequelize = require('sequelize')

module.exports = new sequelize('auction_house_db', 'ted', 'ted', {
    host: '83.212.109.75',
    port: '3306',
    dialect: 'mysql',
});
