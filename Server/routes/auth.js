const express =require("express")
const { userRegisterController, loginController, verifyUserController } = require("../controller/authController")
const Router =express.Router()



Router.post("/register" , userRegisterController)
Router.post('/verify-register', verifyUserController)
Router.post('/verify-login', verifyUserController)
Router.post("/login" , loginController)


module.exports = Router