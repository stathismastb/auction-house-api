const express = require('express')
const router = express.Router()
const db = require('../config/database')
const ItemCategories = require('../models/item_categories')
const sequelize = require('sequelize')

router.get('/', (req, res) =>{
    ItemCategories.findAll()
      .then(result => { 
          // console.log(result)
          res.json(result)
      })
      .catch(err => console.log(err))
})

router.post('/itemCategories', (req, res) =>{
    console.log(req.body)
    ItemCategories.create(req.body).then(item_category => {
      res.json(item_category)
      console.log(JSON.stringify(item_category))
    })
})

module.exports = router