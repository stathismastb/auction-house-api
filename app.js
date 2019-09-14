const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())

// Log to console and .log files
const morgan = require('morgan')
const fs = require('fs')
app.use(morgan('dev'))
app.use(morgan('combined', {stream: fs.createWriteStream('./logs/access-combined.log', {flags: 'a'})}));
app.use(morgan('dev', {stream: fs.createWriteStream('./logs/access-dev.log', {flags: 'a'})}));

// Database
const db = require('./config/database')

// Test database connection
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.log("Error: " + err))

app.get('/', (req, res) =>{
    res.send("INDEX")
})

// User routes
app.use('/users', require('./routes/users'))

// Item routes
app.use('/items', require('./routes/items'))

// Auction routes
app.use('/auctions', require('./routes/auctions'))

// Categories routes
app.use('/categories', require('./routes/categories'))

// Item Categories routes
app.use('/item_categories', require('./routes/item_categories'))

// Bid Categories routes
app.use('/bids', require('./routes/bids'))

// Messages routes
app.use('/messages', require('./routes/messages'))

// testing about images
app.use('/images', require('./routes/images'))
// app.get("/getImage", (req, res) => {
//     res.sendFile(path.join(__dirname, "./images/earino19.png"));
//   });

const port = 28992
app.listen(port, console.log("Server started on port " + port))
