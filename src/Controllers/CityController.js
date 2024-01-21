const cityModel=require("../Models/City");

const getCity=async function(req,res){
    try{
        const user=await cityModel.findOne({_id:req.params.cityId});
        return res.status(200).json(user);
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"something went wrong"})
    }

}

module.exports = {getCity};