const sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('users', {
    id: {
      type: sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    email: {
      type: sequelize.STRING(45),
      allowNull: false,
      field: 'email'
    },
    username: {
      type: sequelize.STRING(45),
      allowNull: false,
      unique: true,
      field: 'username'
    },
    password: {
      type: sequelize.STRING(45),
      allowNull: false,
      field: 'password'
    },
    firstName: {
      type: sequelize.STRING(45),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: sequelize.STRING(45),
      allowNull: false,
      field: 'last_name'
    },
    rating: {
      type: sequelize.INTEGER(11),
      allowNull: true,
      field: 'rating'
    },
    city: {
      type: sequelize.STRING(45),
      allowNull: false,
      field: 'city'
    },
    country: {
      type: sequelize.STRING(45),
      allowNull: false,
      field: 'country'
    },
    telephone: {
      type: sequelize.STRING(45),
      allowNull: false,
      field: 'telephone'
    },
    afm: {
      type: sequelize.STRING(45),
      allowNull: false,
      field: 'afm'
    },
    isAdmin: {
      type: sequelize.INTEGER(4),
      allowNull: false,
      defaultValue: '0',
      field: 'is_admin'
    },
    isConfirmed: {
      type: sequelize.INTEGER(4),
      allowNull: false,
      defaultValue: '0',
      field: 'is_confirmed'
    }
  }, {
    tableName: 'users',
    timestamps: false,
  });
