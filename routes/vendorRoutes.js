const vendorController=require("../controllers/vendorcontroller");
const express=require("express")
const router=express.Router();

router.post('/register', vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin);


router.get("/allVendors",vendorController.getAllVendors);
router.get("/single-vendor/:id",vendorController.getvendorById)
module.exports=router; 