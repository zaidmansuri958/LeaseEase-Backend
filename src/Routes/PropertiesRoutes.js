const express = require("express")
const PropertiesRoutes = express.Router();
const {getProperties,addProperties}= require("../Controllers/PropertiesController")
const multer=require("multer");


PropertiesRoutes.get("/", getProperties)
PropertiesRoutes.post("/",addProperties)

module.exports = PropertiesRoutes;
