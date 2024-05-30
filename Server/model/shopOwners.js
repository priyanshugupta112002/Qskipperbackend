const mongoose = require("mongoose")

const resturantSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
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
    bannerPhoto:{
        data:Buffer,
        contentType:String,
    },
    cuisines:{
        type:String,
        require:true
    }
});
const ResturantSchema = mongoose.model('resturants', resturantSchema)
module.exports = {ResturantSchema}