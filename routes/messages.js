const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Message = require('../models/messages')
const Auction = require('../models/auctions')
const Item = require('../models/items')
const UserS = require('../models/users')
const UserR = require('../models/users')
const sequelize = require('sequelize')

var token = require('./token')

Message.belongsTo(Auction, {foreignKey: 'auction_id'})
Auction.belongsTo(Item, {foreignKey: 'item_id'})
// Message.belongsTo(UserS, {foreignKey: 'sender_id'})
// Message.belongsTo(UserR, {foreignKey: 'receiver_id'})

router.get('/all', (req, res) =>{
    Message.findAll({
    })
        .then(messages => res.json(messages))
        .catch(err => console.log(err))
})

router.get('/inbox', (req, res) =>{
  const authData = token.verify(req)
  Message.belongsTo(UserS, {foreignKey: 'sender_id'})
  if(authData == -1) res.sendStatus(403);
  else {
    var user_id = authData.id
    Message.findAll({
      where: {
        receiver_id: user_id
      },
      include: [
        {
          model: Auction,
          include: [{model: Item}],
        },
        {
            model: UserS,
            // where: {
            //     id: Message.sender_id
            // }
        }
      ]
    })
    .then(messages => res.json(messages))
    .catch(console.error)
  }
})

router.get('/outbox', (req, res) =>{
    const authData = token.verify(req)
    Message.belongsTo(UserR, {foreignKey: 'receiver_id'})
    if(authData == -1) res.sendStatus(403);
    else {
      var user_id = authData.id
      Message.findAll({
        where: {
          sender_id: user_id
        },
        include: [
          {
            model: Auction,
            include: [{model: Item}]
          },
          {
            model: UserR
          }
        ]
      })
      .then(messages => res.json(messages))
      .catch(console.error)
    }
  })

router.post('/sendMessage', (req, res) =>{
    const authData = token.verify(req)
    if(authData == -1) res.sendStatus(403);
    else {
        //
        req.body.sender_id = authData.id
        // req.body.receiver_id = 3
        // req.body.auction_id = 35
        // req.body.message = 'This is a message from Onouf to Pacino'
        //
        console.log(req.body)
        Message.create(req.body).then(messages => {
            res.json(messages)
            console.log(JSON.stringify(messages))
        })
    }
  })

  router.patch('/messageRead/:id', function (req, res) {
    Message.update(
      {receiver_read: '1'},
      {where: {id: req.params.id} }
    )
    .then(result => {
      console.log(result)
      res.send(result)
    })
    .catch(err => console.log(err))
  })

  router.post('/deleteMessage/:id', function (req, res) {
    Message.destroy({
      where: {
        id: req.params.id
      } 
    })
    .then(status => {
      if(status)
        res.sendStatus(200)
      else  
        res.sendStatus(404)
    })
    .catch(err => console.log(err))
  })


module.exports = router

