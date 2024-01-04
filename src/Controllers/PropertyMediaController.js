const express = require("express");
const PropertyMedialModel = require("../Models/PropertiesMedia");

const getPropertiesMedia = async function (req, res) {
    try {
        const propertiesMedia = await PropertyMedialModel.find({_id:req.mediaId});
        res.status(200).json({data:propertiesMedia});
    } catch (error) {
        console.log(error);
        res.status(500).json({message :"Something wrong happen"});
    }
}

module.exports=getPropertiesMedia;



