const express = require("express")
const { createProductController, get_All_Product, get_Product_Photo, OrderPlaced } = require("../controller/productController")
const Router = express.Router()



Router.post("/create-product" , createProductController)

Router.get('/get_all_product/:pid' , get_All_Product)

Router.get("/get_product_photo/:pid" , get_Product_Photo)

Router.post("/order-placed", OrderPlaced)



module.exports = Router