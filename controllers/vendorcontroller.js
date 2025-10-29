const Vendor=require("../models/Vendor");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs");
const token=require("jsonwebtoken")
const dotenv=require("dotenv")
const firm=require("../models/Firm")
const { model } = require("mongoose");
dotenv.config()
const secret_key=process.env.jwtsecretkey;

const vendorRegister=async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const vendorEmail=await Vendor.findOne({email})
        if(vendorEmail){
            res.status(400).json("user already exist");
        }
        const hashedpassword=await bcrypt.hash(password,10);
        const newvendor=new Vendor({
            username,
            email,
            password:hashedpassword
        })
        await newvendor.save();
        res.status(201).json({message:"vendor registered successfully"});
        console.log("registerd")

    }catch(error){
        console.error(error)
        res.status(501).json({message:"internal server error"});
    }
}

const vendorLogin=async(req,res)=>{
    const {email,password}=req.body
    try{
        const vendor=await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error:"invalid username or password"})
        }
        const token=jwt.sign({vendorId:vendor._id},secret_key,{expiresIn:"1h"})

        res.status(200).json({message:" logged in successfully",token})
        console.log(email,"this is token ",token)
    }catch(error){
        console.error(error);
    }
}

const getAllVendors=async(req,res)=>{
    try {
        const vendors=await Vendor.find().populate('firm')
        res.json({vendors})
    } catch (error) {
        console.error(error)
        return res.status(501).json("internal server error")
    }
}

const getvendorById=async(req,res)=>{
    console.log("Incoming params:", req.params); 
    const vendorId=req.params.id;
    console.log("vendorId:", vendorId);
    try {
        const vendor=await Vendor.findById(vendorId).populate('firm')
        if(!vendor){
            return res.status(404).json({error:"vendor not found"})
        }
        res.status(200).json({vendor})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}
module.exports={vendorRegister,vendorLogin,getAllVendors,getvendorById}
    
