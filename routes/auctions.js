const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Auction = require('../models/auctions')
const Item = require('../models/items')
const ItemCategories = require('../models/item_categories')
const Categories = require('../models/categories')
const User = require('../models/users')
const Bid = require('../models/bids')
const sequelize = require('sequelize')

Auction.belongsTo(Item, {foreignKey: 'item_id'})
Auction.belongsTo(User, {foreignKey: 'seller_id'})
Item.belongsToMany(Categories, {through: ItemCategories, foreignKey: 'item_id' })
Categories.belongsToMany(Item, {through: ItemCategories, foreignKey: 'category_id' })

Auction.belongsTo(Bid, {foreignKey: 'highest_bid_id'})

router.get('/', (req, res) =>{
  Auction.findAll()
      .then(result => { 
          // console.log(result)
          res.json(result)
      })
      .catch(err => console.log(err))
})

function calcTime(offset) {
  d = new Date();
  utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000*offset));
}

router.post('/newAuction', (req, res) =>{
    console.log(req.body)
    req.body.start_time = calcTime('+6')
    Auction.create(req.body).then(auction => {
      res.json(auction)
      console.log(JSON.stringify(auction))
    })
})

router.get('/loadAuction', (req, res) =>{
  Auction.findAll({
    include: [
      {
        model: Item,
        include: [{model: Categories}]
      },
      {
        model: User
      }
    ]
  })
  .then(auction => res.json(auction))
  .catch(console.error)
})

router.get('/loadAuction/:id', (req, res) =>{
  Auction.findAll({
    where:{
      id: req.params.id
    },
    include: [
      {
        model: Item,
        include: [{model: Categories}]
      },
      {
        model: User
      }
    ]
  })
  .then(auction => res.json(auction))
  .catch(console.error)
})

router.patch('/newBid/:id/:highest_bid_id', function (req, res) {
  Auction.update(
    {highest_bid_id: req.params.highest_bid_id},
    {where: {id: req.params.id} }
  )
  .then(result => {
    console.log(result)
    res.send(result)
  })
  .catch(err => console.log(err))
})

router.patch('/disableAuction/:id', function (req, res) {
  Auction.update(
    {active: '0'},
    {where: {id: req.params.id} }
  )
  .then(result => {
    console.log(result)
    res.send(result)
  })
  .catch(err => console.log(err))
})

module.exports = router

