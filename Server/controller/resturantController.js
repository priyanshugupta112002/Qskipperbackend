
const {ResturantSchema} = require("../model/shopOwners")
const fs = require("fs")



const registerResturantComtroller = async(req,res)=>{

    try {
      
        const {user ,  restaurant_Name  , cuisine , estimatedTime , bannerPhoto64Image}  = req.body
    
        if(!user || ! restaurant_Name  || !cuisine || !estimatedTime || !bannerPhoto64Image) {
            return res.status(400)
        }
        const newRseturant = await ResturantSchema({
            user,
            restaurant_Name,
            cuisine,
            estimatedTime,
            bannerPhoto64Image
        })
       
        await newRseturant.save()

        res.status(202).json({

        })
        
    } catch (error) {
        console.log(error)
        return res.status(404)
    }
}


const get_All_resturant = async(req,res)=>{

    try {
        const Resturanrt = await ResturantSchema.find({}).select("-bannerPhoto -user")
        res.status(200).json({
            Resturanrt
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:error
        })
    }
}

const get_Retrurant_Photo = async(req,res)=>{

    try {
        console.log("gvhn")
        const {pid} =req.params
        console.log(pid)
        const restaurant_photo = await ResturantSchema.findById({_id:pid}).select("bannerPhoto64Image")
        
        res.status(202).json({
            restaurant_photo
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:"error to fetch the Resturant banner phtoto"
        })
    }

}



module.exports = {registerResturantComtroller , get_All_resturant , get_Retrurant_Photo}