
const {ResturantSchema} = require("../model/shopOwners")
const fs = require("fs")
const formidable = require('formidable');




const registerResturantComtroller = async(req,res)=>{


    try {
        

        console.log(req.files)
        const { userId:user,  restaurant_Name:restaurant_Name , cuisines:cuisine ,estimatedTime:estimatedTime } = req.fields
        const {bannerPhoto64Image:bannerPhoto64Image} = req.files

        console.log(user, restaurant_Name ,cuisine , estimatedTime )

      
        // const {user ,  restaurant_Name  , cuisine , estimatedTime , bannerPhoto64Image}  = req.body
    
        if(!user || ! restaurant_Name  || !cuisine || !estimatedTime ) {
            return res.status(400)
        } else if (!bannerPhoto64Image) {
            return res.status(400)

        }

        // console.log("ewwqqasdasd")
        const userExist = await ResturantSchema.findOne({user})
        if (userExist){
            res.status(404)
        }
    //  console.log(bannerPhoto64Image)

        const newRseturant = await ResturantSchema({
            user,
            restaurant_Name,
            cuisine,
            estimatedTime,
        })
      
        if (bannerPhoto64Image) {
            newRseturant.bannerPhoto64Image.data = fs.readFileSync(bannerPhoto64Image.path);
            newRseturant.bannerPhoto64Image.contentType = bannerPhoto64Image.type;
        }
        await newRseturant.save();
        console.log("ecwe")
        return res.status(202).end(
            newRseturant._id.toString()
        )
        
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
        const restaurant= await ResturantSchema.findById({_id:pid}).select("bannerPhoto64Image")
        if (restaurant.bannerPhoto64Image.data) {
            res.set("Content-type", restaurant.bannerPhoto64Image.contentType);
            return res.status(200).send(restaurant.bannerPhoto64Image.data);
          }
        
        res.status(202).json({
            restaurant:{
                banner_photo64 :restaurant.bannerPhoto64Image
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