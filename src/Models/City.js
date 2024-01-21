const mongoose=require("mongoose");

const citySchema=mongoose.Schema({
    city_id:{
        type:String,
        require:true
    },
    city_name:{
        type:String,
        require:true
    },
},{ timeStamps: true });


module.exports = mongoose.model("City", citySchema);