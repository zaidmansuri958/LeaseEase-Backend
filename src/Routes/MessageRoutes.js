const express=require("express");
const messageRouter=express.Router();
const {sendMessage,getMessage}=require("../Controllers/MessageController");


messageRouter.post("/",sendMessage);
messageRouter.get("/:conversationID",getMessage);


module.exports=messageRouter