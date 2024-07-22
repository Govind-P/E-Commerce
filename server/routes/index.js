import express from "express";
import { registerUser } from "../controller/userRegister.js";
import { loginUser } from "../controller/userLogin.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;