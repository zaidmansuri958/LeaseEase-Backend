const mongoose = require("mongoose");

const propertiesMediaSchema = mongoose.Schema({
    propertyMediaID: {
        type: String,
        required: true,
        unique:true
    },
    img1:{
        type:String,
        required:true
    },
    img2:{
        type:String,
        required:true
    },
    img3:{
        type:String,
        required:true
    },
    img4:{
        type:String,
        required:true
    },
}, { timeStamps: true });

module.exports = mongoose.model("propertiesMedia", propertiesMediaSchema);