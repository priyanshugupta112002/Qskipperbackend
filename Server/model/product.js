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
    available:{
        type:Boolean,
        default:true,
    }
})

const ProductSchema = mongoose.model('product',productSchema)
module.exports = {ProductSchema}