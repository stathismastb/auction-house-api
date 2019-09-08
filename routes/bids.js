const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Bid = require('../models/bids')
const User = require('../models/users')
const sequelize = require('sequelize')

// Bid.belongsTo(User, {foreignKey: 'bidder_id'})

router.get('/models/all', (req, res) =>{
    Bid.findAll()
        .then(result => { 
            // console.log(result)
            res.json(result)
        })
        .catch(err => console.log(err))
})

router.get('/models/:id', (req, res) =>{
    Bid.findAll({
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

// router.post('/login/:username/:password', function(req, res) {

//     User.findAll({
//             where:{
//               username: req.params.username
//             }
//           })
//         .then(result => {
//             if(result != undefined && result != [] && result[0] != undefined && result[0].password == req.params.password){
//                 res.send(result[0])
//                 //res.send('OK')
//             }
//             else{
//                 res.send('Not OK')
//             }
//         })
//         .catch(err => console.log(err))
// });

function calcTime(offset) {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000*offset));
}

router.post('/newBid', (req, res) =>{
  console.log(req.body)
//   req.body.time = calcTime('+6')
Bid.create(req.body).then(bid => {
    res.json(bid)
    console.log(JSON.stringify(bid))
  })
})

// router.patch('/confirmUser/:id', function (req, res) {
//   User.update(
//     {is_confirmed: "1"},
//     {where: {id: req.params.id} }
//   )
//   .then(result => {
//     console.log(result)
//     res.send(result)
//   })
//   .catch(err => console.log(err))
// })

// router.get('/HighestBid', (req, res) =>{
//   Bid.findAll({
//           where: {
//             id: req.params.id
//           },
//           include: [
//             {
//               model: User
//             }
//           ]
//         })
//       .then(result => {
//           res.json(result)
//       })
//       .catch(err => console.log(err))
// })

module.exports = router
