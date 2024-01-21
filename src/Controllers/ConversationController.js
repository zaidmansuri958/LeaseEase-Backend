const express = require("express");
const Conversation = require("../Models/Conversation");


const newConversation = async function (req, res) {
  if(req.body.senderId!==req.body.receiverId){
    const conversation = new Conversation({
      member: [req.body.senderId, req.body.receiverId],
    });
    try {
      const savedConverstation = await conversation.save();
      res.status(200).json(savedConverstation);
    } catch (err) {
      res.status(500), json(err);
    }
  }
};

const fetchConversation = async function (req, res) {
  try {
    const conversation = await Conversation.find({
      member: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

const isConversationExists=async function (req,res){
  try {
    const conversation = await Conversation.findOne({
      member: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });

    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { newConversation,fetchConversation,isConversationExists };
