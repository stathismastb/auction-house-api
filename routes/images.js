const express = require('express')
const router = express.Router()
const db = require('../config/database')
const sequelize = require('sequelize')
const dirname = "./images/"
var fs = require("fs");
const multer = require("multer");

var upload = multer({ dest: "images/"});


router.post('/uploadImage', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    fs.rename(file.path, './images/' + file.originalname, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    // var nfile = dirname + req.file.filename;
    // fs.rename(req.file.path, nfile, function(err) {
    //     if (err) {
    //     console.log(err);
    //     res.send(500);
    //     } else {
    //         res.json({
    //             message: 'File uploaded successfully',
    //             filename: req.file.filename
    //         });
    //     }
    // });
      res.send(file)
    
  })

router.get("/getImage/:name", (req, res) => {
    res.sendFile(req.params.name, { root: dirname })
})



module.exports = router