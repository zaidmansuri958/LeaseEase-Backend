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
    First_name,
    Last_Name,
    Email_ID,
    Phone_No,
    Password,
    Gender,
    City_ID,
    Date_Of_Birth,
    Pancard_Number,
    No_Of_Properties,
  } = req.body;
  try {
    const existingUser = await LandlordModel.findOne({ Email_ID: Email_ID });
    if (existingUser) {
      return res.status(400).json({ message: "User alrady exists" });
    }
    const hashPassword = await bcrypt.hash(Password,10);

    const result = await LandlordModel.create({
      Landlord_ID:Landlord_ID,
      First_name: First_name,
      Last_Name: Last_Name,
      Email_ID: Email_ID,
      Phone_No: Phone_No,
      Password: hashPassword,
      Gender: Gender,
      City_ID: City_ID,
      Date_Of_Birth: Date_Of_Birth,
      Pancard_Number: Pancard_Number,
      No_Of_Properties: No_Of_Properties,
    });

    const token = jsonwebtoken.sign(
      { Email_ID: result.Email_ID, _id: result.Landlord_ID },
      SECRET_KEY
    );
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some thing went wrong" });
  }
};

const signIn = async function (req, res) {
  const { Email_ID, Password } = req.body;

  try {
    const existingUser = await LandlordModel.findOne({ Email_ID: Email_ID });
    if (!existingUser) {
      return res.status(404).json({ message: "User is not exists" });
    }
    const matchPassword = await bcrypt.compare(Password, existingUser.Password);

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

// const getUser = async function (req, res) {
//   try {
//     const user = await userModel.findOne({ _id: req.userID });
//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "something went wrong" });
//   }
// };

module.exports = { signUp, signIn };
