const { json } = require("express")
const { ProductSchema } = require("../model/product")
const { ResturantSchema } = require("../model/shopOwners")
const UserSchema = require("../model/user")


const createProductController = async(req,res)=>{

   try {
        
        // console.log(req.body)
        const { product_name ,product_photo64Image, product_price , food_category , restaurant_id , description , extraTime} =  req.body
        console.log(product_name ,product_photo64Image, product_price , food_category , restaurant_id , description , extraTime)

        if (!product_name || !product_photo64Image || !product_price || !food_category || !restaurant_id || !description ){
                res.status(400).send({
                success:false,
                message:"incomplete Credentials"
            })
        }
       
        const newProduct = await ProductSchema({
            product_name,
            product_photo64Image,
            product_price,
            food_category,
            restaurant_id,
            description,
            extraTime
        })
        await newProduct.save();
        console.log(newProduct)
        return res.status(202)
    
   } catch (error) {
    console.log(error)
   }


}


const get_All_Product = async(req, res) => {
    try {
        const { pid } = req.params;
        console.log(pid);

        const products = await ProductSchema.find({ restaurant_id: pid }) .select("-product_photo64Image -extraTime")
          
            // .populate({
            //     path: 'restaurant_id', // Correctly reference the field for populating
            //     select: '-bannerPhoto64Image',
            //     options: { strictPopulate: false }
            // });

        console.log(products);
        if (products) {
            res.status(200).json({products}); // Send the product object, not All_Product
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};





const get_Product_Photo = async(req,res)=>{
    try {
        const {pid} =req.params

        const product_photo = await ProductSchema.findById({_id:pid}).select("product_photo64Image ")
        console.log(product_photo);
        if (product_photo) {
            res.status(200).json({
                product_photo:{
                    banner_photo64 : product_photo.product_photo64Image
                }
            }
            ); // Send the product object, not All_Product
        } else {
            res.status(404)
        }


    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:"error to fetch the product phtoto"
        })
    }

}

const OrderPlaced = async(req,res)=>{
   try {
    console.log("order")

    const {items , price  } = req.body
    console.log(items , price)
    console.log("cewcws")
    const item = items[0]
    const resturant = await ResturantSchema.findById({_id:item.restaurant_id}).populate("user")
    console.log(resturant)
    const user  =  resturant.user
    user.order. append([items , price])
    user.orderId += 1
    console.log(user.order)

    res.status(202).json(user.orderId)
    


   } catch (error) {
    res.status(404)
    
   }


    // const productNotAvailabele

    // items.forEach((item) => {
    //    const checkAvailability = await ProductSchema.findById({_id:item._id}).select("availability")
    //    if(!checkAvailability)
    // });


}
 




module.exports = {createProductController , get_All_Product , get_Product_Photo , OrderPlaced}