import express from "express";
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/User.js";

// Init router
const router = express.Router();

// Routes
router.get("/api/v1/users", getUsers);
router.post("/api/v1/users", addUser);
router.delete("/api/v1/users/:id", deleteUser);
router.put("/api/v1/users/:id", updateUser);

export default router;
