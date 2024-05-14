const {bcrypt}=require("bcrypt")


const hashedPassword=async(password)=>{
    try {
        const saltPassword= 12
        const hashedPassword = await bcrypt.hsah(password,saltPassword)
        return hashedPassword

    } catch (error) {
        console.log(error , "password can nit be hashed ,hashedPassword")
    }
}
const comparePassword = async(password , hashedPassword)=>{
    const match = await bcrypt.compare(password ,hashedPassword)
    return match
}
modeule.exports ={hashedPassword ,comparePassword}