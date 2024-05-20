const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    ratinge:{
        type:String,
    },
    price:{
        type:String,
        require:true
    },
    availability:{
        type:Boolean,
        default:true,
    },
    food_option:{
        type:String,
        enum:["Veg","Non-Veg"],
        require:true,
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"resturants",
    }
})

const ProductSchema = mongoose.model('product',productSchema)
module.exports = {ProductSchema}