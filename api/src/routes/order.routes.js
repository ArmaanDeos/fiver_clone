import express from "express";
import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";
import {
  deleteOrder,
  getOrder,
  updateOrder,
  payment,
  confirmOrder,
} from "../controllers/order.controllers.js";
const router = express.Router();

// router.post("/:gigId", isAuthorizedUser, createOrder);
router.get("/", isAuthorizedUser, getOrder);
router.delete("/:buyerId", isAuthorizedUser, deleteOrder);
router.post("/", isAuthorizedUser, updateOrder);
router.post("/create-payment-intent/:id", isAuthorizedUser, payment);
router.put("/", isAuthorizedUser, confirmOrder);

export default router;
