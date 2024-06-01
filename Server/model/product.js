const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    product_name:{
        type:String,
        require:true
    },
    product_photo64Image:{
        type:String,
        require:true
    },
    ratinge:{
        type:String,
    },
    product_price:{
        type:String,
        require:true
    },
    availability:{
        type:Boolean,
        default:true,
    },
    food_category:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    extraTime:{
        type:Number,
        require:true,
        default:0
    },
    restaurant_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"resturants",
    }
})

const ProductSchema = mongoose.model('product',productSchema)
module.exports = {ProductSchema}