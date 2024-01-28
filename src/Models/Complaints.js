const mongoose=require("mongoose")

const complaintsSchema=mongoose.Schema({
    Complaint_ID:{
        type:String,
        require:true
    },
    Agreement_ID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"agreements",
        require:true
    },
    Complaint_Date:{
        type:String,
        require:true
    },
    Complaint_Description:{
        type:String,
        require:true
    },
    Complaint_Status:{
        type:String,
        require:true
    }
})
module.exports = mongoose.model("complaints", complaintsSchema);