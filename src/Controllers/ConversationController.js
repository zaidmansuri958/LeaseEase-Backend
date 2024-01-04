const express = require("express");
const Conversation = require("../Models/Conversation");

const newConversation = async function (req, res) {
  const conversation = new Conversation({
    member: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConverstation = await conversation.save();
    res.status(200).json(savedConverstation);
  } catch (err) {
    res.status(500), json(err);
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

module.exports = { newConversation,fetchConversation };
