const express = require("express")
const { registerResturantComtroller , get_All_resturant, get_Retrurant_Photo, resturantOrders, orderCompleted } = require("../controller/resturantController")
const Router = express.Router()
const formidableMiddleware = require("express-formidable");


Router.post("/register-restaurant" , formidableMiddleware(), registerResturantComtroller)


Router.get("/get_All_Restaurant" , get_All_resturant)

Router.get("/get_Restaurant_photo/:pid" , get_Retrurant_Photo)

Router.get("/get-order/:pid" , resturantOrders)

Router.put("/order-complete/:oid" , orderCompleted)

module.exports = Router
