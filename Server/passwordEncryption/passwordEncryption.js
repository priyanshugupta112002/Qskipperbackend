const bcrypt = require("bcrypt")


const hashedPassword=async(password)=>{
    try {
        // console.log(password)
        const saltPassword= 12
        const hashedPassword = await bcrypt.hash(password,saltPassword)
        // console.log(hashedPassword)
        return hashedPassword

    } catch (error) {
        console.log(error , "password can nit be hashed ,hashedPassword")
    }
}
const comparePassword = async(password , hashedPassword)=>{
    return  await bcrypt.compare(password ,hashedPassword)

}
module.exports ={hashedPassword ,comparePassword}