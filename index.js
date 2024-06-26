const router = require('./Routes/router')

const appMiddleware = require('./Middlewares/appMiddleware')

// 1) import dotenv
require('dotenv').config()

// 2) import express
const express = require("express")

// import connection.js

require('./DB/connections')

// 3) import cors
const cors = require('cors')

// 4) create server
const learnitServer = express();

// 5) make use of cors by server
learnitServer.use(cors())

// 6) use a middleware, to convert json to javascript object
learnitServer.use(express.json());
// learnitServer.use(appMiddleware)
learnitServer.use(router)

// learnitserver should expose the path uploads
learnitServer.use('/uploads',express.static('./uploads'))

// 7) define port
const PORT = 4000;

// 8) run the server
learnitServer.listen(PORT, () => {
    console.log(`Server is running successfully at port : ${PORT}`)
})

learnitServer.get('/', (req, res) => {
    res.send("learnit server is running successfully")
})