const AdminModel = require("../Models/Admin");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "LeaseEase";

const signIn = async function (req, res) {
    const { Login_Email_ID, Login_Password } = req.body;
  
    try {
      const existingUser = await AdminModel.findOne({ Email_ID: Login_Email_ID });
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

  
module.exports = {signIn};