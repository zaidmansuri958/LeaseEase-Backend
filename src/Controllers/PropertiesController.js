const express = require("express");
const PropertiesModel = require("../Models/Properties");

const getProperties = async function (req, res) {
  try {
    const properties = await PropertiesModel.find();
    res.status(200).json({ data: properties });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something wrong happen" });
  }
};

const getPropertiesByLandlord=async function(req,res){
  try{
    const properties=await PropertiesModel.find({LandlordId:req.userID})
    res.status(200).json({data:properties})
  }catch(error){
    console.log(error);
    res.status(500).json({message:"Something wrong happen"})
  }
}

const removeProperties=async function(req,res){
  const id=req.params.id
  try{
    const property=await PropertiesModel.findByIdAndRemove(id)
    res.status(202).json(property)
  }catch(error){
    console.log(error);
    res.status(500).json({message:"Something wrong happen"})
  }
}

const updateProperties=async function(req,res){
  const id=req.params.id
  const updatedProperties=req.body
  try{
    const property=await PropertiesModel.updateOne({_id:id}, { $set: updatedProperties})
    res.status(202).json(property)
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:"Something wrong happen"})
  }
}

const addProperties = async function (req, res) {
  const {
    propertyID,
    LandlordId,
    propertyAddress,
    rentAmount,
    depositAmount,
    availability,
    propertyType,
    bedRooms,
    bathRooms,
    Amenities,
    squareFootage,
    description,
    propertyMedia,
    city,
  } = req.body;

  try{
    const result = await PropertiesModel.create({
        propertyID: propertyID,
        LandlordId: LandlordId,
        propertyAddress: propertyAddress,
        rentAmount: rentAmount,
        depositAmount:depositAmount,
        availability: availability,
        propertyType: propertyType,
        bedRooms: bedRooms,
        bathRooms: bathRooms,
        Amenities: Amenities,
        squareFootage: squareFootage,
        description: description,
        propertyMedia: propertyMedia,
        city: city,
      });
      return res.status(200).json({message:result})
  }catch(error){
    console.log(error)
    return res.status(500).json({message:error});
  }
};

module.exports = {getProperties,addProperties,getPropertiesByLandlord,removeProperties,updateProperties};
