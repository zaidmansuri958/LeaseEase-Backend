const mongoose=require("mongoose");

const agreementSchema=mongoose.Schema({
    Agreement_ID:{
        type:String,
        require:true
    },
    Property_ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"properties",
        require:true
    },
    Tenant_ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tenants",
        require:true
    },
    Landlord_ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"landlords",
        require:true
    },
    Start_Date:{
        type:String,
        require:true
    },
    End_Date:{
        type:String,
        require:true
    },
    rentAmount: {
        type: mongoose.Types.Decimal128,
        required: true
    },

    depositAmount: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    PDF_document:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    }
},{ timeStamps: true });


module.exports = mongoose.model("agreements", agreementSchema);