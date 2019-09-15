const express = require('express')
const router = express.Router()
const db = require('../config/database')
const User = require('../models/users')
const Message = require('../models/messages')
const sequelize = require('sequelize')

const bidderInfo = require('../dataset/bidders-categories.json')

var token = require('./token')

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

router.get('/details', (req, res) =>{
  console.log("RUNNING DETAILS")
  const authData = token.verify(req)
  if(authData == -1) res.sendStatus(403);
  else {
    console.log(authData)
    console.log(authData.username)
    User.findAll({
          where:{
            username: authData.username
          }
        })
      .then(result => {
          if(result != undefined && result != [] && result[0] != undefined){
            result[0].password = ""
            res.json(result[0])
          }
          else{
            res.sendStatus(500);
          }
      })
      .catch(err => console.log(err))
  }
})

router.post('/login/:username/:password', function(req, res) {

    User.findAll({
            where:{
              username: req.params.username
            }
          })
        .then(result => {
            if(result != undefined && result != [] && result[0] != undefined && result[0].password == req.params.password){
              result[0].password = ""
              token.send(result[0], res)
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

router.get('/api/home', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

router.post('/api/posts', (req, res) => {
  const authData = token.verify(req)
  if(authData == -1) res.sendStatus(403);
  else {
    res.json(authData);
  }
});

router.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com'
  }

  token.send(user, res)
});

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

router.get('/inbox', (req, res) =>{
  const authData = token.verify(req)
  if(authData == -1) res.sendStatus(403);
  else {
    var user_id = authData.id
    Message.findAll({
      where: {
        receiver_id: user_id
      }
    })
    .then(messages => res.json(messages))
    .catch(console.error)
  }
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

module.exports = router

