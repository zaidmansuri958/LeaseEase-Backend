const mongoose=require("mongoose");

const tenantSchema=mongoose.Schema({
    Tenant_ID:{
        type:String,
        require:true
    },
    First_Name:{
        type:String,
        require:true
    },
    Last_Name:{
        type:String,
        require:true 
    },
    Email_ID:{
        type:String,
        require:true 
    },
    Phone_No:{
        type:String,
        require:true 
    },
    Password:{
        type:String,
        require:true 
    },
    Gender:{
        type:String,
        enum:["Female","Male","Other"],
        require:true
    },
    City_ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"City",
        require:true
    },
    Date_Of_Birth:{
        type:String,
        require:true
    },
    Pancard_Number:{
        type:String,
        require:true
    },
    Marital_Status:{
        type:String,
        enum:["Single","Married","Other"],
        require:true
    }
},{ timeStamps: true });


module.exports = mongoose.model("tenants", tenantSchema);