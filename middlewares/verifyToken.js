const Vendor=require("../models/Vendor");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv")

dotenv.config();

const secret_key=process.env.jwtsecretkey
const verifyToken=async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        return res.status(401).json("token is required")
    }
    try{
        const decoded=jwt.verify(token,secret_key)
        const vendor=await Vendor.findById(decoded.vendorId)

        if(!vendor){
            return res.status(401).json({error:"vendor not found"})
        }

        req.vendorId=vendor._id
        next()
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"invalid token"})
    }

}

module.exports=verifyToken