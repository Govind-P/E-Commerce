import express from "express";
import { registerUser } from "../controller/userRegister.js";
import { loginUser } from "../controller/userLogin.js";
import { userDetails } from "../controller/userDetails.js";
import { authToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user-details", authToken, userDetails);


export default router;