const express=require("express")
const adminRouter=express.Router()
const {signIn}=require("../Controllers/AdminController")
const auth=require("../MiddleWares/auth")


adminRouter.post("/signIn",signIn)

module.exports=adminRouter