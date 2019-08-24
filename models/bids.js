const sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('bids', {
    id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    auction_id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'auctions',
        key: 'id'
      },
      field: 'auction_id'
    },
    bidder_id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'bidder_id'
    },
    time: {
      type: sequelize.DATE,
      allowNull: false,
      field: 'time'
    },
    amount: {
      type: "DOUBLE",
      allowNull: false,
      field: 'amount'
    }
  }, {
    tableName: 'bids',
    timestamps: false,
  });
