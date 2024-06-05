const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { connectDB } =require("./config/db")



const app = express()
dotenv.config()


connectDB()


// app.use(express.json())
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