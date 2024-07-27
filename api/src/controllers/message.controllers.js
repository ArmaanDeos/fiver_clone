import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Message } from "../models/messages.models.js";
import { Conversation } from "../models/conversation.models.js";

//* CreateMessage Controller *//
const createMessage = asyncHandler(async (req, res) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });

  const savedMessage = await newMessage.save();
  await Conversation.findOneAndUpdate(
    { id: req.body.conversationId },
    {
      $set: {
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller,
        lastMessage: req.body.desc,
      },
    },
    { new: true }
  );

  res.status(201).send(savedMessage);
});

//* GetMessages Controller *//
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ conversationId: req.params.id });
  res.status(200).send(messages);
});

export { createMessage, getMessages };
