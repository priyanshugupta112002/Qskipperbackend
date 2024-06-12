const express = require("express")
const { createProductController, get_All_Product, get_Product_Photo, OrderPlaced, updatePhotoController, topPicks } = require("../controller/productController")
const Router = express.Router()
const formidableMiddleware = require("express-formidable");
const { resturantOrders } = require("../controller/resturantController");


Router.post("/create-product" , formidableMiddleware(), createProductController)

Router.get('/get_all_product/:pid' , get_All_Product)

Router.get("/get_product_photo/:pid" , get_Product_Photo)


Router.put("/update-food/:pid", formidableMiddleware() ,updatePhotoController)

Router.get("/top-picks" , topPicks)


Router.get("/get-order/:pid" , resturantOrders)

Router.delete("/delete-photo")


Router.post("/order-placed", OrderPlaced)





module.exports = Router