const express = require('express')
const router = express.Router()
const db = require('../config/database')
const sequelize = require('sequelize')
const dirname = "./images/"
var fs = require("fs");
const multer = require("multer");

var upload = multer({ dest: "images/"});


// router.post('/uploadImage', upload.single('myFile'), (req, res, next) => {
//     const file = req.file
//     if (!file) {
//       const error = new Error('Please upload a file')
//       error.httpStatusCode = 400
//       return next(error)
//     }
//     fs.rename(file.path, './images/' + file.originalname, function(err) {
//         if ( err ) console.log('ERROR: ' + err);
//     });
//       res.send(file) 
// })

router.post('/uploadImage/:newName', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  fs.rename(file.path, './images/' + req.params.newName + '.png', function(err) {
      if ( err ) console.log('ERROR: ' + err);
  });
    res.send(file) 
})

router.post('/uploadImageRaw/:newName', (req, res) => {
  var fs = require('fs')
  fs.writeFile(
    './images/' + req.params.newName + '.json', 
    JSON.stringify(req.body.imageData),
    (err) => { if (err) console.log(err) }
  )

  res.send("OK")
  // res.send("OK")
})

router.get("/getImage/:name", (req, res) => {
    res.sendFile(req.params.name + '.png', { root: dirname })
})

router.get("/getImageRaw/:name", (req, res) => {
  res.sendFile(req.params.name + '.json', { root: dirname })
})



module.exports = router
