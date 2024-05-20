const express = require("express")
const { createProductController } = require("../controller/productController")
const Router = express.Router()
const formidableMiddleware = require('express-formidable');


Router.post("/create-product" ,formidableMiddleware(), createProductController)

module.exports = Router