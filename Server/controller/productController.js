const fs = require("fs")
const { ProductSchema } = require("../model/product")


const createProductController = async(req,res)=>{

   try {
        
        const { name , price ,  availability, food_option , resturant_id} =  req.fields
        const {photo} =  req.files

        console.log(name , price ,  availability ,  food_option)

        if (!name || !price || !availability || !food_option ,  !resturant_id){
                res.status(400).send({
                success:false,
                message:"incomplete Credentials",
                name, email,password

            })
        }
        if (!photo || photo.size > 6000000){
                res.status(400).send({
                    success:false,
                    message:"photo is larger than 5.3mb ",
                })
            }
        const newProduct = await ProductSchema({...req.fields , resturant:resturant_id})
       
        if(photo){
                newProduct.photo.data = fs.readFileSync(photo.path)
                newProduct.photo.contentType = (photo.type)
        }
        console.log(newProduct.size)
        await newProduct.save();
        console.log(newProduct)
        return res.status(202).json({
            success:true,
            message:"Product created"
        })
    
   } catch (error) {
    console.log(error)
   }


}
const get_All_Product = async(req,res)=>{
    const {resturant_id} = req.body;

    const all_product = await ProductSchema.find({resturant:resturant_id}).populate({
        path: 'resturant',
        select: '-bannerPhoto',
        options: { strictPopulate: false }
    })
    if(all_product){
        res.status(200).json({
            success:true,
            totalProduct:all_product.length,
            all_product,
        })
    }
}
const get_Product_Photo = async(req,res)=>{
    try {
        const {pid} =req.params

        const product_photo = await ProductSchema.findById({_id:pid}).select("photo")
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
            message:"error to fetch the product phtoto"
        })
    }

}



module.exports = {createProductController , get_All_Product , get_Product_Photo}