import express from "express";
import { registerUser } from "../controller/userRegister.js";

const router = express.Router();

router.post("/register", registerUser);


export default router;