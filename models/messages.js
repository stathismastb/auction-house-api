const sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('messages', {
    id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    sender_id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'sender_id'
    },
    receiver_id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'receiver_id'
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
    message: {
      type: sequelize.STRING(512),
      allowNull: false,
      field: 'message'
    },
    sender_read: {
      type: sequelize.INTEGER(4),
      allowNull: false,
      defaultValue: '0',
      field: 'sender_read'
    },
    receiver_read: {
      type: sequelize.INTEGER(4),
      allowNull: false,
      defaultValue: '0',
      field: 'receiver_read'
    }
  }, {
    tableName: 'messages',
    timestamps: false,
  });
