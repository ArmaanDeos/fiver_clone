import express from "express";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controllers.js";
import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.get("/", isAuthorizedUser, getConversations);
router.get("/single/:id", isAuthorizedUser, getSingleConversation);
router.post("/", isAuthorizedUser, createConversation);
router.put("/:id", isAuthorizedUser, updateConversation);

export default router;
