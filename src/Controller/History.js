const model = require('../Model/History')
// Membuat bungkusan dengan variabel
const History = {}

History.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        return res.status(200).json(data)
    }catch(error) {
        return res.status(500).json(error)
    }
}

History.search = async (request, response) => {
    try {
        const  cashier = request.params.cashier
        console.log(cashier);
        const data = await model.searchCashier(cashier)
        return response.send(data);

    }catch (error) {
        return response.status(500).json(error)
    }
}

History.add = (req, res) => {    
    const {invoices,cashier,date,orders,amount} = req.body
    const data = model.Add(invoices,cashier,date,orders,amount)        
    return res.status(200).send(data)    
}

History.edit = async (req, res) => {
    try {
        const { id, invoices, cashier, date, orders, amount} = req.body
        const data = await model.Edit(id, invoices, cashier, date, orders, amount)
        return res.status(200).send(data)        
    } catch (error) {
        return response.status(500).json(error)
    }
    
}

History.delete = async (req, res) => {
    try {
        const { id} = req.body
        const data = await model.Delete(id)
        return res.send(data)    
    } catch (error) {
        return response.status(500).json(error)
    }
    
}

module.exports = History