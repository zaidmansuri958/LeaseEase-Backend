const TenantModel = require("../Models/Tenant");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "LeaseEase";

const signUp = async function (req, res) {
  //Existing use check
  //Hashed password
  //User craetion
  //Tocken generate

  const {
    Tenant_ID,
    First_Name,
    Last_Name,
    Email_ID,
    Phone_No,
    Password,
    Gender,
    City_ID,
    Date_Of_Birth,
    Pancard_Number,
    Marital_Status
  } = req.body;
  try {
    const existingUser = await TenantModel.findOne({ Email_ID: Email_ID });
    if (existingUser) {
      return res.status(400).json({ message: "User alrady exists" });
    }
    const hashPassword = await bcrypt.hash(Password, 10);

    const result = await TenantModel.create({
      Tenant_ID: Tenant_ID,
      First_Name: First_Name,
      Last_Name: Last_Name,
      Email_ID: Email_ID,
      Phone_No: Phone_No,
      Password: hashPassword,
      Gender: Gender,
      City_ID: City_ID,
      Date_Of_Birth: Date_Of_Birth,
      Pancard_Number: Pancard_Number,
      Marital_Status: Marital_Status,
    });

    const token = jsonwebtoken.sign(
      { Email_ID: result.Email_ID, id: result._id},
      SECRET_KEY
    );
    return res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some thing went wrong" });
  }
};

const signIn = async function (req, res) {
  const { Login_Email_ID, Login_Password } = req.body;

  try {
    const existingUser = await TenantModel.findOne({ Email_ID: Login_Email_ID });
    if (!existingUser) {
      return res.status(404).json({ message: "User is not exists" });
    }
    const matchPassword = await bcrypt.compare(Login_Password, existingUser.Password);

    if (!matchPassword) {
      return res.status(400).json({ messge: "Invalid Credentials" });
    }
    const token = jsonwebtoken.sign(
      { Email_ID: existingUser.Email_ID, id: existingUser._id },
      SECRET_KEY
    );
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some thing went wrong" });
  }
};

const getTenant = async function (req, res) {
  try {
    const user = await TenantModel.findOne({ _id: req.userID });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const updateTenant=async function(req,res){
  id=req.params.id
  const updatedProfile=req.body
  try{
    const tenant=await TenantModel.updateOne({_id:id}, { $set: updatedProfile})
    res.status(202).json(tenant)

  }catch(error){
    console.log(error)
    return res.status(500).json({message:"something went wrong"})
  }
}

const getTenantById= async function(req,res){
  try{
    const user=await TenantModel.findOne({_id:req.params.tenantId});
    return res.status(200).json(user);
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"something went wrong"})
  }
}

module.exports = { signUp, signIn, getTenant,getTenantById,updateTenant};
