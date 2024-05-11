import express from "express";
import {
  createReview,
  deleteReview,
  getReview,
} from "../controllers/review.models.js";
import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.post("/", isAuthorizedUser, createReview);
router.get("/:gigId", getReview);
router.delete("/:id", deleteReview);

export default router;
