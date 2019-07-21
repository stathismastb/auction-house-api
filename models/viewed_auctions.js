const sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('viewedAuctions', {
    userId: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id'
    },
    auctionId: {
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
