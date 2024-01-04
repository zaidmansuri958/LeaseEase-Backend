const express = require("express")
const PropertiesRoutes = express.Router();
const getProperties= require("../Controllers/PropertiesController")


PropertiesRoutes.get("/", getProperties)

module.exports = PropertiesRoutes;
