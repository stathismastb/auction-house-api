const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Category = require('../models/categories')
const sequelize = require('sequelize')

router.get('/', (req, res) =>{
    Category.findAll()
      .then(result => { 
          // console.log(result)
          res.json(result)
      })
      .catch(err => console.log(err))
})

router.get('/all', (req, res) =>{
    Category.findAll()
      .then(result => { 
          res.json(result)
      })
      .catch(err => console.log(err))
})

router.get('/createFromJson', (req, res) =>{
    const categories = require('../dataset/categories.json')

    for(let i in categories){
        Category.create({ name: categories[i] }).then(category => {
            res.json(category)
        })
    }
})

module.exports = router
