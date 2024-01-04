const express = require("express");
const PropertiesModel = require("../Models/Properties");

const getProperties = async function (req, res) {
    try {
        const properties = await PropertiesModel.find();
        res.status(200).json({data:properties});
    } catch (error) {
        console.log(error);
        res.status(500).json({message :"Something wrong happen"});
    }
}

module.exports=getProperties;



