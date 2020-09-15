const database = require('../Config/Databases')
const Product = {}

// Model Product
Product.GetAll = () => {
    return new Promise((resolve, reject) => {
        database.query("SELECT * FROM table_produk ORDER BY nama ASC")
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Product.searchName = (nama) => {
    return new Promise((resolve, reject) => {
        database
        .query(`SELECT * FROM table_produk WHERE nama LIKE '%${nama}%'`)
        .then( (res) => {
            resolve(res.rows)
        })
        .catch( (err) => {
            reject(err)
        })
    })
}

Product.JoinAll = () => {
    return new Promise((resolve, reject) => {
        database.query("SELECT * FROM public.table_produk JOIN table_kategori ON table_produk.kategori_id = table_kategori.id")
        .then((res) => {
            resolve(res.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Product.Add = (nama, harga, stok, kategori_id, link_gambar) => { 
    console.log(nama)
    return new Promise((resolve, reject) => {
        database
        .query(`INSERT INTO public.table_produk(nama, harga, stok, kategori_id, link_gambar) VALUES ('${nama}', '${(harga)}', '${stok}', '${kategori_id}', '${link_gambar}')`)        
        .then(() => {        
            resolve(Product.GetAll())
        })
        .catch((err) => {
            reject(err)
        })
    })      
}

Product.Edit = (id, nama, harga, stok,kategori_id,link_gambar) => { 
    return new Promise((resolve, reject) => {
        database
        .query(`UPDATE public.table_produk SET nama='${nama}',harga=${harga},stok=${stok}, kategori_id='${kategori_id}', link_gambar='${link_gambar}' WHERE id=${id}; `)
        .then((res) => {        
            resolve(Product.GetAll())
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Product.Delete = (id) => { 
    return new Promise((resolve, reject) => {
        database
        .query(`DELETE FROM public.table_produk WHERE id= ${id}; `)
        .then((res) => {        
            resolve(Product.GetAll())
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = Product