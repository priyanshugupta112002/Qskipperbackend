const express = require("express")
const { createProductController, get_All_Product, get_Product_Photo } = require("../controller/productController")
const Router = express.Router()



Router.post("/create-product" , createProductController)

Router.get('/get_all_product' , get_All_Product)

Router.get("/get_product_photo/:pid" , get_Product_Photo)




module.exports = Router