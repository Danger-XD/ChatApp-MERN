import { conversationModel } from "../models/conversations.model.js";
import { userModel } from "../models/users.model.js";
import { messageModel } from "./../models/messages.model.js";

export const sendMessageService = async (req, res) => {
  try {
    // take message from req
    const { message } = req.body;
    // take params from req
    const { id: receiverId } = req.params;
    // user info from token
    const senderId = req.user["_id"];
    // check if receiver exists
    const receiver = await userModel.findById(receiverId);
    if (!receiver) {
      return { status: "failed", message: "Receiver does not exist!" };
    }
    // check if conversation exist between devices
    let conversation = await conversationModel.findOne({
      participants: { $all: [receiverId, senderId] },
    });
    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [receiverId, senderId],
      });
    }
    // create new message
    const newMessage = new messageModel({ message, receiverId, senderId });
    // add message to sender's messages array
    if (newMessage) {
      conversation.messages.push(newMessage["_id"]);
      await Promise.all([conversation.save(), newMessage.save()]); //save in db parallely
    }
    // return message info
    return { status: "success", data: newMessage };
  } catch (error) {
    console.log("error: " + error.message);
    return { status: "failed", error: error.message };
  }
};

export const getMessageService = async (req, res) => {
  try {
    // take id of the user we chat with
    const { id: receiverId } = req.params;
    // user info from token
    const senderId = req.user["_id"];
    // check if conversation exist between devices
    const conversation = await conversationModel
      .findOne({
        participants: { $all: [receiverId, senderId] },
      })
      .populate("messages");
    if (!conversation) {
      return { message: [] };
    }
    // get all messages in the conversation
    const messages = conversation.messages;
    // return messages info
    return { status: "success", data: messages };
  } catch (error) {
    console.log("error: " + error.message);
    return { status: "failed", error: error.message };
  }
};
