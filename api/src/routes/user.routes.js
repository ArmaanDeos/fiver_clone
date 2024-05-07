import express from "express";
import { deleteUser } from "../controllers/user.controllers.js";
import { isAuthorizedUser } from "../middlewares/auth.middlewares.js";
import { logoutUser } from "../controllers/auth.controllers.js";
const router = express.Router();

router.delete("/:id", isAuthorizedUser, deleteUser);
router.get("/logout", logoutUser);

export default router;
