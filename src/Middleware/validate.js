const respone = require('../Helper/respon')
const jwt = require("jsonwebtoken")
const jwtDecode = require("jwt-decode")
const model = require("../Model/Users")
const { response } = require('express')

const checkToken = async (req, res, next) => {
    try {
        const {token} = req.headers;

        if (token === undefined) {
            const result = {
                msg : "Login dulu"
            }
            return respone(res, 401, result)   
        }     
    
        const userDatabase = await model.searchToken(token)

        if (userDatabase === undefined || token != userDatabase[0].token) {
            const result = {
                msg : "Invalid token"
            }
            return respone(res, 401, result)   
        }

    
        const gentokendatabase = jwtDecode(token)
    
        console.log(gentokendatabase.role)
    
        const tokenDatabase = userDatabase[0].token
    
        const jwtToken = jwtDecode(token)
        const userRole = jwtToken.role    
    
        if (userRole != "admin"){
            const result = {
                msg : "Batas akses anda hanya sebagai user"
            }
            return respone(res, 401, result)
        }
    
        // const jwtToken = jwtDecode(token)
        jwt.verify(token, process.env.JWT_KEYS, (err, deocde) => {
            if (err) {
                // const result = {
                //     msg : "Login dulu"
                // }
                return respone(res, 401, err)
            } //else {
                next()
            //}
        })

    } catch (error) {
        console.log(error)
        return respone(res, 500, error)
    }
}

module.exports = checkToken