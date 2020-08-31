const express = require('express')
// Import File Product.js pada folder Routes
const product = require('./Routes/Product')
const category = require('./Routes/Category')
const history = require('./Routes/history')
const Routes = express.Router()

// Tampung hasil import file Product.js pada folder Routes
Routes.use("/product",product)

// Tampung hasil import file Category.js pada folder Routes
Routes.use("/category", category)

// Tampung hasil import file History.js pada folder Routes
Routes.use("/history", history)

// Export file Main.js
module.exports = Routes