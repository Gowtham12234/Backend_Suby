const express=require("express")
const firmcontroller=require("../controllers/firmController")
const jwt=require("jsonwebtoken");
const verifytoken=require("../middlewares/verifyToken");
const router=express.Router()

router.post('/addfirm',verifytoken,firmcontroller.addFirm)


router.get("/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type',"image/jpeg");
    res.senderFile(path .join(__dirname, "..","uploads",imageName))
})

router.delete("/:firmId",firmcontroller.deleteFirmById)
module.exports=router;