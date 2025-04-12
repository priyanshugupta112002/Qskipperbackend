const { json } = require("express")
const { ProductSchema } = require("../model/product")
const { ResturantSchema } = require("../model/shopOwners")
const UserSchema = require("../model/user")
const fs = require("fs")
const { OrderSchema } = require("../model/order")


const createProductController = async(req,res)=>{

   try {

        console.log(req.fields)
        const { product_name , product_price , food_category , restaurant_id , description , extraTime} =  req.fields
        const { product_photo64Image} = req.files
        console.log(product_name , product_price , food_category , restaurant_id , description , extraTime)

        if (!product_name || !product_photo64Image || !product_price || !food_category || !restaurant_id || !description ){
                res.status(400).send({
                success:false,
                message:"incomplete Credentials"
            })
        }
        
       
        const newProduct = new ProductSchema({
            product_name,
            product_price,
            food_category,
            restaurant_id,
            description,
            extraTime
        })
        if (product_photo64Image) {
            newProduct.product_photo64Image.data = fs.readFileSync(product_photo64Image.path);
            newProduct.product_photo64Image.contentType = product_photo64Image.type;
        }
        await newProduct.save();
        console.log(newProduct)
        return res.status(200)
    
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
        console.log(pid)
        const product= await ProductSchema.findById({_id:pid}).select("product_photo64Image ")
      
        if (product.product_photo64Image.data) {
            res.set("Content-type", product.product_photo64Image.contentType);
            return res.status(200).send(product.product_photo64Image.data);
          }
        if (product.product_photo64Image) {
            res.status(200).json({
                product_photo:{
                    banner_photo64 : product.product_photo64Image
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




const updateOnOrder = async (req, res) => {
    try {
        
        const { orderId } = req.params;
        const order = await OrderSchema.findById(orderId);

       
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json({ status: order.status });
    } catch (error) {
        console.error("Error fetching order status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



const updatePhotoController = async(req,res)=>{

    try {
        
        const { product_name , product_price , food_category , restaurant_id , description , extraTime ,featured_Item } =  req.fields
        const {product_photo64Image:product_photo64Image} = req.files
        if (!product_name  || !product_price || !food_category || !restaurant_id || !description ){
                res.status(400).send({
                success:false,
                message:"incomplete Credentials"
            })
        }

        const product = await ProductSchema.findByIdAndUpdate(
            req.params.pid,
            {product_name,
            product_price,
            food_category,
            restaurant_id,
            description,
            extraTime},
            { new: true }
          );
        

        if (product_photo64Image) {
            product.product_photo64Image.data = fs.readFileSync(product_photo64Image.path);
            product.product_photo64Image.contentType = product_photo64Image.type;
        }
        await product.save();
        console.log(product)
        return res.status(200)
    
   } catch (error) {
    console.log(error)
   }


}

const topPicks = async(req,res)=>{

    try {
        const allTopPicks = await ProductSchema.find({top_picks:true}).select("-product_photo64Image")
        console.log(allTopPicks)
        res.status(200).json({
            allTopPicks
        })
    } catch (error) {
        res.status(400)
    }

}


const userOrders = async (req, res) => {
    try {
        const { pid } = req.params;
        
        if (!pid) {
            return res.status(400).json({ error: "User ID is required" });
        }
        console.log(pid)
        const all_orders = await OrderSchema.find({ userID: pid }).sort({ Time: -1 });

        if (all_orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this restaurant" });
        }

        res.status(200).json( all_orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//  create product rating
const RatingOfAProduct = async (req, res) => {
    try {
      const { rating } = req.body;
      const { pid } = req.params;
  
      if (!rating || rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'Invalid rating. Must be between 0 and 5.' });
      }
  
      let product = await ProductSchema.findById(pid);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const numberOfPeopleRate = product.numberOfPeopleRate || 0;
      product.rating = ((product.rating * numberOfPeopleRate) + rating) / (numberOfPeopleRate + 1);
      product.numberOfPeopleRate = numberOfPeopleRate + 1;
  
      await product.save();
  
      res.status(200).json({ message: 'Rating updated successfully', product });
    } catch (error) {
      console.error('Error updating product rating:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = {createProductController , get_All_Product , get_Product_Photo  , updatePhotoController , topPicks , updateOnOrder , userOrders , RatingOfAProduct}