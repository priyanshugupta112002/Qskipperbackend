const  UserSchema  = require("../model/user")
const jwt = require("jsonwebtoken")
const {hashedPassword , comparePassword} = require("../passwordEncryption/passwordEncryption")
const { ResturantSchema } = require("../model/shopOwners")
const {  sendOTPEmail} = require("./emailService")
const verifyUsersSchema = require("../model/verifyUser")

function generateOTP(){
    return  Math.floor(100000 + Math.random() * 900000).toString();
    
} 
exports.userRegisterController = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Incomplete credentials",
          email,
          password,
        });
      }
  
      // Check if email already exists
      const emailExist = await UserSchema.findOne({ email });
      if (emailExist) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
  
      // Hash password
      const hashed = await hashedPassword(password);
  
      // Generate OTP
      
      const otp = generateOTP();
      console.log(otp);
  
      // Send OTP email (ensure sendOTPEmail returns a promise)
      try {
        const result = await sendOTPEmail(email, otp);
        console.log(result);
      } catch (err) {
        console.error("Error sending OTP email:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to send OTP email. Please try again.",
        });
      }
      const userExist = await verifyUsersSchema.findOne({email});
      if(userExist){
            userExist.otp = otp
            await userExist.save()

            return res.status(202).json({
                success: true,
                message: "new otp is been send to the email.",
            });

      }
      // Save user details in the verification schema
      const user = new verifyUsersSchema({
        email,
        password: hashed,
        otp,
      });
  
      await user.save();
      console.log("User created for verification:", user);
  
      return res.status(202).json({
        success: true,
        message: "User registered successfully. OTP sent to email.",
      });
  
    } catch (error) {
      console.error("Error in user registration:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };

  

exports.verifyUserController = async (req, res) => {
    try {
      const { email, otp } = req.body;
  

      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message: "Email and OTP are required.",
        });
      }
  
      // Check if user exists
      const userExist = await verifyUsersSchema.findOne({ email });
      if (!userExist) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      // Verify OTP
      const storedOtp = userExist.otp;
      if (storedOtp !== otp) {
        return res.status(401).json({
          success: false,
          message: "Invalid OTP.",
        });
      }
  
      // Save user to UserSchema and delete from verifyUsersSchema
      const user = new UserSchema({
        email: userExist.email,
        password: userExist.password,
      });
      await user.save();
      await verifyUsersSchema.deleteOne({ email });
  
      return res.status(200).json({
        id:user._id
      });
  
    } catch (error) {
      console.error("Error verifying user:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };
  

exports.loginController = async(req,res)=>{
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
                        id:userExist._id,
                        restaurantid:"",
                        restaurantName:"",
                        resturantEstimateTime:0,
                        // resturantphoto:resturantExist.bannerPhoto64Image,
                        resturantCusine:""
                    
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

exports.forgotPassword =(req,re )=> {
     try {
        
        
     } catch (error) {
        
     }
}
