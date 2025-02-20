const express =require("express")
const { userRegisterController, loginController, verifyUserController, verifyLoginController, ResturantloginController, resturantRegisterController } = require("../controller/authController")
const Router =express.Router()



Router.post("/register" , userRegisterController)
Router.post('/verify-register', verifyUserController)
Router.post('/verify-login', verifyLoginController)
Router.post("/login" , loginController)
Router.post("/resturant-login",ResturantloginController)
Router.post("/resturant-register",resturantRegisterController)


module.exports = Router