
const {ResturantSchema} = require("../model/shopOwners")
const fs = require("fs")



const registerResturantComtroller = async(req,res)=>{

    try {
        console.log(req.fields)
        const {user ,  resturantName  , cuisines , estimatedTime}  = req.fields
        const {bannerPhoto} = req.files

        if(!user || ! resturantName  || !cuisines || !estimatedTime){
            return res.status(400).json({
                success:false,
                message:"Missing credentails"
            })
        }
     
        if(!bannerPhoto || bannerPhoto.size > 6000000){
            return res.status(400).json({
                success:false,
                message:"Banner photo should be ther or photo should be less than 5.5 mb"
            })
        }
        const newRseturant = await ResturantSchema({...req.fields})
        if (bannerPhoto){
            newRseturant.bannerPhoto.data = fs.readFileSync(bannerPhoto.path)
            newRseturant.bannerPhoto.contentType = bannerPhoto.type
        }
        await newRseturant.save()

        res.status(200).json({
            success:true,
            message:"Resturnat is been registered",
            newRseturant:{
                id:newRseturant._id,
                name:newRseturant.name
            }
        })
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:error
        })
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
        const {pid} =req.params

        const product_photo = await ResturantSchema.findById({_id:pid}).select("photo")
        if(product_photo){
            res.set('Content-type' , product_photo.photo.contentType)
        }
        res.status(200).json({
            product_photo,
            success:true
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