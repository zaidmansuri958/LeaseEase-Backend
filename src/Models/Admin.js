const mongoose=require("mongoose");

const adminSchema=mongoose.Schema({
    Email_ID:{
        type:String,
        require:true 
    },
    Password:{
        type:String,
        require:true 
    },
},{ timeStamps: true });


module.exports = mongoose.model("admin", adminSchema);