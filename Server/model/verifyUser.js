const mongoose = require("mongoose")

const verifyUsers = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    otp:{
        type:String,
        require:true
    }
});

const verifyUsersSchema =  mongoose.model('verifyUsers' , verifyUsers)
module.exports = verifyUsersSchema

