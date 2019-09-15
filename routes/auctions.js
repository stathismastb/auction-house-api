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

const bidderInfo = require('../dataset/bidders-categories.json')

Auction.belongsTo(Item, {foreignKey: 'item_id'})
Auction.belongsTo(User, {foreignKey: 'seller_id'})
Item.belongsToMany(Categories, {through: ItemCategories, foreignKey: 'item_id' })
Categories.belongsToMany(Item, {through: ItemCategories, foreignKey: 'category_id' })

Auction.belongsTo(Bid, {foreignKey: 'highest_bid_id'})
Bid.belongsTo(User, {foreignKey: 'bidder_id'})

const Op = sequelize.Op;
const operatorsAliases = {
  $like: Op.like,
  $between: Op.between,
}

var token = require('./token')

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
    where: {
      active: "1"
    },
    include: [
      {
        model: Item,
        include: [{model: Categories}]
      },
      {
        model: User
      },
      {
        model: Bid,
        include: [{model: User}]
      }
    ]
  })
  .then(auction => res.json(auction))
  .catch(console.error)
})

router.get('/loadAuction/:id', (req, res) =>{
  Auction.findAll({
    where:{
      id: req.params.id,
      active: "1"
    },
    include: [
      {
        model: Item,
        include: [{model: Categories}]
      },
      {
        model: User
      },
      {
        model: Bid,
        include: [{model: User}]
      }
    ]
  })
  .then(auction => res.json(auction))
  .catch(console.error)
})

router.patch('/newBid/:id/:highest_bid_id/:count', function (req, res) {
  Auction.update(
    {highest_bid_id: req.params.highest_bid_id,
    bid_count: req.params.count},
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

router.get('/MyAuctions', (req, res) =>{
  const authData = token.verify(req)
  if(authData == -1) res.sendStatus(403);
  else {
    Auction.findAll({
      where: {
        seller_id: authData.id
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
    .then(myAuction => res.json(myAuction))
    .catch(console.error)
  }
})

router.get('/MyAuctionBid', (req, res) =>{
  const authData = token.verify(req)
  if(authData == -1) res.sendStatus(403);
  else {
    Auction.findAll({
      where: {
        seller_id: authData.id
      },
      include: [
        {
          model: Item,
          include: [{model: Categories}]
        },
        {
          model: User
        },
        {
          model: Bid,
          include: [{model: User}]
        }
      ]
    })
    .then(auction => res.json(auction))
    .catch(console.error)
  }
})

router.patch('/updateStartingBid/:id/:amount', function (req, res) {
  Auction.update(
    {starting_bid: req.params.amount},
    {where: {id: req.params.id} }
  )
  .then(result => {
    console.log(result)
    res.send(result)
  })
  .catch(err => console.log(err))
})

function getRemainingTime(end_time) {
  var seconds = (new Date(end_time) - this.calcTime(6))/1000
  if(seconds < 0) 
    return false
  else
    return true
}

function bidCount(auction_id) {
  Auction.findAll({
    where: {id: auction_id} 
  })
      .then(result => { 
          console.log("RESULT " + result.bid_count )
          return result.bid_count + 1 
          //res.json(result)
      })
      .catch(err => console.log(err))
}

router.get('/searchAuctionViaCategory/:name', (req, res) =>{
  Auction.findAll({
    where: {
      active: "1"
    },
    include: [
      {
        model: Item,
        include: [
          {model: Categories,
          where: {
            name: { [Op.like]: '%'+req.params.name+'%'}
          }
          },
        ]
      },
      {
        model: User
      },
      {
        model: Bid,
        include: [{model: User}]
      }
    ]
  })
  .then(auction => res.json(auction))
  .catch(console.error)
})

router.get('/searchAuctionViaFreeText/:name', (req, res) =>{
  Auction.findAll({
    where: {
      active: "1"
    },
    include: [
      {
        model: Item,
        where: {
          name: { [Op.like]: '%'+req.params.name+'%'}
        },
        include: [
          {model: Categories}
        ]
      },
      {
        model: User
      },
      {
        model: Bid,
        include: [{model: User}]
      }
    ]
  })
  .then(auction => res.json(auction))
  .catch(console.error)
})

router.get('/searchAuctionViaPrice/:min/:max', (req, res) =>{
  Auction.findAll({
    where: {
      active: "1",
      starting_bid: {
        [Op.between]: [req.params.min, req.params.max ]
      }
    },
    include: [
      {
        model: Item,
        include: [
          {model: Categories}
        ]
      },
      {
        model: User
      },
      {
        model: Bid,
        include: [{model: User}]
      }
    ]
  })
  .then(auction => res.json(auction))
  .catch(console.error)
})

router.get('/searchAuctionViaCountry/:country', (req, res) =>{
  Auction.findAll({
    where: {
      active: "1"
    },
    include: [
      {
        model: Item,
        include: [
          {model: Categories}
        ]
      },
      {
        model: User,
        where: {
          country: { [Op.like]: '%'+req.params.country+'%'}
        }
      },
      {
        model: Bid,
        include: [{model: User}]
      }
    ]
  })
  .then(auction => res.json(auction))
  .catch(console.error)
})

router.get('/recommended', (req, res) =>{
  const authData = token.verify(req)
  if(authData == -1) res.sendStatus(403);
  else {
    var categories = getRecommendations(authData.username, 5)
    if (categories == "User not found")
      res.sendStatus(404)
    Auction.findAll({
      where: {
        active: "1"
      },
      include: [
        {
          model: Item,
          include: [
            {model: Categories,
            where: {
              // name: { [Op.like]: '%'+req.params.name+'%'}
              [Op.or]: [{name: categories[0].category}, {name: categories[1].category}, {name: categories[2].category}, {name: categories[3].category}, {name: categories[4].category}]
            }
            },
          ]
        },
        {
          model: User
        },
        {
          model: Bid,
          include: [{model: User}]
        }
      ]
    })
    .then(auction => res.json(auction))
    .catch(console.error)
    }
})

function getRecommendations(username, recommendations){
  var targetUsername = username
  var targetUser = bidderInfo.find((x) => { return x.username == targetUsername });
  
  if(targetUser == undefined){
    return "User not found"
  }
  
  var neighbors = []
  
  for(let i in bidderInfo){
    if(bidderInfo[i].username == targetUser.username) continue
  
    neighbors.push({ username: bidderInfo[i].username, count: 0 })
  
    for(let k in targetUser.categories){
      for(let l in bidderInfo[i].categories){
        if(targetUser.categories[k].category == bidderInfo[i].categories[l].category){
          neighbors[neighbors.length-1].count += targetUser.categories[k].count * bidderInfo[i].categories[l].count
        }
      }
    }
  }
  
  neighbors.sort((a,b) => (a.count < b.count) ? 1 : ((a.count > b.count) ? -1 : 0))
  
  nn = []
  for(let i in neighbors.slice(0,3)){
    for(let j in bidderInfo){
      if(neighbors[i].username == bidderInfo[j].username){
        nn.push(bidderInfo[j])
      }
    }
  }
  
  summedCategories = []
  exists = false
  for(let i in nn){
    for(let j in nn[i].categories){
      for(let k in summedCategories){
        if(summedCategories[k].category == nn[i].categories[j].category){
          summedCategories[k].count += nn[i].categories[j].count
          exists = true
          break
        }
      }
      if(exists == true){
        exists = false
      }
      else{
        summedCategories.push(nn[i].categories[j])
      }
    }
  }
  
  return summedCategories.slice(0,recommendations)
}

module.exports = router

