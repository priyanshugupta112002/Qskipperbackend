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
    status:{
        type:String,
        require:true,
        emun :["Placed" , "Preparing" , "Prepared" , "Picked Up"]
    },
    placedAt:{
        type:Date,
        default:Date.now(),
        require:true
    },
    scheduledAt:{
        type:Date,   
    }
})

const OrderSchema = mongoose.model('order' , orderSchema);
module.exports = {OrderSchema}
