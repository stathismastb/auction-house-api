const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Item = require('../models/items')
const sequelize = require('sequelize')

router.get('/', (req, res) =>{
  Item.findAll()
      .then(result => { 
          // console.log(result)
          res.json(result)
      })
      .catch(err => console.log(err))
})
router.post('/newItem', (req, res) =>{
    console.log(req.body)
    Item.create(req.body).then(item => {
      res.json(item)
      console.log(JSON.stringify(item))
    })
})

module.exports = router

