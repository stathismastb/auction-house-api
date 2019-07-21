const sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('itemCategories', {
    itemId: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'items',
        key: 'id'
      },
      field: 'item_id'
    },
    categoryId: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'categories',
        key: 'id'
      },
      field: 'category_id'
    }
  }, {
    tableName: 'item_categories',
    timestamps: false,
  });
