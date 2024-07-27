import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Conversation } from "../models/conversation.models.js";

//* CreateConversation Controller *//
const createConversation = asyncHandler(async (req, res) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });

  await newConversation.save();
  res
    .status(200)
    .json(new ApiResponse(200, newConversation, "Conversation created"));
});

//* GetConversation Controller *//
const getSingleConversation = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findOne({ id: req.params.id });
  if (!conversation) throw new ApiError(404, "Conversation not found");
  res.status(200).json(conversation);
});

//* GetConversations Controller *//
const getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find(
    req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
  ).sort({ updatedAt: -1 });
  if (!conversations) throw new ApiError(404, "No conversations found");
  res.status(200).json(conversations);
});

//* UpdateConversation Controller *//
const updateConversation = asyncHandler(async (req, res) => {
  const updatedConversation = await Conversation.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: { readBySeller: true, readByBuyer: true },
    },
    {
      new: true,
    }
  );
  res.status(200).json(new ApiResponse(200, updatedConversation, "Updated"));
});

export {
  createConversation,
  getSingleConversation,
  getConversations,
  updateConversation,
};
