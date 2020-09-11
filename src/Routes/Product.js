const express = require('express')
// Import file Product.js di folder controller
const controller = require('../Controller/Product')
const validate = require('../Middleware/validate')
const chache = require('../Middleware/chache')
const Routes = express.Router()

// Import untuk produk
Routes.get("/", validate, chache, controller.all)
Routes.get("/search/:nama", controller.search)
Routes.post("/", controller.add)
Routes.put("/", controller.edit)
Routes.delete("/delete/:id", controller.delete)
Routes.get("/useJoin",controller.joinall)


// Export file Product.js
module.exports = Routes