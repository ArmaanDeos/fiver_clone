import express from "express";
import { deleteUser } from "../controllers/user.controllers.js";
import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.delete("/:id", isAuthorizedUser, deleteUser);

export default router;
