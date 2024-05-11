import express from "express";
import { deleteUser, getUser } from "../controllers/user.controllers.js";
import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.delete("/:id", isAuthorizedUser, deleteUser);
router.get("/:id", isAuthorizedUser, getUser);

export default router;
