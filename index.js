const express=require("express")
const dotenv=require("dotenv")
const mongoose =require("mongoose")
const bodyparser=require("body-parser")
const venodorRoutes=require("./routes/vendorRoutes")
const firmroutes=require("./routes/FirmRoutes")
const ProductRoutes=require("./routes/ProductRoutes");
const app=express();
const path=require("path")

const PORT=process.env.PORT||4500 ;

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(" mongo db connceted successfully")
}).catch((error)=>{
    console.error(error)
})

app.use(bodyparser.json());
app.use('/vendor',venodorRoutes);
app.use('/firm',firmroutes)
app.use("/product",ProductRoutes)
app.use("/uploads",express.static('uploads'));


app.listen(PORT,(req,res)=>{
    console.log(`server running in ${port}`);
})

app.use("/",(req,res)=>{
    res.send("<h1> welcome to suby <h1/>")
}) 