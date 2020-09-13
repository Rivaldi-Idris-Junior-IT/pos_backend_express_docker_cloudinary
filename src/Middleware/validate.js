const respone = require('../Helper/respon')
const jwt = require("jsonwebtoken")
const jwtDecode = require("jwt-decode")
const model = require("../Model/Users")
const { response } = require('express')

const checkToken = async (req, res, next) => {
    const {token} = req.headers;
    console.log(token)            

    const userDatabase = await model.searchToken(token)

    const gentokendatabase = jwtDecode(token)

    console.log(gentokendatabase.role)

    const tokenDatabase = userDatabase[0].token
    console.log(tokenDatabase)

    if (!token) {
        const result = {
            msg : "Login dulu"
        }
        return respone(res, 401, result)        
    }else if (token != tokenDatabase) {
        const result = {
            msg : "Tidak sama"
        }
        return respone(res, 401, result)
    }else if (token == undefined) {
        const result = {
            msg : "Tidak sama"
        }
        return respone(res, 401, result)
    }    

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
}

module.exports = checkToken