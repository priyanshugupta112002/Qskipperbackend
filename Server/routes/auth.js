const express =require("express")
const { userRegisterController, loginController } = require("../controller/authController")
const Router =express.Router()



Router.post("/register" , userRegisterController)
Router.post("/login" , loginController)


module.exports = Router