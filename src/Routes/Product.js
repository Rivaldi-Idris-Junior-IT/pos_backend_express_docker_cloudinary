const express = require('express')
// Import file Product.js di folder controller
const controller = require('../Controller/Product')
const Routes = express.Router()

// Import untuk produk
Routes.get("/", controller.all)
Routes.post("/", controller.add)
Routes.put("/", controller.edit)
Routes.delete("/", controller.delete)
Routes.get("/search/:nama", controller.search)

// Export file Product.js
module.exports = Routes