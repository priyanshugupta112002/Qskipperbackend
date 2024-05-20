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
        const newProduct = await ProductSchema({...req.fields})
       
        if(photo){
                newProduct.photo.data = fs.readFileSync(photo.path)
                newProduct.photo.contentType = (photo.type)
        }
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

}


module.exports = {createProductController}