const express=require("express")
const agreementRouter=express.Router()
const { addAgreement,getAgreements,updateAgreement,getAgreementsWithPropertyDetails}=require("../Controllers/AgreementController");
const auth=require("../MiddleWares/auth")

agreementRouter.post("/",auth,addAgreement);
agreementRouter.get("/",auth,getAgreements);
agreementRouter.get("/properties",auth,getAgreementsWithPropertyDetails)
agreementRouter.post("/update/:id",updateAgreement);


module.exports=agreementRouter