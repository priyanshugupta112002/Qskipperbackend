const express =require("express")
const { UserSchema } = require("../model/user")
const { compare } = require("bcrypt")
const jwt = requie("jsonwebtoken")

const userRegisterController =async(req,res)=>{

   try {
    const { name ,email ,password ,phoneNumber} = req.body

    if (!name || !email || !password || !phoneNumber){
        res.status(400).send({
            success:false,
            message:"incomplete Credentials"
        })
        const emailExist = await UserSchema.findOne({email})
        if (emailExist){
            res.status(400).send({
                success:false,
                message:"Email Already Exist"
            })
        }
        const hashedPassword = await becyrptPassord({password})
        const user = new UserSchema({
            fullName:name,
            email,
            password:hashedPassword,
            phoneNumber
        })
        res.status(202).json({
            success:true,
            user,
            message:"user has been created"
        })
    }
    
   } catch (error) {
    console.log(error)
   }

}

const loginController = async(req,res)=>{
    try {
        const [email ,password]=req.body

        if(!email || !password){
            res.status(400).send({
                success:false,
                message:"incomplete Credentials"
            })
        }
        const user = await UserSchema.find({email})
        if (user){
            const samePassword = compare(password ,user.password)
            if (samePassword){
                const token = await jwt({_id  : user._id} , process.env.secret_key ,{
                    exprires: "7d"
                })
    
                return res.status(202).json({
                    user:{
                        id:user._id,
                        fullName:user.fullName,
                        email:user.email,
                        password:user.password,
                        phoneNumber:phoneNumber
                    },token,
                    success:true,
                    message:"user have been login"
                })
            }
        }
        return res.status(400).send({
            success:false,
            message:"Invalid Credentials",
            error
        })
        
    } catch (error) {
        console.log("login c(ontroller issue")
        res.status(400).send({
            success:false,
            message:" Error in login credentials"
        })
    }
}

const forgotPassword =(req,re )=> {
     try {
        
        
     } catch (error) {
        
     }
}


module.exports ={userRegisterController , loginController}

