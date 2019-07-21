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
    senderId: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'sender_id'
    },
    receiverId: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'receiver_id'
    },
    auctionId: {
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
    senderRead: {
      type: sequelize.INTEGER(4),
      allowNull: false,
      defaultValue: '0',
      field: 'sender_read'
    },
    receiverRead: {
      type: sequelize.INTEGER(4),
      allowNull: false,
      defaultValue: '0',
      field: 'receiver_read'
    }
  }, {
    tableName: 'messages',
    timestamps: false,
  });
