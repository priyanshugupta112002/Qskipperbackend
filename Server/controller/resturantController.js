
const {ResturantSchema} = require("../model/shopOwners")
const fs = require("fs")



const registerResturantComtroller = async(req,res)=>{

    try {
        console.log(req.fields)
        const {user ,  resturantName ,  estimatedTime , cuisines }  = req.fields
        const {bannerPhoto} = req.files

        if(!users , ! resturantName , !estimatedTime , !cuisines ){
            return res.status(400).json({
                success:false,
                message:"Missing credentails"
            })
        }
        // console.log(cuisines)
        // console.log(cuisines.length)
        // if(cuisines.length  > 2 || cuisines.length < 1){
        //     return res.status(400).json({
        //         success:false,
        //         message:"one or two cuisines should be there"
        //     })
        // }
        if(!bannerPhoto || bannerPhoto.size > 10000000){
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
            newRseturant
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

        const Resturanrt = await ResturantSchema.find({}).select("-photo").populate("user")
        res.status(200).json({
            success:true,
            message:"List of All Resturant",
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


module.exports = {registerResturantComtroller , get_All_resturant}