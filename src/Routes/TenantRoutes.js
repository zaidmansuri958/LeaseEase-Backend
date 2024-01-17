const express=require("express")
const tenantRouter=express.Router()
const {signUp,signIn,getTenant,getTenantById,updateTenant}=require("../Controllers/TenantController")
const auth=require("../MiddleWares/auth")

tenantRouter.post("/signUp",signUp)
tenantRouter.post("/signIn",signIn)
tenantRouter.get("/",auth,getTenant)
tenantRouter.get("/:tenantId",getTenantById)
tenantRouter.post("/update/:id",updateTenant)

module.exports=tenantRouter