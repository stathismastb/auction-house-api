const sequelize = require('sequelize')

module.exports = new sequelize('auction_house_db', 'root', 'enteryoupasswordhere',{
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
});
