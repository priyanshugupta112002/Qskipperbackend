const mongoose =("mongoose")

const userSchema = new mongoose.Schema({
    fullNAme:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

const UserSchema = mongoose.model('user' , userSchema)
module.exports = {UserSchema}