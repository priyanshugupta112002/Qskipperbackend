const dotenv = require("dotenv");
dotenv.config()
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { verifyOrderSchema } = require("../model/verifyOrder");
const { OrderSchema } = require("../model/order");
const { ResturantSchema } = require("../model/shopOwners");



const razorPayInstance =()=>{
    return new Razorpay({
        key_id: process.env.RazorPay_Key,
        key_secret: process.env.RazorPay_Secret_key
    });

}

exports.OrderPlaced = async (req, res) => {
    try {
        const { items, price, restaurantId, userId, takeAway } = req.body;

        if (!items || !price || !restaurantId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: items, price, restaurantId, or userId",
            });
        }

        const options = {
            amount: price * 100, // amount in paise
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
        };
        const resturantExist = await ResturantSchema.findById(restaurantId);
        
        const newOrder = new verifyOrderSchema({
                        items,
                        totalAmount:price,
                        resturant:restaurantId,
                        userID:userId,
                        cookTime:resturantExist.estimatedTime,
                        takeAway
        })
        
        // Razorpay create order

        
        const razorpayInstanceObj = razorPayInstance();
        razorpayInstanceObj.orders.create(options,async(err, order) => {
            if (err) {
                console.error("Error creating Razorpay order:", err);
                return res.status(500)
            }
            newOrder.razorpayOrderId = order.id;
            await newOrder.save();
            console.log(order.id , order)

            return res.status(200).json({
                id:order.id,
            });
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while placing the order",
            error: error.message,
        });
    }
};



exports.verifyOrder = async (req, res) => {
    try {
        const { order_id } = req.body;

        // Check if all required fields are present
        if (!order_id  ) {
            return res.status(400)
        }

        // const secret = process.env.RAZORPAY_SECRET_KEY;

        // // Generate the expected signature
        // const hmac = crypto.createHmac("sha256", secret);
        // hmac.update(`${order_id}|${payment_id}`);
        // const generatedSignature = hmac.digest("hex");

        // Compare signatures
        // if (generatedSignature === signature) {

            const orderRecord = await verifyOrderSchema.findOne({ razorpayOrderId: order_id });

            if (!orderRecord) {
                return res.status(404).json({
                  success: false,
                  message: "Order record not found in pending orders."
                });
              }


                const orderData = orderRecord.toObject();
                delete orderData.razorpayOrderId; // remove if OrderSchema doesn't support this
                

                const newOrder = new OrderSchema(orderData);
                await newOrder.save();
                console.log(newOrder)
                console.log(orderRecord._id)
                // Remove the record from verifyOrderSchema after saving
                const deletedRecord = await verifyOrderSchema.findByIdAndDelete(orderRecord._id);
                console.log(deletedRecord)
                return res.status(200).json({
                    success:true
                })
        
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500)
    }
};


exports.scheduleOrderPlaced = async(req,res)=>{
    try {
   
         const {items , price , restaurantId , userId , scheduleDate , takeAway} = req.body

         if (!items || !price || !restaurantId || !userId || !takeAway ||  !scheduleDate){
            res.status(400).send({
            success:false,
            message:"incomplete Credentials"
        })
        }

         const resturantExist = await ResturantSchema.findById(restaurantId);
         console.log(req.body);

         const newOrder = new verifyOrderSchema({
             items,
             totalAmount:price,
             resturant:restaurantId,
             userID:userId,
             cookTime:resturantExist.estimatedTime,
             scheduleDate,
             takeAway
 
         })
         console.log(newOrder);

        const razorpayInstanceObj = razorPayInstance();
        razorpayInstanceObj.orders.create(options,async(err, order) => {
            if (err) {
                console.error("Error creating Razorpay order:", err);
                return res.status(500)
            }
            newOrder.razorpayOrderId = order.id;
            await newOrder.save();
            console.log(order.id , order)

            return res.status(200).json({
                id:order.id,
            });
        });

     
    } catch (error) {
         res.status(404)
         console.log("order status error")
     
    }
 }








// exports.OrderPlaced = async(req,res)=>{
//    try {
  
//         const {items , price , restaurantId , userId  ,takeAway} = req.body

//         if (!items || !price || !restaurantId || !userId || !takeAway ){
//             res.status(400).send({
//             success:false,
//             message:"incomplete Credentials"
//         })
//     }

//         const resturantExist = await ResturantSchema.findById(restaurantId);
//         console.log(req.body);
//         const newOrder = new OrderSchema({
//             items,
//             totalAmount:price,
//             resturant:restaurantId,
//             userID:userId,
//             cookTime:resturantExist.estimatedTime,
//             takeAway

//         })
//         console.log(newOrder);
        
//         await newOrder.save();

//         res.status(200).json(newOrder._id);
    
//    } catch (error) {
//         res.status(404)
//         console.log("order status error")
    
//    }
// }
