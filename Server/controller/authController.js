const  UserSchema  = require("../model/user")
const jwt = require("jsonwebtoken")
const {hashedPassword , comparePassword} = require("../passwordEncryption/passwordEncryption")
const { ResturantSchema } = require("../model/shopOwners")



const userRegisterController =async(req,res)=>{

   try {
        const { password ,email , securityCode} = req.body
        console.log(securityCode, email , password)
        if (  !email || !password || !securityCode){
             return res.status(400).json({
                success:false,
                message:"incomplete Credentials",
                 email,password,securityCode

            })
        }
        const emailExist = await UserSchema.findOne({email})
       
        if (emailExist){
                 return res.status(400).json({
                    success:false,
                    message:"Email Already Exist"
                })
        }
        const hashed = await hashedPassword(password)

        const user = new UserSchema({
            
                email,
                password:hashed,
                securityCode
        })
        await user.save()
        console.log(user)
        res.status(202).json({
                id:user._id
        })
        
    
   } catch (error) {
    console.log(error)
    res.status(400)

   }

}

const loginController = async(req,res)=>{
    try {
        const {email ,password} =req.body

        if(!email || !password){
            res.status(400).send({
                success:false,
                message:"incomplete Credentials"
            })
        }
        const userExist = await UserSchema.findOne({email})
        if (userExist){
            const samePassword = await comparePassword(password ,userExist.password)
         
            if (samePassword){

                const resturantExist = await ResturantSchema.findOne({user:userExist._id})
                if(resturantExist){
                    res.status(202).json({
                        id:userExist._id,
                        restaurantid:resturantExist._id,
                        restaurantName:resturantExist.restaurant_Name,
                        resturantEstimateTime:resturantExist.estimatedTime,
                        // resturantphoto:resturantExist.bannerPhoto64Image,
                        resturantCusine:resturantExist.cuisine
                    })
                }else{
                    res.status(202).json({
                        id:userExist._id
                    
                })
                }
                
            }else{
                res.status(400).send({
                    success:false,
                    message:"Invalid Credentials",
                    error
                })
            }
        }else{

         res.status(400).send({
            success:false,
            message:"Invalid Credentials",
            error
        })
    }
        
    } catch (error) {
        console.log("login Controller issue")
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

