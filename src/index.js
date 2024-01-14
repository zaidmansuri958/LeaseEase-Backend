require('dotenv').config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const cookieParser = require('cookie-parser');

const landlordRoutes=require("./Routes/LandlordRoutes");
const conversationRoutes=require("./Routes/ConversationRoutes");
const messageRoutes=require("./Routes/MessageRoutes");
const propertiesRoutes=require("./Routes/PropertiesRoutes");


const PORT = process.PORT || 5000
app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))



app.use("/landlord",landlordRoutes);
app.use("/conversation",conversationRoutes);
app.use("/message",messageRoutes);
app.use("/properties",propertiesRoutes);

mongoose.connect(process.env.DB)
    .then(function () {
        app.listen(PORT, function () {
            console.log("Listning on port " + PORT);
        });
    }).catch(function (error) {
        console.log(error)
    })

app.get("/", function (req, res) {
    res.send("working");
})