const express=require("express")
const complaintsRouter=express.Router()
const {addComplaint, getComplaintbyTenant,getComplaintByLandlord,getAllComplaints}=require("../Controllers/ComplaintsController")
const auth=require("../Middlewares/auth")



complaintsRouter.post("/",addComplaint);
complaintsRouter.get("/landlord",auth,getComplaintByLandlord);
complaintsRouter.get("/tenant",auth,getComplaintbyTenant);
complaintsRouter.get("/admin/complaints",getAllComplaints)


module.exports=complaintsRouter;