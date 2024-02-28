const express = require("express")
const PropertiesRoutes = express.Router();
const {getProperties,addProperties,getPropertiesByLandlord,removeProperties,updateProperties,getPopularProperties,getPropertiesById}= require("../Controllers/PropertiesController")
const multer=require("multer");
const auth=require("../MiddleWares/auth")


PropertiesRoutes.get("/", getProperties)
PropertiesRoutes.get("/:id", getPropertiesById)
PropertiesRoutes.get("/landlord",auth,getPropertiesByLandlord)
PropertiesRoutes.post("/",auth,addProperties)
PropertiesRoutes.delete("/:id",removeProperties)
PropertiesRoutes.post("/update/:id",updateProperties)
PropertiesRoutes.get("/popular",getPopularProperties)



module.exports = PropertiesRoutes;
