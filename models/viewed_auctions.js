const sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('viewedAuctions', {
    user_id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id'
    },
    auction_id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'auctions',
        key: 'id'
      },
      field: 'auction_id'
    },
    count: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      field: 'count'
    }
  }, {
    tableName: 'viewed_auctions',
    timestamps: false,
  });
