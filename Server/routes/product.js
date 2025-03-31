const express = require("express")
const { createProductController, get_All_Product, get_Product_Photo, OrderPlaced, updatePhotoController, topPicks, updateOnOrder, userOrders, RatingOfAProduct } = require("../controller/productController")
const Router = express.Router()
const formidableMiddleware = require("express-formidable");

Router.post("/create-product" , formidableMiddleware(), createProductController)

Router.get('/get_all_product/:pid' , get_All_Product)

Router.get("/get_product_photo/:pid" , get_Product_Photo)

Router.put("/update-food/:pid", formidableMiddleware() ,updatePhotoController)

Router.get("/top-picks" , topPicks)

Router.post("/order-placed", OrderPlaced)

Router.get("/order-status/:oid", updateOnOrder)

Router.get("/get-UserOrder/:pid", userOrders)

Router.put('/rating/:pid', RatingOfAProduct)

// Router.delete("/delete-photo")







module.exports = Router