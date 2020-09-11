const model = require("../Model/Users")
const respone = require("../Helper/respon")
const bcr = require('bcrypt')
const jwt = require('jsonwebtoken')

class Auth {

    login  =  async (req, res) => {

        try {
        const passDB = await model.getByUsername(req.body.username)
        
        if(passDB.length <= 0) {
            respone(res, 200, "Username tidak terdaftar")
        }

        const passReq = req.body.password
        const check = await bcr.compare(passReq, passDB[0].password)

        if(check) {
            const result = await this.setToken(req.body.username)
            respone(res, 200, result)
        }else{
            respone(res, 200, "Gagal Login")
        }

        } catch (error) {
            respone(res, 500, error)
        }
    }

    setToken = async (user) => {
        try {
            const payload = {
                user : user,
                // role :"admin"
            }
    
            const token =  jwt.sign(payload, process.env.JWT_KEYS, {expiresIn: '50s'})
    
            const result = {
                token : token,
                msg : "Token created, login success"
            }
    
            return result 
        
        } catch (error) {
            throw error
        }

    }
}

module.exports = new Auth()