const LandlordModel = require("../Models/Landlord");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "LeaseEase";

const signUp = async function (req, res) {
  //Existing use check
  //Hashed password
  //User craetion
  //Tocken generate

  const {
    Landlord_ID,
    First_Name,
    Last_Name,
    Email_ID,
    Phone_No,
    Password,
    Gender,
    City_ID,
    Date_Of_Birth,
    Pancard_Number,
  } = req.body;
  try {
    const existingUser = await LandlordModel.findOne({ Email_ID: Email_ID });
    const mobileNumber=await LandlordModel.findOne({Phone_No:Phone_No});
    const pancardNumber=await LandlordModel.findOne({Pancard_Number:Pancard_Number});
    if (existingUser) {
      return res.status(400).json({ message: "Email ID already registered" });
    }else if(mobileNumber){
      return res.status(400).json({ message: "Phone Number already registered" });
    }else if(pancardNumber){
      return res.status(400).json({ message: "Pancard Number already registered" });
    }
    const hashPassword = await bcrypt.hash(Password, 10);

    const result = await LandlordModel.create({
      Landlord_ID: Landlord_ID,
      First_Name: First_Name,
      Last_Name: Last_Name,
      Email_ID: Email_ID,
      Phone_No: Phone_No,
      Password: hashPassword,
      Gender: Gender,
      City_ID: City_ID,
      Date_Of_Birth: Date_Of_Birth,
      Pancard_Number: Pancard_Number,
      No_Of_Properties: "0",
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
    const existingUser = await LandlordModel.findOne({ Email_ID: Login_Email_ID });
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

const getLandlord = async function (req, res) {
  try {
    const user = await LandlordModel.findOne({ _id: req.userID });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const updateLandlord=async function(req,res){
  id=req.userID
  const updatedProfile=req.body
  try{
    const landlord=await LandlordModel.updateOne({_id:id}, { $set: updatedProfile})
    res.status(202).json(landlord)

  }catch(error){
    console.log(error)
    return res.status(500).json({message:"something went wrong"})
  }
}

const getLandlordById= async function(req,res){
  try{
    const user=await LandlordModel.findOne({_id:req.params.landlordId});
    return res.status(200).json(user);
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"something went wrong"})
  }
}

const getLandlordByEmail= async function(req,res){
  try{
    const user=await LandlordModel.findOne({Email_ID:req.params.emailId});
    return res.status(200).json(user);
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"something went wrong"})
  }
}

const getAllLandlords = async function (req, res) {
  try {
    const landlords = await LandlordModel.find();
    res.status(200).json(landlords);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something wrong happen" });
  }
};



module.exports = { signUp, signIn, getLandlord,getLandlordById,updateLandlord,getLandlordByEmail,getAllLandlords};
