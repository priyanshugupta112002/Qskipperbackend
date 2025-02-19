const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"resturants"
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    items:[
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
        default:"Placed",
        emun :["Placed" , "Prepared" , "Picked Up"]
    },
    Time:{
        type:Date,   
        default:Date.now(),
        
    }
})

const OrderSchema = mongoose.model('order' , orderSchema);
module.exports = {OrderSchema}
