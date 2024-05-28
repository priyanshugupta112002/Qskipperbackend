const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"resturant"
    },
    product:[
        {
            productId:{
                type:String,
                require:true
            },
            name:{
                type:String,
                require:true
            },
            quantity:{
                type:Number,
                require:true
            },
            price:{
                type:Number,
                require:true
            }
        }
    ],
    totalAmount:{
        type:String,
        require:true
    },
    packed:{
        type:Boolean,
        default:false,
    },
    status:{
        type:String,
        require:true,
        emun :["Placed" , "Preparing" , "Prepared" , "Picked Up"]
    },
    scheduledAt:{
        type:Date,   
        default:Date.now(),
        require:true
    }
})

const OrderSchema = mongoose.model('order' , orderSchema);
module.exports = {OrderSchema}
