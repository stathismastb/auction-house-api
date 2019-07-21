const sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('auction', {
    idauction: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: sequelize.STRING(45),
      allowNull: true
    },
    user_iduser: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'iduser'
      }
    }
  }, {
    tableName: 'auction',
    timestamps: false,
  });
