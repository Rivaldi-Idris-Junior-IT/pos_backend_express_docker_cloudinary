// Memanggil express
const express = require('express')
const server = express()
// Import package body-parser
const bodyParser = require('body-parser')
// Import package morgan 
const morgan = require('morgan')
// Import file main.js di folder src
const routes = require ('./src/main')
// Import file Databases.js
const database = require('./src/Config/Databases')
// Menajalankan menggunakan port
const port = 4500
const cors = require('cors')

server.use(cors())

server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.use(morgan("dev"))
server.use('/backend',routes)
server.use("/public", express.static("public"))

database
    .connect()
    .then(result => {
        console.log("Database connected")
    })
    .catch(err => {
        console.log("Database not Connected")
    })

server.listen(port, () => {
    console.log(`Service running on port ${port}`)
})

// Membuat method get 
// server.get("/", (req, res) => {
//     res.send("hellow world")
// })

// Megkustom dalam endpoint
// server.get('/sayMyName', (req, res) =>{
//     const nama = req.query.name
//     res.send(`namamu ${nama}`)
// })

// Menggunakan property params
// server.get("/howold/:umur", (req, res) => {
//     const umur = req.params.umur
//     if( umur > 18){
//         res.send("anda sudah dewasa")
//     }else{
//         res.send("anda masih bocah")
//     }
// })