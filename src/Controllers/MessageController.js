const express = require("express");
const Message = require("../Models/Message");

const sendMessage = async function (req, res) {
  const message = new Message(req.body);
  try {
    const savedMessage = await message.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500), json(err);
  }
};

const getMessage = async function (req, res) {
  try {
    const messages=await Message.find({
        conversationID:req.params.conversationID
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500), json(err);
  }
};

module.exports = { sendMessage,getMessage };
