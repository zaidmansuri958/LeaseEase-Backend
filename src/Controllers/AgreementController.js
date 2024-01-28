const AgreementModel = require("../Models/Agreement");
const PropertyModel=require("../Models/Properties");

const getAgreements = async function (req, res) {
  const userID = req.userID;
  try {
    const agreement = await AgreementModel.find({$or: [{ Landlord_ID: userID }, {Tenant_ID: userID }] });
    res.status(200).json(agreement);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAgreementsWithPropertyDetails = async function (req, res) {
  const userID = req.userID;
  try {
    // Fetch agreements
    const agreements = await AgreementModel.find({ $or: [{ Landlord_ID: userID }, { Tenant_ID: userID }] });

    // Extract property IDs from agreements
    const propertyIDs = agreements.map(agreement => agreement.Property_ID);

    // Fetch properties based on property IDs
    const properties = await PropertyModel.find({ _id: { $in: propertyIDs } });

    res.status(200).json({ agreements, properties });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateAgreement = async function (req, res) {
  const id = req.params.id;
  const updatedAgreement = req.body;
  try {
    const property = await AgreementModel.updateOne(
      { _id: id },
      { $set: updatedAgreement }
    );
    res.status(202).json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something wrong happen" });
  }
};

const addAgreement = async function (req, res) {
  const Landlord_ID = req.userID;
  const {
    Agreement_ID,
    Property_ID,
    Tenant_ID,
    Start_Date,
    End_Date,
    rentAmount,
    depositAmount,
    PDF_document,
    status,
  } = req.body;

  try {
    const result = await AgreementModel.create({
      Agreement_ID: Agreement_ID,
      Property_ID: Property_ID,
      Tenant_ID: Tenant_ID,
      Landlord_ID: Landlord_ID,
      Start_Date: Start_Date,
      End_Date: End_Date,
      rentAmount: rentAmount,
      depositAmount: depositAmount,
      PDF_document: PDF_document,
      status: status,
    });
    return res.status(200).json({ message: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  addAgreement,
  getAgreements,
  updateAgreement,
  getAgreementsWithPropertyDetails
};
