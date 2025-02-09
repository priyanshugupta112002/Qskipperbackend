const mongoose = require("mongoose")

const verifyUsers = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
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

