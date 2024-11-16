import express from "express";
import { register, login, verifyUser } from "../controllers/authController";

const router = express.Router();

// Define the routes here for login, register and verifyUser
router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyUser);

export default router;
