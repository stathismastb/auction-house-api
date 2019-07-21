const sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('items', {
    id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: sequelize.STRING(45),
      allowNull: false,
      field: 'name'
    },
    description: {
      type: sequelize.STRING(512),
      allowNull: false,
      field: 'description'
    }
  }, {
    tableName: 'items',
    timestamps: false,
  });
