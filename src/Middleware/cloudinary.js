const cloudinary = require("cloudinary").v2

const dotenv = require('dotenv')

dotenv.config()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME || 'cloudname',
    api_key: process.env.CLOUDINARY_API_KEY || 'key',
    api_secret:process.env.CLOUDINARY_API_SECRET || 'secret'
})

module.exports = cloudinary;
