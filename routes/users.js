const express = require('express')
const router = express.Router()
const db = require('../config/database')
const User = require('../models/user')
const sequelize = require('sequelize')

router.get('/', (req, res) =>{
    const queryString = "SELECT * FROM user"
    db.query(queryString, { type: sequelize.QueryTypes.SELECT,
                                     model: User,
                                     mapToModel: true })
        .then(result => {
            // console.log(result)
            res.json(result)
        })
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) =>{
    const queryString = "SELECT * FROM user WHERE iduser = " + req.params.id
    db.query(queryString, { type: sequelize.QueryTypes.SELECT,
                                     model: User,
                                     mapToModel: true })
        .then(result => {
            // console.log(result)
            res.json(result)
        })
        .catch(err => console.log(err))
})

router.get('/models/all', (req, res) =>{
    User.findAll()
        .then(result => { 
            // console.log(result)
            res.json(result)
        })
        .catch(err => console.log(err))
})

router.get('/models/:id', (req, res) =>{
    User.findAll({
            where: {
              iduser: req.params.id
            }
          })
        .then(result => { 
            // console.log(result)
            res.json(result)
        })
        .catch(err => console.log(err))
})

module.exports = router
