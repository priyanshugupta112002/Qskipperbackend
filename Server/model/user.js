const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    securityCode:{
        type:String,
        require:true
    },
    order:{
        items:[{
            type:mongoose.Schema.Types.ObjectId,
            res:"product"
        }],
        totalPrice:{
            type:Number 
        }
    },
    orderId:{
        type:Number,
        default : 0
    }
});

const UserSchema =  mongoose.model('users' , userSchema)
module.exports = UserSchema

