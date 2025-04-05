const  UserSchema  = require("../model/user")
const jwt = require("jsonwebtoken")
const {hashedPassword , comparePassword} = require("../passwordEncryption/passwordEncryption")
const { ResturantSchema } = require("../model/shopOwners")
const {  sendOTPEmail} = require("./emailService")
const verifyUsersSchema = require("../model/verifyUser")
const jwksClient = require('jwks-rsa');

function generateOTP(){
    return  Math.floor(100000 + Math.random() * 900000).toString();
    
} 




const client = jwksClient({
     jwksUri: 'https://appleid.apple.com/auth/keys'
    
});

exports.userRegisterController = async (req, res) => {
    try {
      const { email, username } = req.body;
      console.log(email, username);
  
      // Validate input
      if (!email || !username) {
        return res.status(400).json({
          success: false,
          message: "Incomplete credentials",
          email,
          username,
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

            return res.status(200).json({
                success: true,
                message: "new otp is been send to the email.",
            });

      }
      // Save user details in the verification schema
      const user = new verifyUsersSchema({
        email,
        username,
        otp,
      });
  
      await user.save();
      console.log("User created for verification:", user);
  
      return res.status(200).json({
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

  
  exports.userAppleRegisterController = async (req, res) => {
    try {
      const { identityToken , user } = req.body;
      console.log(user, identityToken);
  
      // Validate input
      if (!identityToken || !user) {
        return res.status(400).json({
          success: false,
          message: "Incomplete credentials",
          username,
        });
      }
     
      const json = jwt.decode(identityToken , {complete:true})

      const kid = json?.header?.kid;
      const key = await client.getSigningKey(kid);
      const signingKey = key.getPublicKey();


      const verifiedPayload = jwt.verify(identityToken, signingKey, {
        algorithms: ['RS256'],
        issuer: 'https://appleid.apple.com'
      });
      console.log(verifiedPayload)
      if(verifiedPayload.sub == user && verifiedPayload.aud == "Team.Qskipper.QSkipper"){
        const email = verifiedPayload.email;
          const userExist = await UserSchema.findOne({ email });

          if(userExist){
            return res.status(200).json({
              id:userExist._id
            });
          }
          const user = new verifyUsersSchema({
            email,
          });
      
          await user.save();
          return res.status(200).json({
            id:user._id
          });
      }else{
        throw Error("Server Error")
      }
  
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
      const { email, otp  } = req.body;
  

      if (!email || !otp ) {
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
  ///cscscasca
      // Save user to UserSchema and delete from verifyUsersSchema
      const user = new UserSchema({
        email: userExist.email,
        username: userExist.username,
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
  
exports.verifyLoginController = async (req, res) => {
    try {
      const { email, otp  } = req.body;
      console.log(email,otp);

      if (!email || !otp ) {
        return res.status(400).json({
          success: false,
          message: "Email and OTP are required.",
        });
      }
  
      // Check if user exists
      const userExist = await UserSchema.findOne({ email });
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
      console.log("cw")
      // Save user to UserSchema and delete from verifyUsersSchema
  
      return res.status(200).json({
        id:userExist._id
      });
  
    } catch (error) {
      console.error("Error verifying user:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
};
  

exports.loginController = async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email)
      // Validate email input
      if (!email) {
        return res.status(400).send({
          success: false,
          message: "Incomplete credentials: Email is required",
        });
      }
  
      // Check if user exists in the database
      const userExist = await UserSchema.findOne({ email });
      if (!userExist) {
        return res.status(400).json({
          success: false,
          message: "User is not registered",
        });
      }
  
      // Generate OTP and log it (for debugging only, remove in production)
      const otp = generateOTP();
      console.log("Generated OTP:", otp);
  
      // Send OTP via email
      try {
        const result = await sendOTPEmail(email, otp);
        console.log("OTP Email Result:", result);
      } catch (err) {
        console.error("Error sending OTP email:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to send OTP email. Please try again.",
        });
      }
  
      // Save the OTP to the user record
      userExist.otp = otp;
      await userExist.save();
  
      return res.status(200).json({
        success: true,
        message: "User logged in successfully. OTP sent to email.",
        username:userExist.username,
        id:userExist._id
      });
  
    } catch (error) {
      console.error("Error in loginController:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error. Please try again.",
      });
    }
  };
  
  exports.ResturantloginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Incomplete Credentials",
            });
        }

        const userExist = await UserSchema.findOne({ email });
        if (!userExist) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }
        
        // const samePassword = await comparePassword(password, userExist.password);
        // console.log(samePassword)
        // if (!samePassword) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "Invalid Credentials",
        //     });
        // }
        // console.log("saas")
        const resturantExist = await ResturantSchema.findOne({ user: userExist._id });

        return res.status(200).json({
            id: userExist._id,
            restaurantid: resturantExist ? resturantExist._id : "",
            restaurantName: resturantExist ? resturantExist.restaurant_Name : "",
            resturantEstimateTime: resturantExist ? resturantExist.estimatedTime : 0,
            resturantCusine: resturantExist ? resturantExist.cuisine : "",
        });

    } catch (error) {
        console.error("Login Controller issue:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


exports.resturantRegisterController = async (req, res) => {
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

    // Save user details in the verification schema
    const user = new UserSchema({
      email,
      password,
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resturant registered successfully. OTP sent to email.",
    });

  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};



exports.forgotPassword =(req,re )=> {
     try {
        
        
     } catch (error) {
        
     }
}
