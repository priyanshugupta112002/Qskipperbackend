const mongoose = require("mongoose")

const resturantSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    restaurant_Name:{
        type:String,
        require:true
    },
    estimatedTime:{
        type:Number,
        require:true,
        default:5
    },
    bannerPhoto64Image:{
        type:String,
        require:true
    },
    cuisine:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        require:true
    }
    
});
const ResturantSchema = mongoose.model('resturants', resturantSchema)
module.exports = {ResturantSchema}


