import express from "express";
import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";
import {
  createGig,
  deleteGig,
  getGigs,
  getSingleGig,
} from "../controllers/gig.controllers.js";
const router = express.Router();

router.post("/create", isAuthorizedUser, createGig);
router.delete("/:id", isAuthorizedUser, deleteGig);
router.get("/single/:id", getSingleGig);
router.get("/", getGigs);

export default router;
