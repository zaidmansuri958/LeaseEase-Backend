const mongoose = require("mongoose");

const propertiesSchema = mongoose.Schema({
    propertyID: {
        type: String,
        required: true,
        unique:true
    },

    propertyName: {
        type: String,
        required: true,
    },

    LandlordId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Landlords",
        require:true
    },

    propertyAddress: {
        type: String,
        required: true
    },

    rentAmount: {
        type: mongoose.Types.Decimal128,
        required: true
    },

    depositAmount: {
        type: mongoose.Types.Decimal128,
        required: true
    },

    availability:{
        type:Number,
        required:true
    },

    propertyType:{
        type:String,
        enum:["Flat","Bunglow","Duplex","Apartment"],
        required:true
    },
    bedRooms:{
        type:Number,
        required:true
    },
    bathRooms:{
        type:Number,
        required:true
    },
    Amenities:{
        type:Array,
        require:true
    },
    squareFootage:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    propertyMedia:{
        type:Array,
        require:true
    },

    city: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"City",
        require:true
    },
}, { timeStamps: true });

module.exports = mongoose.model("properties", propertiesSchema);