const express = require("express");
const ComplaintsModel = require("../Models/Complaints");
const AgreementModel=require("../Models/Agreement");

const addComplaint = async function (req, res) {
  const {
    Complaint_ID,
    Agreement_ID,
    Complaint_Date,
    Complaint_Description,
    Complaint_Status,
  } = req.body;

  try {
    const result = await ComplaintsModel.create({
      Complaint_ID: Complaint_ID,
      Agreement_ID: Agreement_ID,
      Complaint_Date: Complaint_Date,
      Complaint_Description: Complaint_Description,
      Complaint_Status: Complaint_Status,
    });
    return res.status(200).json({ message: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const getComplaintbyTenant=async function(req,res){
    const userID = req.userID;
    try {
      const agreement = await AgreementModel.find({ Tenant_ID: userID});
      const complaints=await ComplaintsModel.find({Agreement_ID:agreement._id})
      res.status(200).json(complaints);
    } catch (err) {
      res.status(500).json(err);
    }
}

const getComplaintByLandlord=async function(req,res){
  const userID = req.userID;
  try {
    const agreements = await AgreementModel.find({ Landlord_ID: userID });

    if (agreements.length === 0) {
      // Handle case when no agreement is found for the landlord
      res.status(404).json({ message: 'No agreement found for the landlord.' });
      return;
    }

    const agreementIDs = agreements.map(agreement => agreement._id);
    const complaints = await ComplaintsModel.find({ Agreement_ID: { $in: agreementIDs } }).exec();

    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getAllComplaints = async function (req, res) {
  try {
    const complaints = await ComplaintsModel.find();
    res.status(200).json(complaints);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something wrong happen" });
  }
};


module.exports = {
    addComplaint,
    getComplaintbyTenant,
    getComplaintByLandlord,
    getAllComplaints
  };
