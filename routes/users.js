const express = require('express')
const router = express.Router()
const db = require('../config/database')
const User = require('../models/users')
const sequelize = require('sequelize')

router.get('/', (req, res) =>{
    const queryString = "SELECT * FROM users"
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
    const queryString = "SELECT * FROM users WHERE id = " + req.params.id
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
              id: req.params.id
            }
          })
        .then(result => {
            // console.log(result)
            res.json(result)
        })
        .catch(err => console.log(err))
})

router.get('/username/:username', (req, res) =>{
    User.findAll({
            where:{
              username: req.params.username
            }
          })
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err))
})

router.post('/login/:username/:password', function(req, res) {

    User.findAll({
            where:{
              username: req.params.username
            }
          })
        .then(result => {
            if(result != undefined && result != [] && result[0] != undefined && result[0].password == req.params.password){
                res.send(result[0])
                //res.send('OK')
            }
            else{
                res.send('Not OK')
            }
        })
        .catch(err => console.log(err))
});

router.post('/register', (req, res) =>{
  console.log(req.body)
  User.create(req.body).then(user => {
    res.json(user)
    console.log(JSON.stringify(user))
  })
})

router.patch('/confirmUser/:id', function (req, res) {
  User.update(
    {is_confirmed: "1"},
    {where: {id: req.params.id} }
  )
  .then(result => {
    console.log(result)
    res.send(result)
  })
  .catch(err => console.log(err))
})

module.exports = router

