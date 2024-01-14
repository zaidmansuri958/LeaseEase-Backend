const express=require("express")
const conversationRouter=express.Router()
const {newConversation,fetchConversation,isConversationExists}=require("../Controllers/ConversationController")



conversationRouter.post("/",newConversation);
conversationRouter.get("/:userId",fetchConversation);
conversationRouter.get("/find/:firstUserId/:secondUserId",isConversationExists);


module.exports=conversationRouter;