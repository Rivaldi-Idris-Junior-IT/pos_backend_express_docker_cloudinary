const model = require('../Model/Users')
const { request } = require('express')
const respone = require("../Helper/respon")
const hashPassword = require ("../Helper/hash")
// Membuat bungkusan dengan variabel
const Users = {}

Users.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        return respone(res, 200, data)
    }catch(error) {
        return respone(res, 500, error)
    }
}

Users.getbyuser = async (req, res) => {    
    try {
        // const {username} = req.body        
        const result = await model.getByUsername(req.query.username)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error)
    }         
}

Users.add = async (req, res) => {    
    try {
        const passHash = await hashPassword(req.body.password)
        const data = {
            username : req.body.username,
            password : passHash,            
            token : req.body.token,
        }
        const result = await model.Add(data)
        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, error)
    }         
}

Users.edit = async (req, res) => {
    try {
        const { id, username,password,token} = req.body
        const data = await model.Edit(id, username,password,token)
        return res.send(data)   
    } catch (error) {
        return res.status(500).json(error)
    }    
}

Users.delete = async (req, res) => {
    try {
        const {id} = req.params
        const data = await model.Delete(id)
        return res.send(data)    
    } catch (error) {
        return res.status(500).json(error)
    }
    
}


module.exports = Users
