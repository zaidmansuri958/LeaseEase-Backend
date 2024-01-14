const express=require("express")
const conversationRouter=express.Router()
const {newConversation,fetchConversation}=require("../Controllers/ConversationController")



conversationRouter.post("/",newConversation);
conversationRouter.get("/:userId",fetchConversation);


module.exports=conversationRouter;