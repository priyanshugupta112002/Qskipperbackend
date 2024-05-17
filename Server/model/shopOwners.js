const mongoose = require("mongoose")

const resturantSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    resturantName:{
        type:String,
        require:true
    },
    estimatedTime:{
        type:Number,
        require:true,
        default:5
    },
    extraTime:{
        type:Number,
        require:true,
        default:0
    },
    bannerPhoto:{
        type:Buffer,
        contentType:String,
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }],
    cuisines:[{
        type:String,
        emun :["South Indian" , "North Indian" , "Fast Food" , "Chinese"],
        require:true
    }],


});
const ResturantSchema = mongoose.model('resturant', resturantSchema)
module.exports(ResturantSchema)