import express from "express";
import { registerUser } from "../controller/userRegister.js";
import { loginUser } from "../controller/userLogin.js";
import { userDetails } from "../controller/userDetails.js";
import { authToken,authAdmin } from "../middleware/auth.js";
import { userLogout } from "../controller/userLogout.js";
import { allUsers,allAdmin } from "../controller/allUsers.js";
import { updateUserRole } from "../controller/updateUserRole.js";
import { uploadProduct } from "../controller/uploadProduct.js";
import { allProducts } from "../controller/allProducts.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user-details", authToken, userDetails);
router.get("/user-logout",authToken, userLogout);

//for admin
router.get("/all-users",authToken,allUsers);
router.get("/all-admins",authToken,allAdmin);
router.post("/update-user-role",authToken, updateUserRole);
router.post("/upload-product", authAdmin, uploadProduct);
router.get("/all-products",authAdmin,allProducts);


export default router;