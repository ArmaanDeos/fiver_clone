import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/message.controllers.js";
const router = express.Router();
import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";

router.post("/", isAuthorizedUser, createMessage);
router.get("/:id", isAuthorizedUser, getMessages);

export default router;
