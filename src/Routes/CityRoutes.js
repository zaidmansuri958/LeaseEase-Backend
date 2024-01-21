const express=require("express")
const cityRouter=express.Router()
const {getCity}=require("../Controllers/CityController")


cityRouter.get("/:cityId",getCity)

module.exports=cityRouter