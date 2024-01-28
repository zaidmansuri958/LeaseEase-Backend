require('dotenv').config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const Razorpay=require("razorpay");

const landlordRoutes=require("./Routes/LandlordRoutes");
const conversationRoutes=require("./Routes/ConversationRoutes");
const messageRoutes=require("./Routes/MessageRoutes");
const propertiesRoutes=require("./Routes/PropertiesRoutes");
const tenantRoutes=require("./Routes/TenantRoutes");
const cityRoutes=require("./Routes/CityRoutes");
const agreementRoutes=require("./Routes/AgreementRoutes");
const complaintRoutes=require("./Routes/ComplaintRoutes");


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
app.use("/tenant",tenantRoutes);
app.use("/city",cityRoutes);
app.use("/agreement",agreementRoutes);
app.use("/complaints",complaintRoutes);

// export const instance=new Razorpay({ 
//     key_id: process.env.RAZOR_PAY_API_KEY, 
//     key_secret: process.env.RAZOR_PAY_API_KEY_SECRET 
// }); 

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