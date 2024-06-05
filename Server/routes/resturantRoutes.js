const express = require("express")
const { registerResturantComtroller , get_All_resturant, get_Retrurant_Photo } = require("../controller/resturantController")
const Router = express.Router()
const formidableMiddleware = require("express-formidable");


Router.post("/register-restaurant" , formidableMiddleware(), registerResturantComtroller)


Router.get("/get_All_Restaurant" , get_All_resturant)

Router.get("/get_restaurant_photo/:pid" , get_Retrurant_Photo)


module.exports = Router