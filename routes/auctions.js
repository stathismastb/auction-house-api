const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Auction = require('../models/auctions')
const sequelize = require('sequelize')

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

module.exports = router

