const Pool = require('pg-pool')

const mydb = new Pool({
    user : "latihan_1",
    database : "Latihan_pointofsale",
    password : "aldi67890",
    host : "localhost"
})

module.exports = mydb