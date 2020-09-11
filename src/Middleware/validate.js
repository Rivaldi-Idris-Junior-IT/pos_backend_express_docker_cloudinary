const respone = require('../Helper/respon')
const jwt = require("jsonwebtoken")
const jwtDecode = require("jwt-decode")

const checkToken = (req, res, next) => {
    const {token} = req.headers

    if (!token) {
        const result = {
            msg : "Login dulu"
        }
        return respone(res, 401, result)
    }

    // const jwtToken = jwtDecode(token)
    // const userRole = jwtToken.role
    // console.log(userRole)

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