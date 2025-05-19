
const {ResturantSchema} = require("../model/shopOwners")
const fs = require("fs")
const formidable = require('formidable');
const UserSchema = require("../model/user");
const ProductSchema = require("../model/product");
const { OrderSchema } = require("../model/order");




const registerResturantComtroller = async(req,res)=>{


    try {
        

        console.log(req.fields)
        const { userId,  restaurant_Name , cuisines ,estimatedTime } = req.fields
        const {bannerPhoto64Image:bannerPhoto64Image} = req.files

        console.log(userId, restaurant_Name ,cuisines , estimatedTime )

        
        // const {user ,  restaurant_Name  , cuisine , estimatedTime , bannerPhoto64Image}  = req.body
    
        if(!userId || ! restaurant_Name  || !cuisines || !estimatedTime ) {
            return res.status(400)
        } else if (!bannerPhoto64Image) {
            return res.status(400)

        }

        // console.log("ewwqqasdasd")
        const userExist = await ResturantSchema.findOne({userId})
        if (userExist){
            res.status(404)
        }
    //  console.log(bannerPhoto64Image)

        const newRseturant = await ResturantSchema({
            user:userId,
            restaurant_Name,
            cuisine:cuisines,
            estimatedTime,
        })
      
        if (bannerPhoto64Image) {
            newRseturant.bannerPhoto64Image.data = fs.readFileSync(bannerPhoto64Image.path);
            newRseturant.bannerPhoto64Image.contentType = bannerPhoto64Image.type;
        }
        await newRseturant.save();
        console.log("ecwe")
        return res.status(200).end(
            newRseturant._id.toString()
        )
        
    } catch (error) {
        console.log(error)
        return res.status(404)
    }

    
}
const get_All_resturant = async(req,res)=>{

    try {
        const Restaurant = await ResturantSchema.find({}).select("-bannerPhoto64Image")
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
        
        res.status(200).json({
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



const resturantOrders = async (req, res) => {
    try {
        const { pid } = req.params;
        
        if (!pid) {
            return res.status(400).json({ error: "Restaurant ID is required" });
        }
        console.log(pid)
        const all_orders = await OrderSchema.find({ resturant: pid }).sort({ Time: -1 });

        if (all_orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this restaurant" });
        }
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        console.log("resturant orders");
        console.log(all_orders);
        res.status(200).json({length:all_orders.length , all_orders});

    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const orderCompleted = async (req, res) => {
    try {
        
        const { oid } = req.params;
        const order = await OrderSchema.findByIdAndUpdate(
            oid,
            { status: "Completed" },
            { new: true }
          );
          
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200)
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




module.exports = {registerResturantComtroller , get_All_resturant , get_Retrurant_Photo , resturantOrders , orderCompleted}