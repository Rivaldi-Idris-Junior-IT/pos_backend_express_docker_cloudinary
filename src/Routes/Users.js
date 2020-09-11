const express = require('express')
// Import file Product.js di folder controller
const controller = require('../Controller/Users')
const Routes = express.Router()

// Import untuk Users
Routes.get("/", controller.all)
Routes.post("/", controller.add)
Routes.get("/get",controller.getbyuser)
Routes.put("/", controller.edit)
Routes.delete("/delete/:id", controller.delete)

module.exports = Routes