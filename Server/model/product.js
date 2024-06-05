const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        require:true
    },
    product_photo64Image:{
        type:String,
        require:true
    },
    ratinge:{
        type:Number,
        default:0.0
    },
    product_price:{
        type:Number,
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
    },
    quantity:{
        type:Number,
        default:1
    }
})

const ProductSchema = mongoose.model('product',productSchema)
module.exports = {ProductSchema}