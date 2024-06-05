const express = require("express")
const { createProductController, get_All_Product, get_Product_Photo, OrderPlaced } = require("../controller/productController")
const Router = express.Router()
const formidableMiddleware = require("express-formidable");


Router.post("/create-product" , formidableMiddleware(), createProductController)

Router.get('/get_all_product/:pid' , get_All_Product)

Router.get("/get_product_photo/:pid" , get_Product_Photo)


Router.put("/update-photo")
Router.delete("/delete-photo")


Router.post("/order-placed", OrderPlaced)



module.exports = Router