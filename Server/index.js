const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fetch = require("node-fetch"); 
const { connectDB } =require("./config/db")



const app = express()
dotenv.config()


connectDB()


app.use(express.json())
app.use(morgan("dev"))
app.use(express.static("public"))


app.use(require("./routes/auth"))
app.use(require("./routes/product"))
app.use(require("./routes/resturantRoutes"))


const PORT = process.env.PORT || 8080

app.get('/',(req,res)=>{
    res.send("hi home page")
})

app.listen(PORT , ()=>{
    console.log(`hi QSkipper app is here ${PORT}`)
})


// --- keep-alive ping ---
const KEEP_ALIVE_INTERVAL = 1 * 60 * 1000;  // 10 minutes
setInterval(() => {
  const url = process.env.ROOT_URL || `https://qskipperbackend.onrender.com/`;
  fetch(url)
    .then(res => console.log(`Self-ping success: ${res.status}`))
    .catch(err => console.error("Self-ping error:", err));
}, KEEP_ALIVE_INTERVAL);