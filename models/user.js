const sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('user', {
    iduser: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: sequelize.STRING(45),
      allowNull: false
    },
    password: {
      type: sequelize.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'user',
    timestamps: false,
  });
