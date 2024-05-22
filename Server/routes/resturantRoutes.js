const express = require("express")
const { registerResturantComtroller , get_All_resturant, get_Retrurant_Photo } = require("../controller/resturantController")
const formidableMiddleware = require('express-formidable');
const Router = express.Router()


Router.post("/register-resturant" ,formidableMiddleware(),  registerResturantComtroller)


Router.get("/get_All_Resturant" , get_All_resturant)

Router.get("/get_retrurant_Photo/:pid" , get_Retrurant_Photo)


module.exports = Router