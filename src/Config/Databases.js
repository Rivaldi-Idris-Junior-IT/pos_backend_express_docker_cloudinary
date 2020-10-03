const Pool = require('pg-pool')

const mydb = new Pool({
    user : "rivaldi",
    database : "mainDB",
    password : "root",
    host : "localhost"
})

module.exports = mydb