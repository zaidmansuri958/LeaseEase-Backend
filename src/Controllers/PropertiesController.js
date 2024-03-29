const express = require("express");
const PropertiesModel = require("../Models/Properties");

const getProperties = async function (req, res) {
  try {
    const properties = await PropertiesModel.find();
    res.status(200).json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something wrong happen" });
  }
};

const getPropertiesById = async function (req, res) {
  try {
    const properties = await PropertiesModel.find({_id:req.params.id});
    res.status(200).json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something wrong happen" });
  }
};

const getPropertiesByLandlord=async function(req,res){
  const LandlordId=req.userID;
  try{
    console.log(req.userID)
    const properties=await PropertiesModel.find({LandlordId:LandlordId})
    console.log(properties)
    res.status(200).json(properties)
  }catch(error){
    console.log(error);
    res.status(500).json({message:error})
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

const getPopularProperties=async function(req,res){
  const limit=6
  try {
    const properties = await PropertiesModel.aggregate().sample(limit).limit(limit);
    res.status(200).json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message:error});
  }

}

const addProperties = async function (req, res) {
  const LandlordId=req.userID;
  const {
    propertyID,
    propertyName,
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
        propertyName:propertyName,
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

module.exports = {getProperties,addProperties,getPropertiesByLandlord,removeProperties,updateProperties,getPopularProperties,getPropertiesById};
