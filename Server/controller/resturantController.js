
const {ResturantSchema} = require("../model/shopOwners")
const fs = require("fs")



const registerResturantComtroller = async(req,res)=>{

    try {

        const { user , restaurant_Name , cuisine , estimatedTime } =req.fields
        const { image} = req.fields



      
        // const {user ,  restaurant_Name  , cuisine , estimatedTime , bannerPhoto64Image}  = req.body
    
        if(!user || ! restaurant_Name  || !cuisine || !estimatedTime ) {
            return res.status(400)
        }else if (!image && image.size > 5000) {
            return res.status(400)

        }
        const userExist = await ResturantSchema.findOne({user})
        if (userExist){
            res.status(404)
        }

        const newRseturant = await ResturantSchema({
            user,
            restaurant_Name,
            cuisine,
            estimatedTime,
        })
       
        if (image) {
            newRseturant.bannerPhoto64Image.data = fs.readFileSync(image.path);
            newRseturant.bannerPhoto64Image.contentType = image.type;
        }

        await newRseturant.save();
        
    } catch (error) {
        console.log(error)
        return res.status(404)
    }
}
const get_All_resturant = async(req,res)=>{

    try {
        const Restaurant = await ResturantSchema.find({}).select("-bannerPhoto64Image -user")
        res.status(200).json({
            Restaurant
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
            restaurant:{
                banner_photo64 :restaurant_photo.bannerPhoto64Image
            }
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