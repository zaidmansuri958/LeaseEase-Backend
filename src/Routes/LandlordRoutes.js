const express=require("express")
const landlordRouter=express.Router()
const {signUp,signIn,getLandlord,getLandlordById}=require("../Controllers/LandlordController")
const auth=require("../MiddleWares/auth")

landlordRouter.post("/signUp",signUp)
landlordRouter.post("/signIn",signIn)
landlordRouter.get("/",auth,getLandlord)
landlordRouter.get("/:landlordId",getLandlordById)

module.exports=landlordRouter