const sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('auctions', {
    id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    sellerId: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'seller_id'
    },
    itemId: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'items',
        key: 'id'
      },
      field: 'item_id'
    },
    highestBidId: {
      type: sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'bids',
        key: 'id'
      },
      field: 'highest_bid_id'
    },
    buyoutPrice: {
      type: "DOUBLE",
      allowNull: true,
      field: 'buyout_price'
    },
    startingBid: {
      type: "DOUBLE",
      allowNull: false,
      field: 'starting_bid'
    },
    bidCount: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'bid_count'
    },
    startTime: {
      type: sequelize.DATE,
      allowNull: false,
      field: 'start_time'
    },
    endTime: {
      type: sequelize.DATE,
      allowNull: false,
      field: 'end_time'
    },
    active: {
      type: sequelize.INTEGER(4),
      allowNull: false,
      defaultValue: '1',
      field: 'active'
    }
  }, {
    tableName: 'auctions',
    timestamps: false,
  });
