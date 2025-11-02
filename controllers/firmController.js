const Firm=require("../models/Firm")
const Vendor=require("../models/Vendor")
const multer=require("multer")
const path=require("path");

const storage=multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'uploads/');
        },filename:function(req,file,cb){
            cb(null,Date.now() +path.extname(file.originalname))
        }
})

const upload = multer({ storage });
const addFirm=async(req, res)=>{
    try {
        const {firmname,area,category,region,offer}=req.body

    const image=req.file?req.file.filename:undefined;
console.log("Body:", req.body);
    
    const vendor=await Vendor.findById(req.vendorId)
    if(!vendor){
        res.status(401).json({message:"user not found"})
    }

    const firm =new Firm({
        firmname,area,category,region,offer,image,vendor:vendor._id
    })
    const savedFirm=await firm.save();

    vendor.firm.push(savedFirm)

    await vendor.save()
    return res.status(200).json("firm added successfully")
    } catch (error) {
        console.log(error)
        return res.status(500).json("internal server error")
    }
}
const deleteFirmById=async(req ,res)=>{
    try {
        const firmId=req.params.productId
        const deletedProduct=await Product.findByIdAndDelete(firmId)

        if(!deletedProduct){
            return res.status(404).json({error:"no firm found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}