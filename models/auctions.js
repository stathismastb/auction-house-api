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
    seller_id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'seller_id'
    },
    item_id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'items',
        key: 'id'
      },
      field: 'item_id'
    },
    highest_bid_id: {
      type: sequelize.INTEGER(11),
      allowNull: true,
      references: {
        model: 'bids',
        key: 'id'
      },
      field: 'highest_bid_id'
    },
    buyout_price: {
      type: "DOUBLE",
      allowNull: true,
      field: 'buyout_price'
    },
    starting_bid: {
      type: "DOUBLE",
      allowNull: false,
      field: 'starting_bid'
    },
    bid_count: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'bid_count'
    },
    start_time: {
      type: sequelize.DATE,
      allowNull: false,
      field: 'start_time'
    },
    end_time: {
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
