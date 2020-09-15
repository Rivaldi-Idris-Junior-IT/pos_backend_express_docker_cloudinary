const express = require('express')
// Import file Product.js di folder controller
const controller = require('../Controller/Product')
const validate = require('../Middleware/validate')
const chache = require('../Middleware/chache')
const upload = require("../Middleware/upload")
const Routes = express.Router()

// Import untuk produk
Routes.get("/",  chache, controller.all)
Routes.get("/search/:nama", controller.search)
Routes.post("/", upload.single("link_gambar"), validate, chache, controller.add)
Routes.put("/", validate, chache, controller.edit)
Routes.delete("/delete/:id", validate, chache, controller.delete)
Routes.get("/useJoin",controller.joinall)


// Export file Product.js
module.exports = Routes