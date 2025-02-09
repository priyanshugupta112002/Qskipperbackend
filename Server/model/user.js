const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    otp:{
        type:String,
        require:true
    }
    // securityCode:{
    //     type:String,
    //     require:true,
    //     default:0,
    // },
    // order:{
    //     items:[{
    //         type:mongoose.Schema.Types.ObjectId,
    //         res:"product"
    //     }],
    //     totalPrice:{
    //         type:Number 
    //     },
    //     status:{
    //         type:String,
    //         default:"Placed"
    //     },
    //     packed:{
    //         type:String,
    //         default:"Take Away"
    //     },
    //     orderId:{
    //         typeo:String,
            
    //     }
    // },
    // TotalOrder:{
    //     type:Number,
    //     default : 0
    // }
});

const UserSchema =  mongoose.model('users' , userSchema)
module.exports = UserSchema

