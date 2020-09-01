const model = require('../Model/Product')
const { request, response } = require('express')
// Membuat bungkusan dengan variabel
const Product = {}

Product.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        return res.send(data)
    }catch(error) {
        return res.send("errror")
    }
}

Product.search = async (request, response) => {
    try {
        const  nama = request.params.nama
        console.log(nama);
        const data = await model.searchName(nama)
        return response.send(data);
    }catch (error) {
        return response.status(500).json(error)
    }
}

Product.joinall = async (request,response) => {
    try {
        const data = await model.JoinAll()
        return response.send(data)
    } catch (error) {
        return response.send("error")
    }
}

Product.add = async (req, res) => {    
    try {
        const {nama, harga, stok} = req.body
        const data = await model.Add(nama, harga ,stok)        
        return res.status(200).send(data)      
    } catch (error) {
        return res.status(500).json(error)
    }         
}

Product.edit = async (req, res) => {
    try {
        const { id, nama, harga, stok,kategori_id} = req.body
        const data = await model.Edit(id, nama, harga, stok, kategori_id)
        return res.send(data)   
    } catch (error) {
        return res.status(500).json(error)
    }    
}

Product.delete = async (req, res) => {
    try {
        const {id} = req.body
        const data = await model.Delete(id)
        return res.send(data)    
    } catch (error) {
        return res.status(500).json(error)
    }
    
}


// Export file Product.js pada folder controller ke file di dalam folder yang membutuhkan
module.exports = Product