const express = require("express")
const PropertiesMediaRoutes = express.Router();
const getPropertiesMedia= require("../Controllers/PropertyMediaController")


PropertiesMediaRoutes.get("/:mediaId", getPropertiesMedia)

module.exports = PropertiesMediaRoutes;
